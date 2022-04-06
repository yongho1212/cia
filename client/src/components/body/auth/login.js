import React, { useState, useEffect } from "react";
import {
  fbSignInInitiate,
  googleSignInInitiate,
  loginInitiate,
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";

import "./Login.css";

const Login = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/Main");
    }
  }, [user, navigate]);



  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginInitiate(email, password));
      
    } catch (err) {
      console.log(err)
      
  };
}

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };

  const handleFBSignIn = () => {
    dispatch(fbSignInInitiate());
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
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
