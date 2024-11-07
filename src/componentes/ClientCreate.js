import React from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import axios from 'axios';

const { Content } = Layout;

const ClientCreate = () => {
  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/clients', values);
      message.success('Cliente creado con éxito');
    } catch (error) {
      message.error('Error al crear el cliente');
    }
  };

 
  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingrese el nombre' }]}>
            <Input placeholder="Nombre del cliente" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Crear Cliente</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ClientCreate; // Cambia a exportación por defecto