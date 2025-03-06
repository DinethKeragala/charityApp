import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DonationForm.css';

function DonationForm() {
    const { id } = useParams(); // Get the charity ID from the URL
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const handleDonation = (e) => {
        e.preventDefault();
    
        
        const user_id = localStorage.getItem('user_id'); 
        console.log('User ID:', user_id);
    
        if (!user_id) {
            alert('You need to log in to make a donation.');
            navigate('/login');
            return;
        }
    
        fetch('http://localhost:5000/api/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: parseInt(user_id, 10), 
                charity_id: id,
                amount: parseFloat(amount), 
            }),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Donation successful!');
                    navigate(`/charities/${id}`); 
                } else {
                    alert('Error making donation. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error making donation. Please try again.');
            });
    };
    
    

    return (
        <div className="donation-form">
            <h1>Make a Donation</h1>
            <form onSubmit={handleDonation}>
                <div className="form-group">
                    <label htmlFor="amount">Donation Amount</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Donate Now</button>
            </form>
        </div>
    );
}

export default DonationForm;
