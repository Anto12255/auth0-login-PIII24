// src/components/LoginButton.js
// src/componentes/LoginButton.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button type="primary" onClick={() => loginWithRedirect()}>
      Iniciar Sesión
    </Button>
  );
};

export default LoginButton;