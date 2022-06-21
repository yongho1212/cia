import React, { useEffect } from "react";
import './Main.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProdcutView from "../Product/ProductView/ProductView";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import {
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const Main = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (!fbuser) {
      navigate("/Home");
    }
  }, [state, navigate]);

  return (
    <div style={{ backgroundColor:'blue', display:'inline-block', flexDirection:'row', justifyContent:'flex-end'}}>
          <ProdcutView />
    </div>
  );
};

export default Main;