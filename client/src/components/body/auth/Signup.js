import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "../../../redux/actions"
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";

import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Signup = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/Main");
    }
  }, [user, navigate]);

  function moveLogin() {
    navigate("/Login")
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerInitiate(email, password, displayName));
    try {
          const res = await axios.post('http://localhost:1212/user/register', 
          {displayName, email, password}
        ).then((res) => {
          console.log(displayName, email, password)
          })
        } catch (err) {
          console.log('failed')
          
    };
    navigate('/Main');
    console.log(displayName)
}


  return (
    <ThemeProvider theme={theme}>
    <Container>
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        
        <Form onSubmit={handleSubmit}>
        <Box className="mb-3" controlId="formBasicName">
            <TextField
              type="name"
              placeholder="name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Box>
          <Box className="mb-3" controlId="formBasicEmail">
            <TextField
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box className="mb-3" controlId="formBasicPassword">
            <TextField
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          
            <Button 
            variant="primary" 
            type="Submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
          
        </Form>
      
        <Button onClick={moveLogin}>
        Already have an account? Log In
        </Button>
      </Box>
      </Container>
      </ThemeProvider>
  );
};

export default Signup;
