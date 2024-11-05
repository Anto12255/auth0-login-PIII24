import React, { useState, useEffect } from 'react';
import { Table, Button, message, Layout, Modal, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;
const { Title } = Typography;

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClients, setTotalClients] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    location: ''
  });
   
  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage]);

  const fetchClients = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clients?page=${page}`);
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
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      message.success('Cliente eliminado con éxito');
      fetchClients(currentPage);
    } catch (error) {
      message.error('Error al eliminar el cliente');
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/clients', newClient);
      message.success('Cliente creado con éxito');
      setNewClient({
        name: '',
        surname: '',
        email: '',
        phone: '',
        location: ''
      });
      setIsModalVisible(false);
      fetchClients(currentPage);
    } catch (error) {
      message.error('Error al crear el cliente');
    }
  };

  // Definición de columnas con los nuevos campos
  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Apellido', dataIndex: 'surname', key: 'surname' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    { title: 'Localidad', dataIndex: 'location', key: 'location' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button onClick={() => handleDelete(record._id)} type="link" danger>Eliminar</Button>
          <Link to={`/client/${record._id}/edit`}>
            <Button type="link">Editar</Button>
          </Link>
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Title level={2}>Lista de Clientes</Title>

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

        <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginTop: '20px' }}>
          Crear Cliente
        </Button>

        {/* Modal para crear nuevo cliente */}
        <Modal
          title="Crear Nuevo Cliente"
         open={isModalVisible}
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
            placeholder="Nombre"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Apellido"
            value={newClient.surname}
            onChange={(e) => setNewClient({ ...newClient, surname: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Correo Electrónico"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Teléfono"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Localidad"
            value={newClient.location}
            onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default ClientList;