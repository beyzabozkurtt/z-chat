// src/context/AddScreenContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AddScreenContext = createContext();

export const AddScreenProvider = ({ children }) => {
  const [showAddScreen, setShowAddScreen] = useState(false);

  const contextValue = {
    showAddScreen,
    setShowAddScreen,
  };

  return (
    <AddScreenContext.Provider value={contextValue}>
      {children}
    </AddScreenContext.Provider>
  );
};

export const useAddScreenContext = () => useContext(AddScreenContext);
