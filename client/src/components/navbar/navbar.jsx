// Navbar.js

import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();
  
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
            <a href="#feat" className="link">
              <span>Home</span>
            </a>
            <a href="#price" className="link">
              <span>Pricing</span>
            </a>

            <Link to="/signin" className="link">
              <button className={active ? 'active' : ''}>Sign In</button>
            </Link>
            <Link to="/signup" className="link">
              <button className={active ? 'active' : ''}>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
