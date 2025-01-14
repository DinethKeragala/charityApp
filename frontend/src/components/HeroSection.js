import React from 'react';
import { Button } from './Button';
import './HeroSection.css';
import '../App.css';
import heroVideo from './hero.mp4';

function HeroSection() {
  return (
    <div className="hero-container">
      <video src={heroVideo} autoPlay loop muted aria-label="Hero Background Video">
        Your browser does not support the video tag. Please update your browser.
      </video>
      <h1>Make a Difference Today</h1>
      <p>Support the causes you care about and empower communities worldwide.</p>
      <div className="hero-btns">
        <Button 
        className="btn1" 
        buttonStyle="btn--outline" 
        buttonSize="btn--large" 
        linkTo="/donate"
        >
          Donate Now
        </Button>
        <Button 
        className="btn2" 
        buttonStyle="btn--outline" 
        buttonSize="btn--large"
        linkTo="/about-us" 
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
