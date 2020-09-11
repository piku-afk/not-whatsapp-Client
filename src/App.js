import React, { useContext, useEffect } from 'react';
import { GlobalContext } from './components/GlobalStore';
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
  } = useContext(GlobalContext);

  useEffect(() => {
    window.scrollTo(0, 1);
    console.log('scrolled to (0,1)');
  }, []);

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
        in={!showChat && !showContactDetail }
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