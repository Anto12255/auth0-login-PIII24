// App.js
import React from 'react';
import LoginButton from './componentes/LoginButton.js';
import LogoutButton from './componentes/LogoutButton.js';
import Profile from './componentes/Profile.js';

function App() {
  return (
    <div>
      <h1>Bienvenido a la Aplicación</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </div>
  );
}

export default App;