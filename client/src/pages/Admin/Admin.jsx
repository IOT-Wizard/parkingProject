import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const Admin = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ padding: '20px' }}>
      <Card title={`Bienvenue, ${currentUser.username}`}>
        <Button type="primary" style={{ marginRight: '10px' }}>
          <Link to="/">Rapport</Link>
        </Button>
        <Button type="primary">
          <Link to="/addbadge">AddBadge</Link>
        </Button>
      </Card>
    </div>
  );
};


export default Admin;