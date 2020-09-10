import React, { useState, useContext } from 'react';

export const GlobalContext = React.createContext();

export function useGlobalStore() {
  return useContext(GlobalContext);
}


export default function GlobalStore({children}) {

  const [userId, setUserId] = useState(7278215186);
  const [chatScreenUser, setChatScreenUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showContactDetail, setShowContactDetail] = useState(false);

  const value = {
    userId,
    setUserId,
    chatScreenUser,
    setChatScreenUser,
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