import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";

import {
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

import "./Login.css";
import axios from "axios";

const Login = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const [infor, setInfor] = useState("");

  useEffect(() => {
    if (state.loggedin) {
      navigate("/Main");
    }
  }, [state.loggedin, navigate]);

  useEffect(() => {});

  const getinfo = async () => {
    const uid = auth.currentUser.uid;
    console.log(uid);
    const response = await axios
      .get("http://localhost:1212/user/getUserInfo", { params: { uid: uid } })
      .then((res) => {
        console.log(res.data);
        
        const displayName = res.data.displayName
        const uid = res.data.uid
        const email = res.data.email
        const role = res.data.role
        loginUser({uid, displayName, role, email});
        fbuser(true)
      })
      .catch((error) => {
        console.log(error.response);
      });
      
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password).then(() =>
      getinfo()
    );
  };

  const handleGoogleSignIn = () => {
    //    dispatch(googleSignInInitiate());
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
