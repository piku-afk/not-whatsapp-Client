import React, { useRef, useEffect, useState } from 'react';
import { projectDatabase } from '../firebaseConfig';
import { useGlobalStore } from './GlobalStore';
import firebase from 'firebase/app';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

export default function ChatForm() {

  const { userId, showContactUser } = useGlobalStore();
  const [newMessage, setNewMessage] = useState(null);
  const bodyRef = useRef(null);
  
  useEffect(() => {

    if (newMessage !== null) {
      projectDatabase.collection('conversations')
        .doc(showContactUser.conversationId)
        .collection('messages')
        .add(newMessage);

      projectDatabase.collection('conversations')
        .doc(showContactUser.conversationId)
        .set({
          lastMessage: newMessage
        }, {merge: true});
    }
    setNewMessage(null);

  }, [showContactUser, newMessage])

  function handleSubmit(e) {
    e.preventDefault();
    let body = bodyRef.current.value;
    if(body === '') {
      return;
    }
    
    setNewMessage({
      body,
      sender: userId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    bodyRef.current.value = '';
  };

  return (
    <Container className='chat__form' >
      <form onSubmit={handleSubmit} >
        <TextField 
          inputRef={bodyRef} 
          size='small' 
          variant='outlined' 
          placeholder='Type a message' />
          <IconButton type='submit'>
            <SendIcon />
          </IconButton>
      </form>
    </Container>
  );
}