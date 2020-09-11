import React, { useEffect, useState } from 'react';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';

export default function ChatList() {

  const { userId, setShowChat, setChatScreenUser } = useGlobalStore();
  const [chatList, setChatList] = useState([]);
  

  useEffect(() => {
  let unsub = () => {};

  if(userId) {
    unsub = 
    projectDatabase.collection('users')
      .doc(userId.toString())
      .onSnapshot(doc => setChatList(doc.data().conversations), (err) => alert(err));
  }

 

  return () => {
    unsub();
  };
  
  }, [userId]);

  return (
    <Container className='chatlist__container' disableGutters>
      <List>
        {chatList.map(item => (
          <ChatListItem key={item.userId} item={item} setShowChat={setShowChat} setChatScreenUser={setChatScreenUser} />
        ))}
      </List>
    </Container>
  );
}