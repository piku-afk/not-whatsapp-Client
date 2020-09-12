import React from 'react';
import { useGlobalStore } from './components/GlobalStore';
import MainMenu from './components/MainMenu';
import ChatWindow from './components/ChatScreen';
import './App.css';

import Slide from '@material-ui/core/Slide';
import ContactDetails from './components/ContactDetails';
import Login from './components/Login';

function App() {
  const { 
    showLogin,
    showChat, 
    showContactDetail
  } = useGlobalStore();

  return (
    <div className="app">
      { showLogin ? <Login /> : wholeApp(showChat, showContactDetail) }  
    </div>
  );
}

export default App;

function wholeApp(showChat, showContactDetail) {
  return (
    <>
      <Slide
        direction='down'
        in={!showChat && !showContactDetail}
        timeout={{
          enter: 250,
          exit: 100
        }}
        mountOnEnter
        unmountOnExit>
        <div> {/* this div is needed for transition/slide to work */}
          <MainMenu />
        </div>
      </Slide>

      <Slide 
        direction='up' 
        in={showChat}
        timeout={{
          enter: 250,
          exit: 100
        }}
        mountOnEnter 
        unmountOnExit >
        <div> {/* this div is needed for transition/slide to work */}
          <ChatWindow />
        </div>
      </Slide>

      <Slide
        direction='up' 
        in={showContactDetail}
        timeout={{
          enter: 250,
          exit: 100
        }}
        mountOnEnter 
        unmountOnExit >
          <div>{/* this div is needed for transition/slide to work */}
            <ContactDetails />
          </div>
        </Slide>
    </>
  );
}