import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({ predictions: [] });
  
  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}