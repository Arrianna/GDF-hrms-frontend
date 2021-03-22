import React from "react";
import ReactDOM from 'react-dom'; 
import App from './App';
import {QueryClient, QueryClientProvider } from 'react-query';
import Axios from 'axios';

Axios.defaults.baseURL = 'https://localhost:5001/api/EmployeeInfo';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>

    <App />
    </QueryClientProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
