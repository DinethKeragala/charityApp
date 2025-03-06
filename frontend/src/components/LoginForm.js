import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import image1 from './login1.jpg';

function LoginForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: formData.username, password: formData.password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Login successful!') {
                    localStorage.setItem('user_id', data.user_id);
                    navigate('/home');
                } else {
                    setError(data.error || 'Login failed. Please check your credentials.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('An error occurred. Please try again.');
            });
    };

    return (
        <div className="LoginPage">
            <div className="login-container">
                <div className="login-form">
                    <h2>Log In</h2>
                    <p>Welcome back! Please enter your details</p>

                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            <FaUser className="icon" />
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
