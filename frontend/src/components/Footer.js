import React from 'react';
import { Button } from './Button';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer-container'>
        <section className='footer-subscription'>
            <p className='footer-subscription-heading'>
                Join the newsletter to receive news about any upcoming events
            </p>
            <p className='footer-subscription-text'>
                You can unsubscribe at any time.
            </p>
            <div className='input-areas'>
                <form>
                    <input 
                    type='email' 
                    name='email'
                    placeholder='Your Email'
                    className='footer-input'
                    />
                    <Button buttonStyle='btn--outline'>Subscribe</Button>
                </form>
            </div>
         </section>
         <div className='footer-links'>
            <div className='footer-link-wrapper'>
                <div className='footer-link-items'>
                    <h2>Donors</h2>
                    <Link to='/sign-up'>Ways to give</Link>
                    <Link to='/'>Philanthropic Gifts</Link>
                    <Link to='/'>Donate in honor</Link>
                    <Link to='/'>Start a Fundraiser</Link>
                </div>
                <div className='footer-link-items'>
                    <h2>Nonprofits</h2>
                    <Link to='/sign-up'>Start an application</Link>
                    <Link to='/'>Why join?</Link>
                    <Link to='/'>Handbook</Link>
                    <Link to='/'>Pricing and fees</Link>
                </div>
                <div className='footer-link-items'>
                    <h2>Companies</h2>
                    <Link to='/sign-up'>Our services</Link>
                    <Link to='/'>Our partners</Link>
                    <Link to='/'>Corporate gift cards</Link>
                    <Link to='/'>HealTheWorld atlas</Link>
                </div>
                <div className='footer-link-items'>
                    <h2>About Us</h2>
                    <Link to='/sign-up'>Our team</Link>
                    <Link to='/'>Jobs</Link>
                    <Link to='/'>FAQs</Link>
                    <Link to='/'>Contact us</Link>
                </div>
                <div className='footer-link-items'>
                    <h2>Learn Library</h2>
                    <Link to='/sign-up'>Non profit resources</Link>
                    <Link to='/'>Corporate giving resources</Link>
                    <Link to='/'>Donor resources</Link>
                    <Link to='/'>Success stories</Link>
                </div>
            </div>
         </div>
         <section className='social-media'>
            <div className='social-media-wrap'> 
                <div className='footer-logo'>
                    <Link to ='/' className='social-logo'>
                    HealTheWorld
                    </Link>
                </div>
                <small className='website-rights'>HealTheWorld © 2025</small>
                <div className='social-icons'>
                    <Link 
                    className='social-icon-link'
                    to='/'
                    target='_blank'
                    aria-label='Facebook'>
                        <FaFacebookF />
                    </Link>
                    <Link 
                    className='social-icon-link'
                    to='/'
                    target='_blank'
                    aria-label='Instagram'>
                        <FaInstagram />
                    </Link>
                    <Link 
                    className='social-icon-link'
                    to='/'
                    target='_blank'
                    aria-label='Youtube'>
                        <FaYoutube />
                    </Link>
                    <Link 
                    className='social-icon-link'
                    to='/'
                    target='_blank'
                    aria-label='Twitter'>
                        <FaTwitter />
                    </Link>
                    <Link 
                    className='social-icon-link'
                    to='/'
                    target='_blank'
                    aria-label='LinkedIn'>
                        <FaLinkedin />
                    </Link>
                </div>
            </div>
         </section>
    </div>
  )
}

export default Footer;
