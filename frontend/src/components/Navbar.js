// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    setButton(window.innerWidth > 960);
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    
    // If you're using any other auth tokens, clear those too
    localStorage.removeItem('auth_token');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
            HealTheWorld
          </Link>

          <div className='menu-icon' onClick={handleClick} aria-label='Toggle navigation'>
            {click ? <FaTimes /> : <FaBars />}
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/charities' className='nav-links' onClick={closeMobileMenu}>
                Charities
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/volunteer' className='nav-links' onClick={closeMobileMenu}>
                Volunteer
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>

            <li className='nav-item'>
              <div className='nav-links-mobile' onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}>
                LOGOUT
              </div>
            </li>
          </ul>

          {button && (
            <div className="logout-button-container">
              <Button 
                buttonStyle='btn--outline' 
                onClick={handleLogout}
                className="logout-button"
              >
                LOGOUT
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;