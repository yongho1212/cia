import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

import "./Login.css";
import axios from "axios";

const Login = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser, prependprd} = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const gprovider = new GoogleAuthProvider();

  const [infor, setInfor] = useState("");

  useEffect(() => {
    if (state.loggedin) {
      navigate("/MAIN1");
    }
  }, [state.loggedin, navigate]);

  const handleLogout = () => {
    console.log('1');
      logoutUser();
      console.log('2');
      nofbuser(false);
      console.log('3');
      signOut(auth);
      console.log('4');
      navigate('/Home');
      console.log('logout');
};

function moveMain() {
  navigate("/Main")
};




  const getinfo = async () => {
    const uid = auth.currentUser.uid;
    console.log(auth.currentUser)
    console.log(uid);
    const response = await axios
      .get("http://localhost:1212/user/getUserInfo", { params: { uid: uid } })
      .then((res) => {        
        console.log(res.data)
        const loginData = res.data
        // if(loginData !== true){
        //   handleLogout();
        // }
        loginUser(loginData);
        fbuser(true);
        getListById();
      })
      .catch((error) => {
        console.log(error.response);
        
    });
  };

  const getListById = async () => {
    const uid = auth.currentUser.uid
    console.log(uid)
    try {
       const res = await axios.get('http://localhost:1212/products/getlistbyid', 
       { params: { uid } })
       .then((res) => { 
        console.log(res.data);
        prependprd(res.data);
        console.log(state.myprd)
        return 0;
      })
    } 
    catch (err) {
      alert('비밀번호 혹은 이메일이 일치하지 않습니다. 다시 시도하세요')
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
    .then(() =>
      getinfo()
    )
    .then(() =>{
      moveMain();
    })
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, gprovider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(result.user.email)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    })
    .then(() => {
      getinfo();
    })
    .then(() =>{
      moveMain();
    })
  };

  const handleFBSignIn = () => {
    //dispatch(fbSignInInitiate());
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
          <Button variant="primary" onClick={handleFBSignIn}>
            FACEBOOK
          </Button>
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
