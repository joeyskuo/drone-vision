import './App.css'
import MainLayout from './components/MainLayout.jsx/MainLayout'
import { AppProvider } from './context/AppContext'
import { VideoSyncProvider } from './context/VideoSyncContext'

function App() {

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
