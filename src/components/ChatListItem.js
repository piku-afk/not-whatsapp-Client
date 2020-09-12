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
    if(contact) {
      projectDatabase
        .collection('conversations')
        .doc(contact.conversationId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .get()
        .then(snapshot => setLastMessage(snapshot.docs[0]?.data().body))
        .catch(err => alert(err));
    };

  }, [contact]);

  return (
    <ListItem
      divider 
      button 
      onClick={() => {
        setShowChat(true);
        setChatScreenUserId(chatScreenUserId);
      }} >
      <ListItemText primary={contact.savedName} secondary={lastMessage} />
    </ListItem>
  );
}