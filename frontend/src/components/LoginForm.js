import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();  // ✅ Hook for redirection

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: formData.username, password: formData.password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Login successful!') {
                    localStorage.setItem('user_id', data.user_id); // Save `user_id` to localStorage
                    alert('Login successful!');
                    navigate('/charity-selection');
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
