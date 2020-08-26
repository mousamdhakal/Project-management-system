import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/globals.css';
import './styles/index.css';

import store from './store';
import Routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.getItem('jwtToken'));
}

const App = () => <Routes />;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
