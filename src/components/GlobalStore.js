import React, { useState, useContext, useEffect } from 'react';

export const GlobalContext = React.createContext();

export function useGlobalStore() {
  return useContext(GlobalContext);
}

const prefixId = 'not-whatsapp-id';

export default function GlobalStore({children}) {

  const [userId, setUserId] = useState(() => {
    const jsonValue = localStorage.getItem(prefixId);
    if(jsonValue !== null) {
      return JSON.parse(jsonValue);
    } else {
      return null;
    }
  });
  const [showLogin, setShowLogin] = useState(() => {
    if(userId) {
      return false;
    } else {
      return true;
    }
  });
  const [chatScreenUserId, setChatScreenUserId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showContactDetail, setShowContactDetail] = useState(false);
  const [showContactUser, setShowContactUser] = useState({});

  const value = {
    userId,
    setUserId,
    showLogin,
    setShowLogin,
    showChat,
    setShowChat,
    showContactUser,
    setShowContactUser,
    showContactDetail,
    setShowContactDetail,
    chatScreenUserId,
    setChatScreenUserId
  };

  useEffect(() => {
    localStorage.setItem(prefixId, JSON.stringify(userId));
  }, [userId]);
  
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}