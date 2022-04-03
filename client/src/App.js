import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/body/auth/Login";
import Signup from "./components/body/auth/Signup";
import Home from './components/body/home/Home'
import HeaderProfile  from './components/header/HeaderProfile';
import HeaderLogin  from './components/header/HeaderLogin';
import Chat from './components/body/chat/Chat';
import Profile from './components/body/profile/Profile';
import Main from './components/body/main/Main';
import Footer from './components/footer/Footer';
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {


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
