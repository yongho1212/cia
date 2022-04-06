import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import { useUserAuth } from "../../../context/UserAuthContext";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

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
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
       
      </div>
      <div className="d-grid gap-2">
     
       
      </div>
    </>
  );
};

export default Main;