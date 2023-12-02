//import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const Admin = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ padding: '20px',
    display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Set the height of the container to full viewport height
    }}>
      <Card title={`Welcome, ${currentUser.username}`}
      style={{ 
        width: '50%', // Adjust the width as needed
        textAlign: 'center', // Center the content inside the card
      }}
      >
        <Button type="primary" style={{ marginRight: '10px' }}>
          <Link to="/RapportAdmin">Report </Link>
        </Button>
        <Button type="primary">
          <Link to="/addbadge">Add subscription</Link>
        </Button>
      </Card>
    </div>
  );
};


export default Admin;