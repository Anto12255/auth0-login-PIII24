// src/PublicPage.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const PublicPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Página Pública</h1>
      <button onClick={loginWithRedirect}>Iniciar Sesión</button>
    </div>
  );
};

export default PublicPage;