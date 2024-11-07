// src/componentes/LogoutButton.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin }); // Redirige al usuario al origen después de cerrar sesión
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;