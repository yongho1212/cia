import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/body/auth/login";
import SignUp from "./components/body/auth/register";
import Home from './components/body/home/Home'
import HeaderProfile  from './components/header/HeaderProfile';
import HeaderLogin  from './components/header/HeaderLogin';
import Chat from './components/body/chat/Chat';
import Profile from './components/body/profile/Profile';
import Main from './components/body/main/Main';
import Footer from './components/footer/Footer';

import axios from 'axios';
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'
import {useDispatch, useSelector} from 'react-redux'

function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])


  return (
    <BrowserRouter>
    <HeaderLogin />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/SignIn/*" element={<SignIn />} />
        <Route path="/SignUp/*" element={<SignUp />} />
        <Route path="/Main/*" element={<Main />} />
        <Route path="/Profile/*" element={<Profile />} />
        <Route path="/Chat/*" element={<Chat />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
