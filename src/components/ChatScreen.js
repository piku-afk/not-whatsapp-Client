import React, { useState, useEffect } from 'react';
import ChatNav from './ChatNav';
import ChatBody from './ChatBody';
import './css/ChatScreen.css';

import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';

import Container from '@material-ui/core/Container';
import ChatForm from './ChatForm';

export default function ChatScreen() {
  const { chatScreenUser } = useGlobalStore();
  const [conversationId,  setConversationId] = useState(0);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    
    setConversationId(chatScreenUser.conversationId);

    let unsub = () => {};
    if(conversationId) {
      unsub = 
      projectDatabase.collection('conversations')
      .doc(conversationId.toString())
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        let temp = [];
        snapshot.docs.map(doc => temp.push({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(temp);
      }, (err) => alert(err));
    }

    return () => {
      unsub();
    };

  }, [chatScreenUser, conversationId]);

   return (
       <Container className='chat__container' maxWidth='sm' disableGutters>
         <ChatNav name={chatScreenUser?.savedName} />
         <ChatBody messages={messages} />
         <ChatForm conversationId={conversationId} />
       </Container>
   );
}