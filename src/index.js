
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde react-dom/client
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';

const domain = "dev-gspvq4pogtwmnrlo.us.auth0.com"; // Reemplaza con tu dominio de Auth0
const clientId = "mUi9tbfGoawMn6gIa0DyO213Zn65Zu0j"; // Reemplaza con tu Client ID

// Cambia ReactDOM.render por createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);