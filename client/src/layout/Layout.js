import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom';
import './Layout.css'

import InfNavBar from '../components/navbar/InfNavBar';
import AdNavBar from '../components/navbar/AdNavBar';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import {
  getAuth
} from "firebase/auth";

const Layout = () => {

  const [userRole, setUserRole] = useState('')
  const auth = getAuth();
  
  

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);


  const searchRole = () => {
    setUserRole(state.auth.role)
  }
  
  useEffect(() => {
    searchRole();
  }, [])

  const sidebarRender = () => {
    if (userRole === "influencer"){
      return(<InfNavBar />)
    } else {
      return(<AdNavBar />)
    }
  }


  return (
    <div className="layout">
    <header className="header">
      
    </header>
    <aside className="aside">
    {
        userRole === "influencer"
        ? <InfNavBar />
        : <AdNavBar />
      }
    </aside>
    <main>
      <Outlet />
    </main>
    <footer className="footer">
        Footer
    </footer>
  </div>
  )
}

export default Layout
