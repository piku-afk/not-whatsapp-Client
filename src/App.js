import React from 'react';
import { useGlobalStore } from './components/GlobalStore';
import MainMenu from './components/MainMenu';
import ChatWindow from './components/ChatScreen';
import './App.css';

import Slide from '@material-ui/core/Slide';
import ContactDetails from './components/ContactDetails';
import Login from './components/Login';

import { Beforeunload } from 'react-beforeunload';

function App() {
  return (
    <Beforeunload onBeforeunload={(e) => e.preventDefault()} >  
      <div className="app">
        <GetApp />
      </div>
    </Beforeunload>
  );
}

export default App;

function GetApp() {
  const { 
    showLogin,
    showChat, 
    showContactDetail
  } = useGlobalStore();

  return (
    <>
      <Slide
        direction='up'
        in={showLogin}
        mountOnEnter
        unmountOnExit>
        <div>
          <Login />
        </div>
      </Slide>

      <Slide
        direction='down'
        in={!showChat && !showContactDetail && !showLogin}
        mountOnEnter
        unmountOnExit>
        <div> 
          <MainMenu />
        </div>
      </Slide>
      {/* {!showChat && !showContactDetail && !showLogin && <MainMenu />} */}

      <Slide 
        direction='up' 
        in={showChat}
        mountOnEnter
        unmountOnExit >
        <div> {/* this div is needed for transition/slide to work */}
          <ChatWindow />
        </div>
      </Slide>

      <Slide
        direction='up' 
        in={showContactDetail}
        mountOnEnter
        unmountOnExit >
          <div>{/* this div is needed for transition/slide to work */}
            <ContactDetails />
          </div>
        </Slide>
    </>
  );
}