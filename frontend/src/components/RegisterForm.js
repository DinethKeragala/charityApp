import React, { useState } from 'react';
import './RegistrationForm.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import image2 from './login1.jpg'; 

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            alert(data.message);
            navigate('/login');
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="RegisterPage">
            <div className="register-container">
                <div className="register-form">
                    <h2>Create Account</h2>
                    <p>Join us today! Please fill in your details</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input 
                                type="text" 
                                name="fullName" 
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                            <FaUser className="icon" />
                        </div>
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
                        <button type="submit">Sign Up</button>
                        <div className="login-link">
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                    </form>
                </div>
                <div className="register-image">
                    <img src={image2} alt="Register Visual" />
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
