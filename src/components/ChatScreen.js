import React, { useEffect } from 'react';
import ChatNav from './ChatNav';
import ChatBody from './ChatBody';
import './css/ChatScreen.css';

import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';

import Container from '@material-ui/core/Container';
import ChatForm from './ChatForm';

export default function ChatScreen() {
  const { userId, chatScreenUserId, setShowContactUser } = useGlobalStore();
  
  useEffect(() => {

  projectDatabase
    .collection('users')
    .doc(userId.toString())
    .get()
    .then(doc => {
      setShowContactUser(
        doc.data().contacts.filter(contact => 
          contact.userId === chatScreenUserId)[0]);
    });

  }, [chatScreenUserId, userId, setShowContactUser]);

   return (
       <Container className='chat__container' maxWidth='sm' disableGutters>
         <ChatNav />
         <ChatBody />
         <ChatForm />
       </Container>
   );
}