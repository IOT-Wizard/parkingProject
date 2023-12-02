import { useState } from 'react';
import { Button, Checkbox, Form, Input, Card } from 'antd';
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

        // Check the user's role and navigate accordingly
        if (data.user.role.toLowerCase() === 'admin') {
          console.log('Navigating to /admin');
          navigate('/admin');
        } else {
          console.log('Navigating to /profile');
          navigate('/profile');
        }
        
      } else {
        console.log('Failed:', data.message); // Change errorData to data
        // Handle failed login, e.g., display an error message
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  
}

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
       <Card  style={{ maxWidth: 550, width: '100%', 
         background: isCardHovered ? '#f8f9fa' : '#ffffff', // Change card background on hover
         transition: 'background-color 0.3s', // Smooth transition for the card background color
         transform: 'translateX(10%) translateY(-5%)',
       }}
       onMouseEnter={() => setIsCardHovered(true)} // Set hover state on mouse enter
       onMouseLeave={() => setIsCardHovered(false)} // Reset hover state on mouse leave
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
          transform: 'translateX(-10%) translateY(20%)',
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
            transform: 'translateX(54%) translateY(-100%)',
            fontSize: 30,
            fontFamily:'sans-serif'
          }}
        >
          Log In
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
            transform:"translateX(70%)",
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
                transform: 'translateX(150%)',
              }}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
      </Card>
      
    </div> 
  
  );
};

export default SignIn;