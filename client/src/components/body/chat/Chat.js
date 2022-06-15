import React, { useState, useEffect, useRef } from 'react'
import {db, auth} from '../../../firebase';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import SendMessage from './Sendmessage';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import { useParams } from 'react-router';

import {
  getAuth
} from "firebase/auth";

import Channel from './Channel';


const Chat = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);
  const scroll = useRef()
  const [messages, setMessages] = useState([])

  const uid = state.auth.state.loginData.uid
  const {channelId} = useParams()

  // 채널 이름을 타고 들어오기는 하는데
  // 파이어 스토어에서 상품이름을 찾을 방법이 없음

  const getinfo = async () => {
    console.log(uid);
    const response = await axios
      .get("http://localhost:1212/user/getUserInfo", { params: { uid: uid } })
      .then((res) => {        
        console.log(res.data)
        const loginData = res.data 
      })
      .catch((error) => {
        console.log(error.response);
    });
  };

  useEffect(() =>{
    getinfo();
  },[])

  useEffect(() => {
    const docRef = await collection(db, `prdRoom/${prdfsid}/inflist/${channelId}`)
      onSnapshot(collection(db, "prdRoom"), (snapshot) => { 
          setMessages(snapshot.docs.map(doc => doc.data()))
      })
  },[])


  return (
    <div>
      <div>Chat</div>
      <section>
      <div>
    <div>Channel</div>
    <div className="msgs">
                {messages.map(({ id, text, photoURL, uid, displayName }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`} 
                        style={{backgroundColor:'#ffa', borderRadius:100, paddingLeft:30}}>
                            <img src={photoURL} alt="" />
                            <p>{uid}</p>
                            <p>{displayName}</p>
                            <p>{text}</p>
                            
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
    </div>
      </section>
    </div>
  )
}

export default Chat