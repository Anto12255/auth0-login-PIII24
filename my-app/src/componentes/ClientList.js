import React, { useState, useEffect } from 'react';
import { Table, Button, message, Layout, Modal, Input } from 'antd';
import axios from 'axios';

const { Content } = Layout;

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [newClient, setNewClient] = useState({ name: '' }); // Estado para el nuevo cliente

  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage]);

  const fetchClients = async (page) => {
    try {
      const response = await axios.get(`https://backend-login-logout-crud-p3.vercel.app/api/clients?page=${page}`);
      setClients(response.data.clients);
      setTotalClients(response.data.total);
      setLoading(false);
    } catch (error) {
      message.error('Error al obtener los clientes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-login-logout-crud-p3.vercel.app/api/clients/${id}`);
      message.success('Cliente eliminado con éxito');
      fetchClients(currentPage);
    } catch (error) {
      message.error('Error al eliminar el cliente');
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('https://backend-login-logout-crud-p3.vercel.app/api/clients', newClient);
      message.success('Cliente creado con éxito');
      setNewClient({ name: '' }); // Resetear el formulario
      setIsModalVisible(false); // Cerrar el modal
      fetchClients(currentPage); // Actualizar la lista de clientes
    } catch (error) {
      message.error('Error al crear el cliente');
    }
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button onClick={() => handleDelete(record._id)} type="link" danger>Eliminar</Button>
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Crear Cliente
        </Button>
        
        {/* Tabla de clientes */}
        <Table
          columns={columns}
          dataSource={clients}
          loading={loading}
          pagination={{
            current: currentPage,
            total: totalClients,
            onChange: (page) => setCurrentPage(page),
          }}
          rowKey="_id"
        />

        {/* Modal para crear nuevo cliente */}
        <Modal
          title="Crear Nuevo Cliente"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={handleCreate}>
              Crear
            </Button>,
          ]}
        >
          <Input
            placeholder="Nombre del Cliente"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default ClientList;