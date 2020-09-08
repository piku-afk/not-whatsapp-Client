import React, { useContext } from 'react';
import { GlobalContext } from './tempStore';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function ChatNav() {

  const { setShowChat } = useContext(GlobalContext);

  return (
    <AppBar className='chat__nav' position='static'>
      <Toolbar>
        <IconButton onClick={() => setShowChat(false)}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant='h6'>
          Piyush
        </Typography>
      </Toolbar>
    </AppBar>
  );
};