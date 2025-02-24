import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          {/* Logo */}
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            HealTheWorld
          </Link>

          {/* Menu Icon for Mobile */}
          <div className='menu-icon' onClick={handleClick} aria-label='Toggle navigation'>
            {click ? <FaTimes /> : <FaBars />}
          </div>

          {/* Navigation Links */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/articles' className='nav-links' onClick={closeMobileMenu}>
                Articles
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
            {/* Mobile Login Link */}
            <li className='nav-item'>
              <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          </ul>

          {/* Desktop Login Button */}
          {button && (
            <Link to='/login'>
              <Button buttonStyle='btn--outline'>LOGIN</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
