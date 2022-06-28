import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import axios from "axios";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { MenuItem, Menu } from "@mui/material";

const Search = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  // const channels = state.auth.state.loginData.joinedChannel

  // const lists = channels.map((chat) => 
  // <li>{chat}</li>
  // )

  const sexList = ['여성', '남성'];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [infList, setInfList] = React.useState();
  const [sexOpen, setSexOpen] = React.useState(false);
  const [ageOpen, setAgeOpen] = React.useState(false);
  const [tagOpen, setTagOpen] = React.useState(false);

  const [sexText, setSexText] = React.useState('성별');
  const [ageText, setAgeText] = React.useState('나이');
  const [tagText, setTagText] = React.useState('태그');

  const sexFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSexOpen(true);
  };

  const ageFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAgeOpen(true);
  };

  const tagFilterClick = () => {
    setTagOpen(true);
  };

  const selectMenu = () => {
    setSexOpen(false);
  };

  const handleClose = () => {
    setSexOpen(false);
    setAgeOpen(false);
    setTagOpen(false);
    setAnchorEl(null);
  };

  const getInfList = async () => {
    try {
      const res = await axios.post('http://localhost:1212/inf/getlist')
        .then((res) => {
          console.log(res);
          setInfList(res.data);
          return 0;
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  console.log('infList', infList);

  React.useEffect(() => {
    getInfList();
  }, []);

  return (
    <div>
      <h1>Filtered Search Area</h1>
      <div>
        <Button id="sex-filter" onClick={sexFilterClick}>
          {sexText}
        </Button>
        <Button id="age-filter" onClick={ageFilterClick}>
          {ageText}
        </Button>
        <Button>
          {tagText}
        </Button>
        <Menu open={sexOpen} anchorEl={anchorEl} onClose={handleClose}>
          {/* {sexList.map(item => item)} */}
          <MenuItem onClick={selectMenu}>여성</MenuItem>
          <MenuItem onClick={selectMenu}>남성</MenuItem>
        </Menu>
        <Menu open={ageOpen} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={selectMenu}>20대</MenuItem>
          <MenuItem onClick={selectMenu}>30대</MenuItem>
          <MenuItem onClick={selectMenu}>30대</MenuItem>
        </Menu>
      </div>
      {infList ? infList.map(item => {
        return (
          <div key={item._id} style={{ marginInline: '40px', marginTop: '40px' }}>
            <Link to={`/Detail/${item._id}`} style={{ color: 'black', display: 'flex', flexDirection: 'column', width: '200px', height: '280px', alignItems: 'flex-start' }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: 'red' }}>
                <img className='profile-img' src={item.avatar} width='200px' height='200px' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '20px' }}>
                  <div>
                    {item.insta}
                  </div>
                </div>
                <div style={{ fontSize: '20px' }}>
                  {item.nickname}
                </div>
              </div>
              <div style={{ fontSize: '14px' }}>
                {item.mobile}
              </div>
            </Link>
          </div>
        )
      }) : ''}
    </div> 
  );
} 
export default Search;
