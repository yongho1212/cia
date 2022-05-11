import React, { useState, useEffect, useRef } from 'react'
import {db, auth} from '../../../firebase';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import SendMessage from './Sendmessage';

const Channel = () => {
    const scroll = useRef()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "messages"), (snapshot) => { 
            setMessages(snapshot.docs.map(doc => doc.data()))
        })

    },[])

  return (
      <div>
    <div>Channel</div>
    <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
    </div>
  )
}


export default Channel;