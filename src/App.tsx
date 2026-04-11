import { useEffect } from 'react';
import './App.css'
import MainLayout from './components/MainLayout/MainLayout'
import { warmUp } from './ml/objectDetector';

function App() {
  useEffect(() => {
    warmUp();
  }, []);

  return <MainLayout />
}

export default App
