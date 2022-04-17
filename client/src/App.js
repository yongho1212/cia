import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/body/auth/Login";
import Signup from "./components/body/auth/Signup";
import Home from './components/body/home/Home'
import HeaderLogin  from './components/header/HeaderLogin';
import HeaderProfile from './components/header/HeaderProfile';
import Chat from './components/body/chat/Chat';
import Search from './components/body/search/Search';
import Profile from './components/body/profile/Profile';
import Main from './components/body/main/Main';
import Footer from './components/footer/Footer';
import EditProfile from './components/body/editprofile/EditProfile';
import ProtectedRoute from "./components/ProtectedRoute";
import UserRoute from "./components/UserRoute";
import UploadProduct from './components/body/Product/uploadProduct';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';

function App() {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const auth = getAuth();
  const user = auth.currentUser
  console.log(state.auth)
  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      fbuser(true);
    } else {
      nofbuser(false);
    }
  });
  console.log(state.loggedin)
  
  

  return (
    <BrowserRouter>
    { state.loggedin ?
      <HeaderProfile />
    : 
      <HeaderLogin />  
    }
        <Routes >
          { !state.loggedin ?
            <Route path="/Home" element={<Home />}  />
          :
            <Route path="/Main/*" element={<Main />} />
          }
          <Route path="/Login/*" element={<Login />} />
          <Route path="/Signup/*" element={<Signup />} />
          <Route path="/Profile/*" element={<Profile />} />
          <Route path="/Chat/*" element={<Chat />} />
          <Route path="/Search/*" element={<Search />} />
          <Route path="/EditProfile/*" element={<EditProfile />} />
          <Route path="/Upload/" element={<UploadProduct />} />
        </Routes>
      <Footer style={{display: 'flex'}}/>
    </BrowserRouter>
    
  );
}

export default App;
