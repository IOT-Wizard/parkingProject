//import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Set the height of the container to full viewport height
      }}>
      <Card 
        title={`Welcome, ${currentUser.username}`}
        style={{ 
          width: '50%', // Adjust the width as needed
          textAlign: 'center', // Center the content inside the card
        }}
        >
        <Button type="primary" style={{ marginRight: '10px' }}>
          <Link to="/rapport">Report</Link>
        </Button>
        <Button type="primary">
          <Link to="/abonnement"> add subscription</Link>
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
