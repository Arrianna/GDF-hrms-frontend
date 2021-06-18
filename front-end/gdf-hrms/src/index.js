import React from "react";
import ReactDOM from 'react-dom'; 
import App from './App';
// import {QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './store/index';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:5001/api/';
axios.defaults.headers.post['Accept'] = 'application/json'

/* axios.interceptors.request.use((request) => {
  console.log(request);
  return request;
},
  (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  if(response.status === 200 || response.status === 201 || response.status === 204){
    console.log('Posted Successfully');
  }
  return response;
},
  (error) => {
    return Promise.reject(error);
}); */

// const client = new QueryClient();

ReactDOM.render(
  // <React.StrictMode>
  //   <QueryClientProvider client={client}>
  //     <App />
  //   </QueryClientProvider>    
  // </React.StrictMode>,
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
