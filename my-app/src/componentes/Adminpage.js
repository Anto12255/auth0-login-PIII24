// Adminpage.js

import React from "react";
import ClientList from "./ClientList"; // Componente que muestra la lista de clientes

function AdminPage() {
  return (
    <div>
      <h1>Panel de Administración</h1>

      {/* Lista de Clientes */}
      <section>
        <h2>Lista de Clientes</h2>
        <ClientList /> {/* Componente que muestra la lista de clientes */}
      </section>
    </div>
  );
}

export default AdminPage;