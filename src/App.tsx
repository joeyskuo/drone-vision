import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import MainLayout from './components/MainLayout/MainLayout'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout />
    </QueryClientProvider>
  )
}

export default App
