// MyContext.js

import React, { createContext, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myGlobalGamePin, setMyGamePin] = useState('');

  return (
    <MyContext.Provider value={{ myGlobalGamePin, setMyGamePin }}>
      {children}
    </MyContext.Provider>
  );
};
// export const goTo = () =>{
//   const navigate = useNavigate();

// }
export const useGoTo = () => {
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  return goTo;
};

export const useMyContext = () => useContext(MyContext);
