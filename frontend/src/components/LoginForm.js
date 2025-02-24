import React, { useState } from 'react';
import './LoginForm.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import image1 from './login1.jpg';

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Login successful!') {
                    localStorage.setItem('user_id', data.user_id);
                    alert('Login successful!');
                    navigate('/home');
                } else {
                    alert(data.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div className="LoginPage">
            <div className="login-container">
                <div className="login-form">
                    <h2>Log In</h2>
                    <p>Welcome back! Please enter your details</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <FaEnvelope className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <FaLock className="icon" />
                        </div>
                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>
                        <button type="submit">Log in</button>
                        <div className="register-link">
                            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                        </div>
                    </form>
                </div>
                <div className="login-image">
                    <img src={image1} alt="Login Visual" />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
