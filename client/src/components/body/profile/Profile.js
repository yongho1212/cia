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
    email : '',
    displayName : '',
    role : 'notsure',
    uid : '',
    avatar : '',
    tags:'',
    age:'',
    sex:'',
    insta:'',
    mobile:'',
    joinedChannel:[]
  })

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  console.log(state.auth)
  console.log(state.auth.state.loginData.age)
  console.log(state.auth.state.loginData.avatar)
  console.log(state.auth.state.loginData.displayName)
  console.log(state.auth.state.loginData.email)
  console.log(state.auth.state.loginData.insta)
  console.log(state.auth.state.loginData.joinedChannel)
  console.log(state.auth.state.loginData.mobile)
  console.log(state.auth.state.loginData.sex)
  console.log(state.auth.state.loginData.tags)


  
  useEffect(() =>{
    if (!fbuser){
      navigate("/Home")

    }
  })

 
  
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
            src={state.auth.state.loginData.joinedChannel}
            sx={{ width: 100, height: 100 }}
          />
          <div>
          {state.auth.state.loginData.role} <br/>

          {state.auth.state.loginData.age}<br/>
          {state.auth.state.loginData.avatar}<br/>
          {state.auth.state.loginData.displayName}<br/>
          {state.auth.state.loginData.email}<br/>
          {state.auth.state.loginData.insta}<br/>
          {state.auth.state.loginData.joinedChannel}<br/>
          {state.auth.state.loginData.mobile}<br/>
          {state.auth.state.loginData.sex}<br/>
          {state.auth.state.loginData.tags}<br/>
          </div>
        </div>
        
        <div style={{backgroundColor:'green', margin:'15px'}}> 
          <h1>Hello! It's profile page.</h1>	
          <div>

          </div>
        </div>
      </Grid>

    

    {/* <FacebookLoginButton/> */}
    </Box>
    
  )
}


export default Profile;