"use client";

import React, { createContext, useState, useContext } from 'react';

const BiscuitContext = createContext();

export const BiscuitProvider = ({ children }) => {
  // Initialize biscuit balance (you might want to fetch this on login in a real app)
  const [biscuits, setBiscuits] = useState(1000);

  return (
    <BiscuitContext.Provider value={{ biscuits, setBiscuits }}>
      {children}
    </BiscuitContext.Provider>
  );
};

export const useBiscuit = () => {
  return useContext(BiscuitContext);
};