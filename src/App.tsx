import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css'
import MainLayout from './components/MainLayout/MainLayout'
import { warmUp } from './ml/objectDetector';

const queryClient = new QueryClient();

function AppInner() {
  useQuery({
    queryKey: ['warmup'],
    queryFn: warmUp,
    staleTime: Infinity,
    retry: 1,
  });

  return <MainLayout />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  )
}

export default App
