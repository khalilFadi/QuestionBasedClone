// MyContext.js

import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myGlobalGamePin, setMyGamePin] = useState('');

  return (
    <MyContext.Provider value={{ myGlobalGamePin, setMyGamePin }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
