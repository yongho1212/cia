import React, { useEffect, useState } from "react";

import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import {updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Form, Alert, Button } from "react-bootstrap";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { async } from "@firebase/util"
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
  


const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    role: ''
  })



  
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  
  
  const navigate = useNavigate();

  useEffect(() =>{
    if (!fbuser){
      navigate("/Home")
      console.log(state.auth)
      
    }
  })

  useEffect(() => {
    fetching();
  },[state])

  const fetching = async(e) => {
    try{
    await setUserData({
      email: state.auth.state.email,
      role: state.auth.state.role 
    })
    }catch{
      console.log(e)
    }
  }


      

  console.log(state.auth)
  
  console.log(userData)
  
{/*const userAboutMeBtn = async(e) => {
  try {
    const res = await axios.post('http://localhost:1212/user/aboutme', 
    {aboutMe}
  ).then((res) => {
    console.log(aboutMe)
    })
  } catch (err) {
    console.log('failed')  
  };
}
*/}
const editProfile = () => {
  navigate("/EditProfile")
}


{/*
  const deleteUserBtn = (e) => {
    e.preventDefault();
    deleteSignedUser(e.target[0].value);
  }
  
  const deleteSignedUser = async (password) => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    )
  
    const result = await reauthenticateWithCredential(
      currentUser,
      credential
    )
  
    // Pass result.user here
    await deleteUser(result.user)
  
    console.log("success in deleting")
    localStorage.removeItem("user");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await updateProfile({
        displayName: displayName,
        photoURL: photoURL
     });
//      axios.post('http://localhost:1212/user/register', {
//        name, email, password
//      })
      navigate("/Main");
      
    } catch (err) {
      console.log('err')
    }
  };
*/}
  


  return (
    <Box style={{backgroundColor:'#fff', display: 'flex', flexDirection: 'row' }}  sx={{ flexGrow: 1 }}>
      
      <Grid style={{}} xs={8}>
        <div style={{backgroundColor:'red', margin:'15px'}}> 
          <h1>Hello! It's profile page.</h1>	
          <div>
          {userData.email} <br/>
          {userData.role}
          </div>
        </div>
        
        <div style={{backgroundColor:'green', margin:'15px'}}> 
          <h1>Hello! It's profile page.</h1>	
          <div>
          {userData.email} <br/>
          {userData.role}
          </div>
        </div>
      </Grid>

      <Grid style={{backgroundColor:'blue'}}  xs={8}>
        <h1>right</h1>
        
      </Grid>

      
    </Box>
    
  )
}


export default Profile;