import './App.css'
import MainLayout from './components/MainLayout.jsx/MainLayout'
import { AppProvider } from './context/AppContext'

function App() {

  return (
    <>
      <AppProvider>
        <MainLayout/>
      </AppProvider>
    </>
  )
}

export default App
