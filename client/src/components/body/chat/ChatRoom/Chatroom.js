import React, { useRef, useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection,serverTimestamp,addDoc } from "firebase/firestore";

import {
  getAuth
} from "firebase/auth";

import ChatMessage from '../ChatMessages/Chatmessages';

const ChatRoom = () => {
    const auth = getAuth();
    const dummy = useRef();
    
    const query = collection('messages').orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await addDoc(collection( 'msg'),{
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={dummy}></span>
  
      </main>
  
      <form onSubmit={sendMessage}>
  
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" disabled={!formValue}>🕊️</button>
  
      </form>
    </>)
  }

export default ChatRoom;