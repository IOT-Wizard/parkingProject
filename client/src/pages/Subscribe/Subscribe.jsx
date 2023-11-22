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
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      //transform: 'translateX(10%) translateY(-10%)',
      alignContent:'center',
      transform: 'translateX(10%)',
    }}
    >
    <Form 
    form={form} onFinish={onFinish} layout="vertical"
    name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          width: '100%',
        }}
    >
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
        <Button type="primary" htmlType="submit" loading={loading}
        style={{
          margin: 0,
          position: 'absolute',
          top: '1%',
          transform: 'translateX(170%)',
        }}
        >
          Subscribe
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Subscribe;
