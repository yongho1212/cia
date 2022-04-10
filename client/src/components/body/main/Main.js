import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import './Main.css'
import { useUserAuth } from "../../../context/UserAuthContext";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLeft from "../mainLeft";
import MainRight from "../../mainRight";
import Profile from "../profile/Profile";




const Main = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/Home");
    }
  }, [user, navigate]);




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