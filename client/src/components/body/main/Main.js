import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../../context/UserAuthContext";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";


const Main = () => {
  const { logOut, currentUser } = useUserAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/Home");
    } catch (error) {
      console.log(error.message);
    }
  };


  




  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {currentUser && currentUser.email}<br />
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
       
      </div>
    </>
  );
};

export default Main;