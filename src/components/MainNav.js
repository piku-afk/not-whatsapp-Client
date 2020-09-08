import React from 'react';
import './css/MainMenu.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function MainNav() {
  return (
    <AppBar className='main__nav' position='static'>
      <Toolbar>
        <Typography variant='h6'>
          Not WhatsApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
};