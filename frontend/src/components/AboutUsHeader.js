// AboutUs.js
import React from 'react';
import './AboutUsHeader.css';
import aboutusimg from './aboutus.jpg'

function AboutUsHeader() {
  return (
    <div className="about-us-container">
      <h1>Know Everything... About Us</h1>
      <p className="about-us-description">
        HealTheWorld arms your community with the data and visibility it needs to create and convert high-quality donations into impactful results.
      </p>
      <div className="about-us-image">
        <img src={aboutusimg} alt="Our Team" />
      </div>
      <p className="about-us-team">
        We are a team of passionate individuals working to make a difference in the world, empowering communities and supporting meaningful causes.
      </p>
    </div>
  );
}

export default AboutUsHeader;
