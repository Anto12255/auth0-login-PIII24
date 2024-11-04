// src/componentes/Home.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate("/"); // Redirigir a la página de inicio
      } else {
        loginWithRedirect(); // Redirigir al login de Auth0
      }
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, navigate]);

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes mostrar un spinner o mensaje de carga
  }

  return (
    <div>
      <h1>Bienvenido</h1>
      {!isAuthenticated && (
        <button onClick={loginWithRedirect}>Iniciar Sesión</button>
      )}
    </div>
  );
};

export default Home;