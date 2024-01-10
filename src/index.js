import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
    <Auth0Provider
      domain="dev-ygze3nr24uoza5y4.us.auth0.com"
      clientId="1ksb39OWXh911JdWtqMkEXuEPfuHXN59"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </Provider>
    
);

reportWebVitals();
