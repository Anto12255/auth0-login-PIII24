import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./componentes/LoginButton";
import LogoutButton from "./componentes/LogoutButton";
import Profile from "./componentes/Profile";
import ClientList from "./componentes/ClientList"; // Lista de clientes
import ClientCreate from './componentes/ClientCreate'; // Crear cliente
import ClientEdit from './componentes/ClientEdit'; // Editar cliente
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>; // Mensaje de carga mientras se carga la autenticación
  }

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
          <Title level={2} style={{ color: "white", margin: 0 }}>Bienvenido a la Aplicación</Title>
          {isAuthenticated && <Profile />}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            {/* Ruta de inicio o login */}
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/clients" /> : <LoginButton />}
            />
            {/* Ruta de lista de clientes */}
            <Route
              path="/clients"
              element={isAuthenticated ? <ClientList /> : <Navigate to="/" />}
            />
            {/* Ruta de creación de cliente */}
            <Route
              path="/client/crear"
              element={isAuthenticated ? <ClientCreate /> : <Navigate to="/" />}
            />
            {/* Ruta de edición de cliente */}
            <Route
              path="/client/:id/edit"
              element={isAuthenticated ? <ClientEdit /> : <Navigate to="/" />}
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;