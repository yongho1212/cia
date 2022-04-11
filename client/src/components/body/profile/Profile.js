import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../../context/UserAuthContext";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import {updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Form, Alert, Button } from "react-bootstrap";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { async } from "@firebase/util"
import axios from 'axios';




const Profile = () => {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const { user } = useSelector((state) => ({ ...state.user }));

  const navigate = useNavigate();
  
  useEffect(() => {
    const getUser = async() => {
      try{
        setUserName(user.displayName);
        setUserEmail(user.email);
      } catch(e){
        console.log(e)
      }
    } ;
    getUser();
//    console.log(user)
    
  },[userName, userEmail])

const userAboutMeBtn = async(e) => {
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
    {user !== null &&
    
      <h3>
        {userName}<br/>
        {userEmail}<br/>
        aa{aboutMe}
        
      </h3>
    }
      {/* <h3>Once you delete your profile, all your blogs will be deleted permanently.</h3>
                          <h5>In order to continue, please write your password again</h5>
                          <form onSubmit={deleteUserBtn}>
                              <label>Password</label>
                              <input type="password"/>
                              <button type="submit" className="btn btn-danger">Delete profile</button>
      </form>*/}
      <Form sx={{ m: 1 }} variant="standard" onSubmit={userAboutMeBtn}>
          <InputLabel htmlFor="standard-adornment-amount">About me</InputLabel>
          <Input
            id="standard-adornment-amount"
            defaultValue={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
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