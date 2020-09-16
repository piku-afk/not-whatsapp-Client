import React, { useState } from 'react';
import { useGlobalStore } from './GlobalStore';
import HowToUse from './HowToUse';
import './css/MainMenu.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function MainNav() {
  //for menu element
  const [anchorEl, setAnchorEl] = useState(null);
  const { showHTU, setShowHTU } = useGlobalStore();
  const { setShowLogin } = useGlobalStore();

  function handleLogout() {
    localStorage.setItem('not-WhatsApp-id', null);
    setShowLogin(true);
  }

  return (
    <>
      <AppBar className='main__nav' position='static'>
        <Toolbar>
          <Typography variant='h6'>
            Not WhatsApp
          </Typography>
  
          <IconButton 
          className='more-options' 
          onClick={(e) => setAnchorEl(e.currentTarget)} >
            <MoreVertIcon />
          </IconButton>
          <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)} >
          <MenuItem onClick={() => setShowHTU(true)}>How To Use</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
      <HowToUse show={showHTU} close={() => setShowHTU(false)} />
    </>
  );
};