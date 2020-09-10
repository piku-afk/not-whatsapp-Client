import React, { useEffect, useState } from 'react';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function ChatList() {

  const { userId, setShowChat, setChatScreenUser } = useGlobalStore();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {

  const unsub = 
    projectDatabase.collection('users')
      .doc(userId.toString())
      .onSnapshot(doc => setChatList(doc.data().conversations), (err) => alert(err));

  return () => {
    unsub();
  };
  
  }, [userId]);

  return (
    <Container className='chatlist__container' disableGutters>
      <List>
        {chatList.map(item => getList(item, setShowChat, setChatScreenUser))}
      </List>
    </Container>
  );
}

function getList(item, setShowChat, setChatScreenUser) {
  return (
    <ListItem 
      key={item.userId} 
      divider 
      button 
      onClick={() => {
        setShowChat(true);
        setChatScreenUser(item);
      }} >
      <ListItemText>
        {item.savedName}
      </ListItemText>
    </ListItem>
  );
}