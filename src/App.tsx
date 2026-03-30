import { useEffect } from 'react';
import './App.css'
import MainLayout from './components/MainLayout/MainLayout'
import { AppProvider } from './context/AppContext'
import { VideoSyncProvider } from './context/VideoSyncContext'
import { warmUp } from './ml/objectDetector';

function App() {

  useEffect(() => {
    warmUp();
  }, []);

  return (
    <>
      <AppProvider>
        <VideoSyncProvider>
          <MainLayout/>
        </VideoSyncProvider>
      </AppProvider>
    </>
  )
}

export default App
