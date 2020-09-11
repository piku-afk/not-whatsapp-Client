import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { projectDatabase } from '../firebaseConfig';

export default function ChatListItem({item, setShowChat, setChatScreenUser}) {
  const [lastMessage, setLastMessage] = useState({
    body: ''
  });

  useEffect(() => {
    const unsub =  
    projectDatabase
      .collection('conversations')
      .doc(item.conversationId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        if(snapshot.docs[0]) {
          setLastMessage(snapshot.docs[0].data());
        }
      }, (err) => alert(err));
    
    return () => {
      unsub();
    };
  }, [item]);

  return (
    <ListItem
      divider 
      button 
      onClick={() => {
        setShowChat(true);
        setChatScreenUser(item);
      }} >
      <ListItemText primary={item.savedName} secondary={lastMessage.body} />
    </ListItem>
  );
}