// src/componentes/Profile.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from 'antd';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div>
      {user && ( // Comprobar si hay un usuario autenticado
        <>
          <Avatar src={user.picture} alt={user.name} style={{ size: 'small' }} />
          <span>{user.name}</span>
        </>
      )}
    </div>
  );
};

export default Profile;