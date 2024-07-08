// MyContext.js

import React, { createContext, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myGlobalGamePin, setMyGamePin] = useState('');
  const [studentPIN, setStudentPIN] = useState(null);
  const [userID, setUserID] = useState(null);

  return (
    <MyContext.Provider value={{ myGlobalGamePin, setMyGamePin, studentPIN, setStudentPIN, userID, setUserID}}>
      {children}
    </MyContext.Provider>
  );
};
export const useGoTo = () => {
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  return goTo;
};

export const useMyContext = () => useContext(MyContext);
