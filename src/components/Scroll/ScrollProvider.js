/* eslint-disable */
import React, { createContext, useState } from 'react';

export const ScrollContext = createContext(null);

export const ScrollProvider = ({ children }) => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = (val) => {
    setScroll(val);
  };

  return (
    <ScrollContext.Provider value={{ scroll, handleScroll }}>
      { children }
    </ScrollContext.Provider>
  );
};
