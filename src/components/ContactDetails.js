import React from 'react';
import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useGlobalStore } from './GlobalStore';


export default function ContactDetails() {

  const { setShowContactDetail } = useGlobalStore();

  return (
    <AppBar className='chat__nav' position='static'>
      <Toolbar>
        <IconButton onClick={() => setShowContactDetail(false)} >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant='h6'>
          Piyush Contact
        </Typography>
      </Toolbar>
    </AppBar>
  );
}