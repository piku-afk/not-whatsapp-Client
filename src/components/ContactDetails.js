import React from 'react';
import './css/Contact.css'
import { AppBar, IconButton, Typography, Toolbar, Container, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useGlobalStore } from './GlobalStore';


export default function ContactDetails() {

  const { setShowContactDetail, showContactUser } = useGlobalStore();

  // console.log(showContactUser);

  function handleClick() {
    //leaving empty to complete chatscreen js
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