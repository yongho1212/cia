import React, { useEffect, useState } from "react";

import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import {updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Form, Alert, Button } from "react-bootstrap";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
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
    
    <div>
      
      <h1>Hello! It's profile page.</h1>	
      <div>
      {userData.email} <br/>
      {userData.role}
      </div>
    
    
      <h3>
        
        
        ANOUTME
        
        
     
        
      </h3>
    
      {/* <h3>Once you delete your profile, all your blogs will be deleted permanently.</h3>
                          <h5>In order to continue, please write your password again</h5>
                          <form onSubmit={deleteUserBtn}>
                              <label>Password</label>
                              <input type="password"/>
                              <button type="submit" className="btn btn-danger">Delete profile</button>
      </form>*/}
      <Form sx={{ m: 1 }} variant="standard" >
          <InputLabel htmlFor="standard-adornment-amount">About me</InputLabel>
          <Input
            id="standard-adornment-amount"
            
            
          />
          <Button variant="primary" 
            type="Submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
              Save
          </Button>
          <Button variant="primary" 
            onClick={editProfile}
            
            sx={{ mt: 3, mb: 2 }}
            >
              Edit Proifile
          </Button>
        </Form>
    </div>
  )
}


export default Profile;