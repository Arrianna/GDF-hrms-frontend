import React from "react";
import ReactDOM from 'react-dom'; 
import App from './App';
import {QueryClient, QueryClientProvider } from 'react-query';
//import SearchPage from './search-page';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>

    <App />
    </QueryClientProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
