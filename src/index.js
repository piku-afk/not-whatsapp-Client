import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import GlobalStore from './components/tempStore';

ReactDOM.render(
  // <React.StrictMode>
    <GlobalStore>
      <App />
    </GlobalStore>,
  // </React.StrictMode>
  document.getElementById('root')
);
