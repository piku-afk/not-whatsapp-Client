import React, { useEffect, useState } from 'react';
import { useGlobalStore } from './GlobalStore';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { projectDatabase } from '../firebaseConfig';

export default function ChatList() {

  const { setShowChat } = useGlobalStore();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {

    const unsub = projectDatabase.collection('users')
      .doc('7278215186')
      .collection('chats')
      .onSnapshot(snapshot => {    
        let temp = [];
        snapshot.docs.forEach(doc => {
          temp.push({
            number: doc.id,
            ...doc.data()
          });
        })
        return setChatList(temp);
      });

    return () => {
      // this is a cleanup function that react will run when a component using the hook unmounts
      unsub()
    }

  }, []);

  console.log(chatList);

  return (
    <Container className='chat__container' disableGutters>
      <List>
        {chatList.map(item => getList(item, setShowChat))}
      </List>
    </Container>
  );
}

function getList(item, setShowChat) {
  return (
    <ListItem 
      key={item.number} 
      divider 
      button 
      onClick={() => setShowChat(true)} >
      <ListItemText>
        {item.name}
      </ListItemText>
    </ListItem>
  );
}