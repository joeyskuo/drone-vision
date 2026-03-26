import { createContext, useState, useContext } from 'react';

interface AppState {
  isLoading: boolean;
}

interface AppContextValue {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState<AppState>({ isLoading: false });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
