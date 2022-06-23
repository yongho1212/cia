import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

const Search = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  const channels = state.auth.state.loginData.joinedChannel

  const lists = channels.map((chat) => 
  <li>{chat}</li>
  )

  return (
    <div>
      <h1>My Chat list</h1>
      {lists}    
    </div> 
  );
} 
export default Search;
