import React from 'react'

import { useUserAuth } from "../../../context/UserAuthContext";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";


const Profile = () => {

  const { logOut, currentUser } = useUserAuth();

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
  


  return (
    
    <div>
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