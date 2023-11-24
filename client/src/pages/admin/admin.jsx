<<<<<<< HEAD
import React from 'react';
=======
//import React from 'react';
>>>>>>> fe4db40b8a12aa075910be8b0f3a9a77710e873c
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const Admin = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div style={{ padding: '20px' }}>
      <Card title={`Bienvenue, ${currentUser.username}`}>
        <Button type="primary" style={{ marginRight: '10px' }}>
          <Link to="/rapport">Rapport</Link>
        </Button>
        <Button type="primary">
          <Link to="/addbadge">AddBadge</Link>
        </Button>
      </Card>
    </div>
  );
};


export default Admin;