import React, { useContext } from 'react';
import { GlobalContext } from './tempStore';
import './css/ChatWindow.css';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function ChatList() {

  const { setShowChat } =useContext(GlobalContext);

  return (
    <Container className='chat__container' disableGutters>
      <List>
        <ListItem divider button onClick={() => setShowChat(true)} >
          <ListItemText primary='Piyush' />
        </ListItem>
        <ListItem divider button onClick={() => setShowChat(true)} >
          <ListItemText primary='Kumar' />
        </ListItem>
        <ListItem divider button onClick={() => setShowChat(true)} >
          <ListItemText primary='Mahato' />
        </ListItem>
      </List>
    </Container>
  );
}