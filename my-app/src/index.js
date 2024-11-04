// index.js o App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';

const domain = "TU_DOMINIO_DE_AUTH0"; // Reemplaza con tu dominio de Auth0
const clientId = "TU_CLIENT_ID"; // Reemplaza con tu Client ID

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);