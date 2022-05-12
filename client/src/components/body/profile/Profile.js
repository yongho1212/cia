import React, { useEffect, useState } from "react";

import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import {updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Avatar from'@mui/material/Avatar';
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
  
import FacebookLoginButton from '../auth/Facebook'


const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    role: '',
    avatar: ''
  })

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  
  
  const navigate = useNavigate();

  useEffect(() =>{
    if (!fbuser){
      navigate("/Home")
      console.log(state.auth)
      console.log(userData.avatar)
    }
  })

  useEffect(() => {
    fetching();
  },[state])

  const fetching = async(e) => {
    try{
    await setUserData({
      email: state.auth.state.email,
      role: state.auth.state.role,
      avatar: state.auth.state.avatar
    })
    }catch{
      console.log(e)
    }
  }  

  console.log(state.auth)
  
  console.log(userData)
  
const editProfile = () => {
  navigate("/EditProfile")
}



  return (
    <Box style={{backgroundColor:'#fff', display: 'flex', flexDirection: 'row' }}  sx={{ flexGrow: 1 }}>
      
      <Grid style={{}}>
        <div style={{backgroundColor:'red', margin:'15px'}}> 
          <h1>Hello! It's profile page.</h1>	
          <Avatar
            alt="Remy Sharp"
            src={userData.avatar}
            sx={{ width: 100, height: 100 }}
          />
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

    

    {/* <FacebookLoginButton/> */}
    </Box>
    
  )
}


export default Profile;