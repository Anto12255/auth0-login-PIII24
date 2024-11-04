// src/components/LogoutButton.js
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;