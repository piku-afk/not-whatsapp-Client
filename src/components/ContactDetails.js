import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import './css/Contact.css'

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useGlobalStore } from './GlobalStore';
import { projectDatabase } from '../firebaseConfig';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function ContactDetails() {

  const { 
    userId,
    setShowContactDetail, 
    showContactUser,
    setChatScreenUserId,
    setShowChat
  } = useGlobalStore();

  // console.log(showContactUser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleClick() {
    setChatScreenUserId(showContactUser.userId);
    setShowChat(true);
    setShowContactDetail(false);
    if(showContactUser.userId) {
      projectDatabase
        .collection('conversations')
        .doc(showContactUser.conversationId)
        .onSnapshot(doc => {
          if(doc.exists) {
            projectDatabase
            .collection('users')
            .doc(userId.toString())
            .update({
              conversations: firebase.firestore.FieldValue.arrayUnion(showContactUser.userId)
            });
          }
        });
    }
  }

  return (
    <Container className='contact-details__container'  maxWidth='sm' disableGutters>
      <AppBar className='contact-details__nav' position='static'>
        <Toolbar>
          <IconButton onClick={() => setShowContactDetail(false)} >
            <ArrowBackIcon />
          </IconButton>
  
          <Typography variant='h6'>
            Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className='contact-details__body' >
        <Typography variant='h6'>
          Name: <span className="normal">{showContactUser.savedName}</span>
        </Typography>
        <Typography variant='h6'>
          Number: <span className="normal">{showContactUser.userId}</span>
        </Typography>
        <Button variant='contained' onClick={handleClick} >
          Chat
        </Button>
      </Container>
    </Container>
  );
}