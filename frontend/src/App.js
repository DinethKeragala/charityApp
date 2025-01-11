import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Charities from './pages/Charities';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

function Layout() {
  const location = useLocation();
  
  // Exclude Navbar only on the SignUp page
  const showNavbar = location.pathname !== "/sign-up";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/charities' element={<Charities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/sign-up' element={<SignUp />} />
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