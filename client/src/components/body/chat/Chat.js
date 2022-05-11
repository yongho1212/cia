import React from 'react'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {
  getAuth
} from "firebase/auth";

import Channel from './Channel';


const Chat = () => {



  return (
    <div>
      <div>Chat</div>
      <section>
       <Channel/>
      </section>
    </div>
  )
}

export default Chat