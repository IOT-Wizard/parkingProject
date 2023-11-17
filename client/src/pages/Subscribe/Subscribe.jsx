import { useState } from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import axios from 'axios';

const Subscribe = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser.user_id;
    
    const data = {
      car_id: values.car_id,
      end_date: values.end_date.format('YYYY-MM-DD'),
    };
  
    try {
      const response = await axios.post(`http://127.0.0.1:5000/subscribe/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      });
  
      message.success(response.data.message);
      form.resetFields();
    } catch (error) {
      console.error('Error subscribing:', error);
      message.error('Error subscribing');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="car_id"
        label="Car ID"
        rules={[{ required: true, message: 'Please enter the Car ID' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="end_date" label="End Date">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Subscribe
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Subscribe;
