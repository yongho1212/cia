import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "../../../redux/actions"

import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";



const Signup = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let navigate = useNavigate();
  const dispatch = useDispatch();
{/*=
  useEffect(() => {
    if (user) {
      navigate("/Main");
    }
  }, [user, navigate]);
*/}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          dispatch(registerInitiate(email, password, displayName));
          console.log(email)
        } catch (err) {
    console.log(err)
    };
  
}


  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="name"
              placeholder="name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>
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
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
