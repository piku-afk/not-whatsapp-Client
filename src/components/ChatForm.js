import React, { useRef, useEffect, useState } from 'react';
import { projectDatabase } from '../firebaseConfig';
import { useGlobalStore } from './GlobalStore';
import firebase from 'firebase';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

export default function ChatForm({conversationId}) {

  const { userId } = useGlobalStore();
  const [newMessage, setNewMessage] = useState(null);
  const ref = useRef(null);

  useEffect(() => {

    if (newMessage !== null) {
      projectDatabase.collection('conversations')
        .doc(conversationId)
        .collection('messages')
        .add(newMessage);
    }
    setNewMessage(null);

  }, [conversationId, newMessage])

  function hanldeSubmit(e) {
    e.preventDefault();
    if(ref.current.value === '') {
      return
    }
    const body = ref.current.value;
    setNewMessage({
      body,
      sender: userId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    ref.current.value = '';
  };

  return (
    <Container className='chat__form' >
      <form onSubmit={hanldeSubmit} >
        <TextField 
          inputRef={ref} 
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