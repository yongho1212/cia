import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/body/auth/Login";
import Signup from "./components/body/auth/Signup";
import Home from './components/body/home/Home'
import HeaderLogin  from './components/header/HeaderLogin';
import HeaderProfile from './components/header/HeaderProfile';
import Chat from './components/body/chat/Chat';
import InfluencerList from './components/body/influencerList/InfluencerList';
import Search from './components/body/search/Search';
import UploadProfile from './components/body/profile/UploadProfile';
import Profile from './components/body/profile/Profile';
import DetailPage from './components/body/detailPage/detailPage';
import Main from './components/body/main/Main';
import Footer from './components/footer/Footer';
import SearchResult from './components/body/search/SearchResult';
import EditProfile from './components/body/editprofile/EditProfile';
import ProtectedRoute from "./components/ProtectedRoute";
import UserRoute from "./components/UserRoute";
import UploadProduct from './components/body/Product/uploadProduct';
import Workspace from './components/body/workSpace/Workspace';
import Navbar from './components/body/workSpace/Navbar';
import InfNavBar from './components/navbar/InfNavBar';
import AdNavBar from './components/navbar/AdNavBar';
import HomeNavBar from './components/navbar/HomeNavBar';
import DashMain from './components/body/workSpace/Dashmain';
import Layout from './layout/Layout'

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';
import EditDetailpage from './components/body/detailPage/EditDetailPage';

function App() {

  const [userRole, setUserRole] = useState('')

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const auth = getAuth();
  const user = auth.currentUser;

  const role = state.auth.role

  const searchRole = () => {
    setUserRole(state.auth.role)
  }
  
  useEffect(() => {
    searchRole();
  }, [])
  

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
          <>
            <Route path="/Home" element={<Home />}  />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </>  
          :
          <Route  element={<Layout />}>
            <Route path="/Main/*" element={<Main />} />
            <Route path="/SearchResult/:text" element={<SearchResult />} />
            {/* <Route path="/SearchResult" element={<Search />} /> */}
            <Route path="/UploadProfile" element={<UploadProfile/>} />
            <Route path="/Detail/:id" element={<DetailPage />} />
            <Route path="/EditDetailPage/:id" element={<EditDetailpage />} />
            {/* <Route path="/Detail/" element={<DetailPage />} /> */}
            <Route path="/Profile/*" element={<Profile />} />
            <Route path="/Chat/*" element={<Chat />} />
            <Route path="/Search/*" element={<Search />} />
            <Route path="/EditProfile/*" element={<EditProfile />} />
            <Route path="/Upload/" element={<UploadProduct />} />
            <Route path="/Influencerprflist/" element={<InfluencerList />} />
            <Route path="/Workspace/" element={<Workspace />} />
            <Route path="/DashMain/" element={<DashMain />} />
          </Route>
          }
        </Routes>
      <Footer style={{display: 'flex'}}/>
    </BrowserRouter>
    
  );
}

export default App;
