import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ContextProvider} from './ContextProvider';
import { QueryClient, QueryClientProvider } from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './ErrorBoundary';
import FallbackUi from './FallbackUi';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary fallback={<FallbackUi/>}>
            <ContextProvider>
            <QueryClientProvider client={queryClient}> 
                <App />
            </QueryClientProvider> 
            </ContextProvider>
        </ErrorBoundary>
    </React.StrictMode>
  
);


