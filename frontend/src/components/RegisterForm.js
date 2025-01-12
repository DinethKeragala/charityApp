import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();  // ✅ Hook for redirection

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            alert(response.data.message);
            
            // ✅ Redirect to the Home page after success
            navigate('/home');
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className='RegisterForm'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className='input-box'>
                        <input 
                            type='text' 
                            name='username'
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <FaUser className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input 
                            type='email' 
                            name='email'
                            placeholder='Email' 
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <FaEnvelope className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input 
                            type='password' 
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <FaLock className='icon'/>
                    </div>
                    <button type='submit'>Register</button>
                    <div className='login-link'>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
