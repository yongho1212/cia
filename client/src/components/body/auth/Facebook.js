import React, { useState, useEffect } from "react";
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response);
  }

export default function FacebookLoginButton() {
  return (
    <FacebookLogin
        appId="921201001964201"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={responseFacebook}
        icon="fa-facebook" />
  );
}