import React, {useState} from "react";
import { Button, Checkbox, Form, Input, Card} from 'antd';
import './signUp.scss'


const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SignUp = () => {
    return(
        
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Adjust the height as needed
                transform:"translateX(-5%) translateY(15%)",
                
            }}
            >
                <Card
            style={{
                
                width:550,
                height:'100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Adjust the height as needed
                transform:"translateX(-5%) translateY(15%)",
                
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
            width: '100%', // Ensure the form takes the full width
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item 
            label="Full Name"
            name="Full Name"
            rules={[
                {
                required: true,
                message: 'Please input your full name!',
                },
            ]}
            >
            <Input />
            </Form.Item>

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
                    height:200,
                    position: 'relative',
                }}
                >
                <Button type="primary" htmlType="submit"
                style={{
                    margin: 0,
                    position:"absolute",
                    top:'1%',
                    transform:"translateX(200%)",
                    
                }}
                >
                    Submit
                </Button>
                </div>
            </Form.Item>
        </Form>
        </Card>
        </div>
        

        
      
    )
}

export default SignUp