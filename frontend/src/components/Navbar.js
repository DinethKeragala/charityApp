import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';


function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo'>
                HealTheWorld
                </Link>
            </div>
            <div className='menu-icon' onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/charities' className='nav-links' onClick={closeMobileMenu}>
                Charities
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                Profile
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
                </Link>
              </li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar