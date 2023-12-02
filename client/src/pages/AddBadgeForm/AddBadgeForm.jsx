// src/components/AddBadgeForm.js
import  { useState, useEffect } from 'react';

import { Input, Button, DatePicker,Form, Select, Card } from 'antd';


import axios from 'axios';

const { Option } = Select;
const AddBadgeForm = () => {
  const [formData, setFormData] = useState({
    car_id: '',
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
  
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      transform: 'translateX(-5%) translateY(15%)',
    }}
    >
       <Card title="Add subscription" 
       style={{ 
        width: 400,
        background: isCardHovered ? '#f8f9fa' : '#ffffff', // Change card background on hover
        transition: 'background-color 0.3s', // Smooth transition for the card background color
        transform: 'translateX(10%) translateY(-25%)',
      }}
      onMouseEnter={() => setIsCardHovered(true)} // Set hover state on mouse enter
      onMouseLeave={() => setIsCardHovered(false)} // Reset hover state on mouse leave
       >
      <Form onFinish={handleSubmit}>
        <Form.Item label="Car ID" name="car_id" rules={[{ required: true, message: 'Please enter Car ID' }]}>
          <Input onChange={(e) => handleChange('car_id', e.target.value)} />
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
          <Button type="primary" htmlType="submit"
          style={{
            margin: 0,
            position: 'absolute',
            top: '1%',
            transform: 'translateX(150%)',
          }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
};

export default AddBadgeForm;