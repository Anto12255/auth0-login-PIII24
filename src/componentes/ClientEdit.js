import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;

const ClientEdit = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/clients/${id}`);
        setClient(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Error al cargar el cliente');
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const onFinish = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/clients/${id}`, values);
      message.success('Cliente actualizado con éxito');
      navigate('/clients');
    } catch (error) {
      message.error('Error al actualizar el cliente');
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Form onFinish={onFinish} initialValues={client || {}} layout="vertical">
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingrese el nombre' }]}>
              <Input placeholder="Nombre del cliente" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Ingrese el email' }]}>
              <Input placeholder="Email del cliente" />
            </Form.Item>
            <Form.Item label="Teléfono" name="phone">
              <Input placeholder="Teléfono del cliente" />
            </Form.Item>
            {/* Agrega más campos según sea necesario */}
            <Form.Item>
              <Button type="primary" htmlType="submit">Actualizar Cliente</Button>
            </Form.Item>
          </Form>
        )}
      </Content>
    </Layout>
  );
};

export default ClientEdit;