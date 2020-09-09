import React, { useState, useContext } from 'react';

export const GlobalContext = React.createContext();

export function useGlobalStore() {
  return useContext(GlobalContext);
}


export default function GlobalStore({children}) {

  const [showChat, setShowChat] = useState(true);
  const [showContactDetail, setShowContactDetail] = useState(false);

  const value = {
    showChat,
    setShowChat,
    showContactDetail,
    setShowContactDetail
  };
  
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}