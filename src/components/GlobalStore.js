import React, { useState, useContext, useEffect } from 'react';

export const GlobalContext = React.createContext();

export function useGlobalStore() {
  return useContext(GlobalContext);
}

const prefixId = 'not-WhatsApp-id';
const prefixHTU = 'not-WhatsApp-show-HTU'

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
  const [tabValue, setTabValue] = useState(0);
  const [showHTU, setShowHTU] = useState(() => {
    const json = localStorage.getItem(prefixHTU);
    if(json !== null) {
      return JSON.parse(json);
    }
    return true;
  });


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
    setChatScreenUserId,
    tabValue, 
    setTabValue,
    showHTU,
    setShowHTU
  };

  useEffect(() => {
    localStorage.setItem(prefixId, JSON.stringify(userId));
    localStorage.setItem(prefixHTU, JSON.stringify(showHTU));
  }, [userId, showHTU]);
  
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}