import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    // Definir la URL de redirección al finalizar el login
    const redirectUri = window.location.origin; // Usar el origen sin '/callback'

    loginWithRedirect({
      redirect_uri: redirectUri, // Configurar la URL de redirección
    });
  };

  return (
    <Button type="primary" onClick={handleLogin}>
      Iniciar Sesión
    </Button>
  );
};

export default LoginButton;