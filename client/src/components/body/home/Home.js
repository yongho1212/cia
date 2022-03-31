import React from 'react'
import './home.css'
import { Link, Routes, Route, useNavigate} from "react-router-dom";
import {Button} from '@mui/material'
import Section from '../../Section';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


function Home() {

    let navigate = useNavigate();
    function handleClickSignIn() {
        navigate("/SignIn");
      }
      function handleClickSignUp() {
        navigate("/SignUp");
      }
    
    return (
      <>
        <div className="home_page">
          <div className="first_page">

          

            <h2>Hello everyone!</h2>
            <p>
                This is Home page before Login
            </p>
            <a href="https://www.youtube.com/c/DevATHTML" target="_blank" 
            rel="noopener noreferrer">My Youtube</a>

            <h3>Build a simple e-commerce site.</h3>

            <a href="https://youtu.be/uXl77UFkrkQ" target="_blank" 
            rel="noopener noreferrer">Build a Ecommerce</a>
            </div>
              
              <Section {...homeObjOne} />
              <Section {...homeObjThree} />
              <Section {...homeObjTwo} />
            </div>
            </>
            
    )
}

export default Home
