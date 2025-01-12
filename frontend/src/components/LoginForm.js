import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();  // ✅ Hook for redirection

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            alert(response.data.message);
            
            // ✅ Redirect to Home Page if login is successful
            if (response.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='LoginForm'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
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
                            type='password' 
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <FaLock className='icon'/>
                    </div>
                    <button type='submit'>Login</button>
                    <div className='register-link'>
                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
