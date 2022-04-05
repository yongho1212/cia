import React, { useState } from "react";
import { useUserAuth } from "../../../context/UserAuthContext";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import {updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router";
import {useDispatch, useSelector} from 'react-redux'


const Profile = () => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("")
  let navigate = useNavigate

  const { logOut, currentUser, auth } = useUserAuth();
  const user = useSelector((state) => state.auth.value);

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
  


  return (
    
    <div>
      
      <h2> {user}</h2>
       <h3>Once you delete your profile, all your blogs will be deleted permanently.</h3>
                          <h5>In order to continue, please write your password again</h5>
                          <form onSubmit={deleteUserBtn}>
                              <label>Password</label>
                              <input type="password"/>
                              <button type="submit" className="btn btn-danger">Delete profile</button>
                          </form>
    </div>
  )
}


export default Profile;