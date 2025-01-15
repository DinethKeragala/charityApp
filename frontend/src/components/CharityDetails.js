import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CharityDetails.css';

function CharityDetails() {
    const { id } = useParams(); // Get the charity ID from the URL
    const [leaderboard, setLeaderboard] = useState([]);
    const [charity, setCharity] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/charities/${id}`)
            .then(response => response.json())
            .then(data => {
                setCharity(data.charity);
                setLeaderboard(data.leaderboard); // Ensure leaderboard data is set
            })
            .catch(error => console.error('Error:', error));
    }, [id]);
    
    return (
        <div className="charity-details">
            <h1>{charity.name}</h1>
            <p>{charity.description}</p>

            <h2>Donation Leaderboard</h2>
            <table className="leaderboard">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.username}</td>
                            <td>${Number(entry.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="donate-button"
                onClick={() => navigate(`/donate/${id}`)} // Navigate to the donation form
            >
                Make a New Donation
            </button>

        </div>
    );
}

export default CharityDetails;
