import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ padding: '20px' }}>
      <Card title={`Bienvenue, ${currentUser.username}`}>
        <Button type="primary" style={{ marginRight: '10px' }}>
          <Link to="/rapport">Rapport</Link>
        </Button>
        <Button type="primary">
          <Link to="/abonnement">Abonnement</Link>
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
