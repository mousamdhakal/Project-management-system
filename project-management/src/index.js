import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './styles/globals.css';
import './styles/index.css';

import store from './store';
import Routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.getItem('jwtToken'));
}

// Axios handling on error
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

const App = () => <Routes />;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
