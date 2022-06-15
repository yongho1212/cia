
import React, { useEffect, useState } from "react";

import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import {updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';


const Chatlist = (props) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  const channels = state.auth.state.loginData.joinedChannel
  const lists = channels.map((chat) => 
    <div key={chat._id}>
        <Link to={`/Chat/${chat._id}`} style={{ color: 'black', alignItems: 'flex-start' }}>
            <li>{chat}</li>
        </Link>
    </div>
    )

  console.log(state.auth.state.loginData.joinedChannel)

  return (
    <div>
      <h1>My Chat list</h1>
    {lists}
    
    </div>
    
    
    
  );
} 
export default Chatlist;