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
import { UserAuthContextProvider } from "./context/UserAuthContext";
import {useDispatch, useSelector} from 'react-redux'
import { saveUser } from "./redux/slice/userSlice";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";




function App() {
  
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);
  console.log("user from state", user.refreshToken);
  console.log("user from state", auth);
  const dispatch = useDispatch();
  
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
        
      } else {
        dispatch(saveUser(undefined));
        
      }
    
    });
  }, [auth, dispatch]);

  return (
    <BrowserRouter>
    <UserAuthContextProvider>
    <HeaderLogin />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login/*" element={<Login />} />
        <Route path="/Signup/*" element={<Signup />} />
        <Route path="/Main/*" element={<Main />} />
        <Route path="/Profile/*" element={<Profile />} />
        <Route path="/Chat/*" element={<Chat />} />
      </Routes>
      <Footer />
      </UserAuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
