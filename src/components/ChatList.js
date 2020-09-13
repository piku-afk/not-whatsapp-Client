import React, { useEffect, useState } from 'react';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';
import ChatListItem from './ChatListItem';
import firebase from 'firebase/app';


import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';

export default function ChatList() {

  const [openDialog, setOpenDialog] = useState(false);
  const { userId } = useGlobalStore();
  const [chatList, setChatList] = useState([]);

  function handleClose() {
    setOpenDialog(false);
  }
  function handleOpen() {
    setOpenDialog(true);
  }

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
    <>
      <Container className='chatlist__container' disableGutters>
        <List>
          {chatList.map(userId => (
            <ChatListItem key={userId} chatScreenUserId={userId}/>
          ))}
        </List>

        <Fab onClick={() => handleOpen(true)} >  
          <ChatIcon />
        </Fab>
      </Container>
      <DialogComponent chatList={chatList} openDialog={openDialog} handleClose={handleClose}/>
    </>
  );
}

function DialogComponent({openDialog, handleClose, chatList}) {
  const [contacts, setContacts] = useState([]);
  const { userId, setChatScreenUserId, setShowChat } = useGlobalStore();
  
  useEffect(() => {
    projectDatabase.collection('users')
    .doc(userId.toString())
    .get().then(
      doc => setContacts(doc.data().contacts.filter(contact => !chatList.includes(contact.userId))
      ), 
    err => alert(err));
    
  }, [userId, chatList]);

  function handleClick(id, conversationId) {
    setChatScreenUserId(id);
    setShowChat(true);
    if(id) {
      projectDatabase
        .collection('conversations')
        .doc(conversationId)
        .onSnapshot(doc => {
          if(doc.exists) {
            projectDatabase
            .collection('users')
            .doc(userId.toString())
            .update({
              conversations: firebase.firestore.FieldValue.arrayUnion(id)
            });
          }
        });
    }
  }

  return (
    <Dialog
      className='chatDialog'
      fullScreen
      open={openDialog}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={handleClose} >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            Select Contact
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container disableGutters >
        <List>
          <ListItem primary='hello world' />
          { contacts && contacts.map(contact => (
            <ListItem component='li'
            key={contact.userId}
            divider
            button
            onClick={() => handleClick(contact.userId, contact.conversationId)}>
              <ListItemText primary={contact.savedName} />
            </ListItem>
          ))}
        </List>
      </Container>
    </Dialog>
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});