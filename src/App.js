import React, { useContext } from 'react';
import { GlobalContext } from './components/GlobalStore';
import MainMenu from './components/MainMenu';
import ChatWindow from './components/ChatScreen';
import './App.css';

import Slide from '@material-ui/core/Slide';
import ContactDetails from './components/ContactDetails';

function App() {
  const { 
    showChat, 
    showContactDetail
  } = useContext(GlobalContext);

  return (
    <div className="app">
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
      
    </div>
  );
}

export default App;
