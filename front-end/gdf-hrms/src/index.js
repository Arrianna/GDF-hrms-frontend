import React from "react";
import ReactDOM from 'react-dom'; 
import App from './App';
import {QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:5001/api/';
axios.defaults.headers.post['Accept'] = 'application/json'

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>

    <App />
    </QueryClientProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
