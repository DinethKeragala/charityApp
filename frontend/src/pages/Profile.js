import React from 'react';
import '../App.css';
import ProfilePage from '../components/ProfilePage';
import Footer from '../components/Footer';


function Profile() {
  return (
    <div className="profile-page-container">
      <ProfilePage />
      <Footer />
      
    </div>
  );
}

export default Profile;