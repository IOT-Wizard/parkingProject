import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const onFinish = async (values) => {
    setLoading(true);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/signin', { method: 'POST',  headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',  // Ajoutez cette ligne
      }, body: JSON.stringify(values), });   
      const data = await response.json(); // Move this line here
  
      if (response.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        console.log('Success:',data);
        console.log('ID:',data.user.user_id);

        // Handle successful login, e.g., redirect to another page
        navigate('/profile');
      } else {
        console.log('Failed:', data.message); // Change errorData to data
        // Handle failed login, e.g., display an error message
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    };
  
}

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
      <Form
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
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2
          style={{
            alignItems: 'center',
            transform: 'translateX(60%) translateY(-60%)',
            fontSize: 25,
          }}
        >
          Login
        </h2>

       
        <Form.Item
        label="Username"
        name="username"
        rules={[
            {
            required: true,
            message: 'Please input your username!',
            },
        ]}
        >
        <Input />
        </Form.Item>
    
        <Form.Item
        label="Password"
        name="password"
        rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
        ]}
        >
        <Input.Password />
        </Form.Item>
    
        <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Checkbox
        style={{
            textAlign:'center',
            transform:"translateX(100%)",
        }}
        >Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div
            style={{
              height: 200,
              position: 'relative',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                margin: 0,
                position: 'absolute',
                top: '1%',
                transform: 'translateX(200%)',
              }}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;