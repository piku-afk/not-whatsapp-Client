import React, { useState, useEffect } from 'react';
import './css/MainMenu.css'

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatList from './ChatList';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}>
      {value === index && children}
    </div>
  );
}

export default function MainContent() {
  const [tabValue, setTabValue] = useState(0);
  const [fixedTab, setFixedTab] = useState(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  useEffect(() => {
    const tabs = document.querySelector('.main__content .MuiAppBar-root').offsetTop;
    
    window.onscroll = () => {
      if(window.pageYOffset > tabs) {
        setFixedTab(true);
      } else {
        setFixedTab(false)
      }
    };

  }, []);

  return (
    <div className='main__content'>
      <AppBar position={ fixedTab ? 'fixed' : "static"}>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Chats" />
          <Tab label="Contacts" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x'
        index={tabValue}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        <TabPanel value={tabValue} index={0}>
          <ChatList />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Contacts
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}