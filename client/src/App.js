import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/body/auth/Login";
import Signup from "./components/body/auth/Signup";
import Home from './components/body/home/Home'
import HeaderLogin  from './components/header/HeaderLogin';
import HeaderProfile from './components/header/HeaderProfile';
import Chat from './components/body/chat/Chat';
import Influencerprflist from './components/body/influencerprflist';
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

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';
import EditDetailpage from './components/body/detailPage/EditDetailPage';

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
            <Route exact path="/Main/" element={<Main />} />
          }
          <Route path="/SearchResult/:text" element={<SearchResult />} />
          {/* <Route path="/SearchResult" element={<Search />} /> */}
          <Route path="/UploadProfile" element={<UploadProfile/>} />
          <Route path="/Detail/:id" element={<DetailPage />} />
          <Route path="/Login/*" element={<Login />} />
          <Route path="/EditDetailPage/:id" element={<EditDetailpage />} />
          {/* <Route path="/Detail/" element={<DetailPage />} /> */}
          <Route path="/Signup/*" element={<Signup />} />
          <Route path="/Profile/*" element={<Profile />} />
          <Route path="/Chat/*" element={<Chat />} />
          <Route path="/Search/*" element={<Search />} />
          <Route path="/EditProfile/*" element={<EditProfile />} />
          <Route path="/Upload/" element={<UploadProduct />} />
          <Route path="/Influencerprflist/" element={<Influencerprflist />} />
          <Route path="/Workspace/" element={<Workspace />} />
        </Routes>
      <Footer style={{display: 'flex'}}/>
    </BrowserRouter>
    
  );
}

export default App;
