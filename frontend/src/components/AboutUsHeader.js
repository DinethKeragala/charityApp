import React from 'react';
import './AboutUsHeader.css'; 
import TeamLeader from './leader.jpeg';

function AboutUsHeader() {
  return (
    <div className="about-us-page">
      <header className="about-us-header">
        <div className="header-content">
          <h1>About Us</h1>
          
          {/* Added header image */}
          <div className="header-image-container">
            <img 
              src="https://img.industryweek.com/files/base/ebm/industryweek/image/2020/11/teamwork.5fac15b5571ee.png?auto=format,compress&fit=fill&fill=blur&w=1200&h=630" 
              alt="People working together to make a difference" 
              className="header-image"
            />
          </div>
          
          <p className="header-description">
            We are a team of passionate individuals dedicated to making a difference in the world. Our mission is to empower communities and create lasting change through innovation and collaboration.
          </p>
        </div>
      </header>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide communities with the tools, resources, and support they need to thrive. We believe in the power of collective action and are committed to creating a better future for everyone.
          </p>
        </div>
      </section>

      <section className="values-section">
        <div className="values-content">
          <h2>Our Core Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h3>Integrity</h3>
              <p>We operate with honesty and transparency in everything we do.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We embrace creativity and technology to solve complex problems.</p>
            </div>
            <div className="value-item">
              <h3>Community</h3>
              <p>We believe in the strength of collaboration and shared goals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-content">
          <h2>Meet Our Team</h2>
          <p>
            Our team is made up of talented and passionate individuals from diverse backgrounds. Together, we work tirelessly to achieve our mission and make a positive impact.
          </p>
          <div className="team-members">
            <div className="team-member">
              <img src={TeamLeader} alt="Team Member 1" />
              <h3>Dineth Keragala</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="https://yt3.googleusercontent.com/jw_VcwoCzP3tBaqlvy07KnDEyrvvFvWa2h-WMwrp5WAPkFNo9NRSuGiii24Q_o6p1lMBVir0fGY=s900-c-k-c0x00ffffff-no-rj" alt="Team Member 2" />
              <h3>Elton John</h3>
              <p>Head of Operations</p>
            </div>
            <div className="team-member">
              <img src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316500/316500.2.png" alt="Team Member 3" />
              <h3>Kumar Sanagakkara</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Join Us in Making a Difference</h2>
          <p>
            Ready to be part of something bigger? Whether you want to donate, volunteer, or collaborate, we'd love to have you on board.
          </p>
          <button className="cta-button">Get Involved</button>
        </div>
      </section>
    </div>
  );
}

export default AboutUsHeader;