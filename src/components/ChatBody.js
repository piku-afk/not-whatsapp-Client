import React, { useRef, useEffect, useState } from 'react';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';
import firebase from 'firebase/app';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function scrollToBottom(ref) {
  window.scrollTo(0, ref.current.offsetTop);
};

export default function ChatBody() {

  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const bottomRef = useRef(null);
  const { userId, showContactUser } = useGlobalStore();

  useEffect(() => {
    let unsub = () => {};
    if(showContactUser.conversationId) {
      unsub = 
      projectDatabase.collection('conversations')
      .doc(showContactUser.conversationId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        let temp = [];
        snapshot.docs.map(doc => temp.push({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(temp);
        //scrolling to bottom
        const viewportHeight = window.screen.height - 66;
        const chatBodyHeight = chatBodyRef.current.offsetHeight;
        if(chatBodyHeight > viewportHeight) {
          scrollToBottom(bottomRef);
        }
      }, (err) => alert(err));
    };

    return () => {
      unsub();
    };


  }, [showContactUser, userId]);

  useEffect(() => {
    //to show the count of unknown messages
    if(showContactUser.conversationId) {
      projectDatabase.collection('conversations')
        .doc(showContactUser.conversationId)
        .set({
          [userId]: {
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
          }
        }, {merge: true});
    }
  }, [showContactUser, userId, messages]);

  return (
    <Container ref={chatBodyRef} className='chat__body'>
      {messages.map(message => (
        <Message key={message.id} message={message} userId={userId} />
      ))}
      <div ref={bottomRef} className='bottom-div' />
    </Container>
  );
}

function Message({message, userId}) {
  const sender = message.sender === userId;
  return (
      <Paper className={`${sender && 'right'}`} elevation={1}>
        <Typography variant='body1'>
          {message?.body}
        </Typography>
      </Paper>
  );
}