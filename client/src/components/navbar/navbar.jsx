// Navbar.js

import  { useEffect, useState } from 'react';
import './Navbar.scss';
import { useLocation } from 'react-router-dom'; // Import useHistory
import { Link } from 'react-router-dom';
import { DownOutlined} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
//import newRequest from "../../utils/newRequest";



const Navbar = () => {

  //const navigate = useNavigate(); 
  const { pathname } = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  
  
  const [active, setActive] = useState(false);
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

  const navigate=useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', { method: 'POST',  headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',  // Ajoutez cette ligne
      } });   
     // const data = await response.json(); // Move this line here
      //console.log(data);
      
      // Switching from localStorage to sessionStorage
      localStorage.setItem("currentUser",null);

      // Reset active state to false when logging out
      setActive(false);
      
      console.log(`${currentUser.username} is logged out`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  

  const items = [
    {
      key: '1',
      label: (
        <Link to="/rapport" className="link">
          <span>Rapport</span>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/abonnement">
          <span>Abonnement</span>
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/" onClick={handleLogout} className="link">
          <span>Déconnexion</span>
        </Link>
      ),
    }
  ];

  return (
    <div className={active ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <div className="text">
            <Link to="/" className="link">
              <span>Parking</span>
            </Link>
          </div>
        </div>
        <div className={pathname !== '/' ? 'join' : ''}>
          <div className="links">
           <Link to="/" className="link">
                <span>Home</span>
           </Link >
            {!currentUser ? (
              <>
            <Link to="/signin" className="link">
              <button className={active ? 'active' : ''}>Sign In</button>
            </Link>
            <Link to="/signup" className="link">
              <button className={active ? 'active' : ''}>Sign Up</button>
            </Link>
            </>
            ) : (
              <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {currentUser.username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
