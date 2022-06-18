import React, {useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';

import {
    signInWithEmailAndPassword,
    getAuth,
    updateProfile,
    sendEmailVerification
  } from "firebase/auth";



const Emailverify = () => {

    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        console.log(auth.currentUser.emailVerified)
        if (auth.currentUser.emailVerified) {
          navigate("/Main");
        }
      }, []);

const resendvfmail = () =>{
    sendEmailVerification(auth.currentUser)
}

//이메일 다시 보내기 누르고 60초동안 이메일 보내기 버튼 비활성화
//이메일 인증 리스너 만들어서 이메일 인증이 완료되면 로그아웃 하거나 메인으로 이동하게 만들기
      


  return (
      <div>
        <div>Emailverify</div>
        
            <div>
                <Button variant="outlined" onClick={()=> resendvfmail()}>resend</Button>
            </div>
      </div>
    
    
  )
}

export default Emailverify;
