import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;

const ClientEdit = () => { // Cambia la exportación
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`https://backend-login-logout-crud-p3.vercel.app/api/clients/${id}`);
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
      await axios.put(`https://backend-login-logout-crud-p3.vercel.app/api/clients/${id}`, values);
      message.success('Cliente actualizado con éxito');
      navigate('/client');
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
          <Form onFinish={onFinish} initialValues={client} layout="vertical">
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingrese el nombre' }]}>
              <Input placeholder="Nombre del cliente" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Actualizar Cliente</Button>
            </Form.Item>
          </Form>
        )}
      </Content>
    </Layout>
  );
};

export default ClientEdit; // Cambia a exportación por defecto