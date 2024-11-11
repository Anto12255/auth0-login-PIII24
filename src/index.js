
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde react-dom/client
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';

const domain = "dev-wqae6btzuje7lyes.us.auth0.com"; // Reemplaza con tu dominio de Auth0
const clientId = "HbS3xXIw87Z8fLcoLYn3qukUfXK2uQ4B"; // Reemplaza con tu Client ID

// Cambia ReactDOM.render por createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);