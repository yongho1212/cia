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
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index';
import { getAuth, signOut } from "firebase/auth";



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HeaderProfile = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userRole, setUserRole] = useState("");

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const auth = getAuth();


/*  useEffect(() => {
    const getRole = async() => {
      try{
        setUserRole(state);
        console.log(state.auth.role)
      } catch(e){
        console.log(e)
      }
    } ;
    getRole();

    
  },[])


  const handleAuth = () => {
    if (user) {
      dispatch(logOutInitiate());
    }
  };
*/
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
    
    function handleClickMain() {
      navigate("/Main");
    }
    function handleClickChat() {
      navigate("/Chat");
    }
    function handleClickSearch() {
      navigate("/Search");
    }
    function handleClickUpload() {
      navigate("/Upload");
    }
    
    async function handleLogout() {
      try {
        logoutUser();
        nofbuser(false);;
        signOut(auth);
        navigate('/Home')
        console.log('logout')
      } catch (err) {
        console.log(err)
  };
    };
    function handleClickProfile() {
      navigate("/Profile");
    }

  

  return (
    <AppBar position="static" style={{backgroundColor:'#fff', zIndex:100}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters style={{justifyContent:'space-between'}}>
        
        <Box>
            
               <Button 
                variant="text"
                style={{ backgroundColor:"#fff", color:"#000",fontSize:31,fontWeight:'bold', marginInline:10}}
                onClick={handleClickMain}
                >
                  Sway
                </Button>
        </Box>
        
        

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            

          
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleClickUpload}
            >
                업로드
            </Button>
       
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleClickSearch}
            >
                검색
            </Button>
            <Button 
                variant="contained"
                style={{color:"#75fb9f", backgroundColor:"#75fb9f", color:"#000", marginInline:10}}
                onClick={handleClickChat}
            >
                채팅
            </Button>
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



         
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderProfile;