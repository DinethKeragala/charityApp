// src/components/VolunteerForm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VolunteerForm.css';

function VolunteerForm() {
    const { eventId } = useParams(); // Get event ID from URL
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''  // New address field
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

// src/components/VolunteerForm.js

const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('You have successfully volunteered!');
                navigate('/home');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
};

    return (
        <div className="volunteer-form">
            <h1>Volunteer for Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Volunteer Now</button>
            </form>
        </div>
    );
}

export default VolunteerForm;
