import React, { useState } from 'react';

export const GlobalContext = React.createContext();



export default function GlobalStore({children}) {

  const [showChat, setShowChat] = useState(false);

  const value = {
    showChat,
    setShowChat
  };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}