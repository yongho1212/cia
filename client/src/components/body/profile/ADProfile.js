import React, { useEffect, useState } from "react";

import { reauthenticateWithCredential, signOut, deleteUser, getAuth } from "firebase/auth";
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
  const {loginUser, logoutUser, fbuser, nofbuser, adloginUser} = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = state.advertiser.state.adloginData.uid




  


  useEffect(() =>{
    if (!fbuser){
      navigate("/Home")

    }
  })
  
const editProfile = () => {
  navigate("/EditProfile")
}


const handleLogout = async() => {
  try {
    navigate('/Home');
    logoutUser();
    nofbuser(false);;
    signOut(auth);
    console.log('logout')
  } catch (err) {
    console.log(err)
};
};



const deleteUserAll = async() => {
  if(window.confirm('정말 탈퇴하시겠습니다?')){
  const res = await axios.post('http://localhost:1212/user/delete', {uid})
      .then((res) => {
        console.log(res.data)
        console.log('success')
    })
  .then(() => {
    deleteUser(user)
    console.log('firebase deleted');
  })
  .then(() => {
    handleLogout();
  })
  .catch((error) => {
    // An error ocurred
    // ...
  });
  alert('삭제완료!')
} else{
  alert('취소')
}
}



  return (
    <Box style={{backgroundColor:'#fff', display: 'flex', flexDirection: 'row' }}  sx={{ flexGrow: 1 }}>
      
      <Grid style={{}}>
        <div style={{backgroundColor:'red', margin:'15px'}}> 
          <h1>Hello! It's profile page.</h1>	
          <Avatar
            alt="Remy Sharp"
            src={state.advertiser.state.adloginData.avatar}
            sx={{ width: 100, height: 100 }}
          />
          <div>
          {state.advertiser.state.adloginData.role} <br/>
          
          {state.advertiser.state.adloginData.avatar}<br/>
          {state.advertiser.state.adloginData.brandname}<br/>
          {state.advertiser.state.adloginData.email}<br/>
          
          {state.advertiser.state.adloginData.joinedChannel}<br/>
          {state.advertiser.state.adloginData.mobile}<br/>
       
          {state.advertiser.state.adloginData.tags}<br/> 
          </div>
        </div>
        
        <div style={{backgroundColor:'green', margin:'15px'}}> 
          <h1>Hello! It's profile page.</h1>	
          <div>

          </div>
        </div>
      </Grid>

      <Button
      onClick={()=>deleteUserAll()}
      >

      </Button>

    

    {/* <FacebookLoginButton/> */}
    </Box>
    
  )
}


export default Profile;