import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/body/auth/Login";
import Signup from "./components/body/auth/Signup";
import Home from './components/body/home/Home'
import HeaderLogin  from './components/header/HeaderLogin';
import Chat from './components/body/chat/Chat';
import Profile from './components/body/profile/Profile';
import Main from './components/body/main/Main';
import Footer from './components/footer/Footer';
import ProtectedRoute from "./components/ProtectedRoute";
import UserRoute from "./components/UserRoute";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { setuser } from "./redux/actions";



function App() {
  const { user } = useSelector((state) => ({ ...state.user }));

  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setuser(authUser));
      } else {
        dispatch(setuser(null));
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
    
    <HeaderLogin />
    
      <Routes >
      {!user &&
        <Route path="/Home" element={<Home />} />
      }
        <Route path="/Login/*" element={<Login />} />
        <Route path="/Signup/*" element={<Signup />} />
        <Route path="/Main/*" element={<Main />} />
        <Route path="/Profile/*" element={<Profile />} />
        <Route path="/Chat/*" element={<Chat />} />
      </Routes>
      <Footer />
      
    </BrowserRouter>
    
  );
}

export default App;
