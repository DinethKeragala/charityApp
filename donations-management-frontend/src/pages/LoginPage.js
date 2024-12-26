import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/users/login', { email, password })
            .then((response) => {
                alert('Login Successful!');
                localStorage.setItem('userToken', response.data.token); // Save token for authentication
                navigate('/'); // Redirect to home page
            })
            .catch((error) => {
                console.error(error);
                alert('Login Failed. Please check your credentials.');
            });
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Login</h2>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
