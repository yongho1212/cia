import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import './Main.css'

import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLeft from "../mainLeft";
import MainRight from "../mainRight";
import Profile from "../profile/Profile";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';




const Main = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!fbuser) {
      navigate("/Home");
    }
  }, [state, navigate]);




  return (
    <>
      <div className="screenall">
        <div className="splitScreen">
          <div className="leftScreen">
            <Profile/>
          </div>
          <div className="rightScreen">
            <MainRight/>
          </div>
        </div>
       
       
       
        
       
      </div>
      
    </>
  );
};

export default Main;