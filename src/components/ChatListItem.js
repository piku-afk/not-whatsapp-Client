import React, { useState, useEffect } from 'react';
import { projectDatabase } from '../firebaseConfig';
import { useGlobalStore } from './GlobalStore';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';

export default function ChatListItem({chatScreenUserId}) {

  const [contact, setContact] = useState();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState(null);
  const [lastMessage, setLastMessage] = useState({});
  const { userId, setShowChat, setChatScreenUserId, getTime } = useGlobalStore();

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
      const docRef =  projectDatabase.collection('conversations').doc(contact.conversationId);
      unsub = docRef.onSnapshot(doc => setConversation(doc.data())); 
    };
    return () => {
      unsub();
    };

  }, [contact]);

  useEffect(() => {
    //for count of unseen messages
    let unsub = () => {};
    if(conversation) {
      setLastMessage(conversation?.lastMessage);
      unsub = projectDatabase
        .collection('conversations')
        .doc(contact.conversationId)
        .collection('messages')
        .onSnapshot(snapshot => 
          setMessages(snapshot.docs.filter(doc => 
            doc.data().timestamp.toMillis() > conversation[userId].lastActive?.toMillis()
          ))
        );
    }
    return () => {
      unsub();
    };
  }, [conversation, userId, contact]);

  
  function getSecondary() {
    const message = userId === lastMessage?.sender ? `You: ${truncateLastMessage(lastMessage?.body, 35)}` : truncateLastMessage(lastMessage?.body, 40);
    
    return getTime(lastMessage.timestamp) + ': ' + message; 
  };

  return (
    <ListItem
      component='li' 
      divider
      button 
      onClick={() => {
        setShowChat(true);
        setChatScreenUserId(chatScreenUserId);
      }} >
      <ListItemText primary={contact?.savedName} secondary={lastMessage && getSecondary()} />
      <Badge badgeContent={messages?.length} />
    </ListItem>
  );
}

function truncateLastMessage(str, len) {
  if(str && str.length > len) {
    return str.substring(0, len) + '...';
  }
  return str;
}