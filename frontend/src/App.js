import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Charities from './pages/Charities';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import DonationLeaderboard from './pages/DonationLeaderboard';
import Donate from './pages/Donate';

function Layout() {
  const location = useLocation();

  // ✅ Hide Navbar only on login and register pages
  const showNavbar = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/charities' element={<Charities />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about-us' element={<AboutUs />}/> 
        <Route path="/charities/:id" element={<DonationLeaderboard />} />
        <Route path="/donate/:id" element={<Donate />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
