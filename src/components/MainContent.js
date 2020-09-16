import React from 'react';
import './css/MainMenu.css'

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatList from './ChatList';
import ContactList from './ContactList';
import { useGlobalStore } from './GlobalStore';

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
  const {tabValue, setTabValue} = useGlobalStore();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  return (
    <div className='main__content'>
      <AppBar position="static">
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
          <ContactList />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}