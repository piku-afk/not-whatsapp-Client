import React, { useState, useEffect } from 'react';
import { projectDatabase } from '../firebaseConfig';
import { useGlobalStore } from './GlobalStore';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

export default function ChatListItem({chatScreenUserId}) {

  const [contact, setContact] = useState({
    conversationId: ' '
  });
  const [lastMessage, setLastMessage] = useState('');
  const { userId, setShowChat, setChatScreenUserId } = useGlobalStore();

  useEffect(() => {
    projectDatabase
      .collection('users')
      .doc(userId.toString())
      .get()
      .then(doc => setContact(
        doc.data().contacts.filter(contact => contact.userId === chatScreenUserId)[0]
        ))
      .catch(err => alert(err));
  }, [userId, chatScreenUserId]);

  useEffect(() => {
    let unsub = () => {};
    if(contact) {
      unsub = 
      projectDatabase
        .collection('conversations')
        .doc(contact.conversationId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => setLastMessage(snapshot.docs[0]?.data()), (err => alert(err)))
        ;
    };

    return () => {
      unsub();
    };

  }, [contact]);

  return (
    <ListItem
      component='li'
      divider 
      button 
      onClick={() => {
        setShowChat(true);
        setChatScreenUserId(chatScreenUserId);
      }} >
      <ListItemText primary={contact.savedName} secondary={ userId === lastMessage.sender ? `You: ${lastMessage.body}` : lastMessage.body} />
    </ListItem>
  );
}