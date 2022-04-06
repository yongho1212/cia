import React, {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";
import { useUserAuth } from '../../context/UserAuthContext'
import { useDispatch, useSelector } from "react-redux";
import { logOutInitiate } from "../../redux/actions"


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HeaderLogin = () => {


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();
  const handleAuth = () => {
    if (user) {
      dispatch(logOutInitiate());
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let navigate = useNavigate();
    function handleClickHome() {
      navigate("/Home");
    }
    function handleClickMain() {
      navigate("/Main");
    }
    function handleClickSignIn() {
      navigate("/Login");
    }
    function handleClickSignUp() {
      navigate("/SignUp");
    }
    async function handleLogout() {
      try {
        dispatch(logOutInitiate());
        console.log('logout')
      } catch (err) {
        console.log(err)
  };
    };
    function handleClickProfile() {
      navigate("/Profile");
    }

  

  return (
    <AppBar position="static" style={{backgroundColor:'#000'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters style={{justifyContent:'space-between'}}>
        {!user &&
        <Box>
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleClickHome}
            >
               HOME
            
          
          </Button>
        </Box>
        }
        {user &&
        <Box>
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleClickMain}
            >
               MAIN
            
          
          </Button>
        </Box>
        }
        {!user &&
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleClickSignUp}
            >
                회원가입
            </Button>
            <Button 
                variant="outlined"
                style={{color:"#75fb9f", borderColor:"#75fb9f" , marginInline:10}}
                onClick={handleClickSignIn}
            >
                로그인
            </Button>
        </Box>  
}
{user &&
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleClickProfile}
            >
                프로필
            </Button>
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleLogout}
            >
                로그아웃
            </Button>
        </Box>  
}


         
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderLogin;