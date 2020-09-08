import React, { useContext } from 'react';
import { GlobalContext } from './components/tempStore';
import MainMenu from './components/MainMenu';
import ChatWindow from './components/ChatWindow';
import './App.css';

import Slide from '@material-ui/core/Slide';

function App() {
  const { showChat } = useContext(GlobalContext);

  return (
    <div className="app">
      <Slide
        direction='down'
        in={!showChat}
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
    </div>
  );
}

export default App;
