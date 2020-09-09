import React, { useContext } from 'react';
import { GlobalContext } from './GlobalStore';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu, MenuItem } from '@material-ui/core';

export default function ChatNav() {

  const { setShowChat, setShowContactDetail } = useContext(GlobalContext);

  //for menu element
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className='chat__nav' position='static'>
      <Toolbar>
        <IconButton onClick={() => setShowChat(false)}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant='h6'>
          Piyush
        </Typography>

        <IconButton className='more-options' onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          setShowContactDetail(true);
          setShowChat(false);
          }}>See Contact</MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>
  );
};