import React from 'react'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {
  getAuth
} from "firebase/auth";

import ChatRoom from './ChatRoom/Chatroom';


const Chat = () => {

  const auth = getAuth();

  const [user] = useAuthState(auth);

  return (
    <div>
      <div>Chat</div>
      <section>
       <ChatRoom />
      </section>
    </div>
  )
}

export default Chat