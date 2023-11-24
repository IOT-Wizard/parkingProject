// src/components/AddBadgeForm.js
import  { useState, useEffect } from 'react';
import { Input, Button, DatePicker,Form, Select } from 'antd';
<<<<<<< HEAD
=======


>>>>>>> fe4db40b8a12aa075910be8b0f3a9a77710e873c
import axios from 'axios';

const { Option } = Select;
const AddBadgeForm = () => {
  const [formData, setFormData] = useState({
    car_id: '',
    idCard: '',
    end_date: '',
    user_id: '', // Assuming you have a way to get the user_id
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/getallusers');
  
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (date, dateString) => {
    // Ant Design DatePicker provides both the 'date' object and the formatted 'dateString'
    handleChange('end_date', dateString);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/addbadge', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to add badge. Server response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <h2>Add Badge</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Car ID" name="car_id" rules={[{ required: true, message: 'Please enter Car ID' }]}>
          <Input onChange={(e) => handleChange('car_id', e.target.value)} />
        </Form.Item>
        <Form.Item label="ID Card" name="idCard" >
          <Input onChange={(e) => handleChange('idCard', e.target.value)} />
        </Form.Item>
        <Form.Item name="end_date" label="End Date" rules={[{ required: true, message: 'Please select a date' }]}>
        <DatePicker style={{ width: '100%' }} onChange={handleDateChange}  />
      </Form.Item>
        <Form.Item label="Select User" name="user_id" rules={[{ required: true, message: 'Please select a user' }]}>
          <Select
            onChange={(value) => handleChange('user_id', value)}
            placeholder="Select a user"
          >
            {users.map((user) => (
              <Option key={user.user_id} value={user.user_id}>
                {user.username}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBadgeForm;