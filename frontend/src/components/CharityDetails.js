import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CharityDetails.css';

function CharityDetails() {
    const { id } = useParams(); 
    const [leaderboard, setLeaderboard] = useState([]);
    const [charity, setCharity] = useState({});
    const [currentUserData, setCurrentUserData] = useState(null);
    const [isTopDonator, setIsTopDonator] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {      
        const userId = localStorage.getItem('user_id');
        
        if (userId) { 
            fetch(`http://localhost:5000/api/user/${userId}`)
                .then(response => response.json())
                .then(userData => {
                    console.log("Current user data:", userData);
                    setCurrentUserData(userData);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }

        
        fetch(`http://localhost:5000/api/charities/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Charity data:", data);
                setCharity(data.charity);
                setLeaderboard(data.leaderboard);
            })
            .catch(error => console.error('Error fetching charity data:', error));
    }, [id]);

    
    useEffect(() => {
        if (currentUserData && leaderboard.length > 0) {
            const topDonator = leaderboard[0];
            console.log("Comparing:", currentUserData.username, "with top donator:", topDonator.username);
            
            if (currentUserData.username === topDonator.username) {
                console.log("Current user is top donator!");
                setIsTopDonator(true);
            } else {
                setIsTopDonator(false);
            }
        }
    }, [currentUserData, leaderboard]);
    
    return (
        <div className="charity-details">
            <h1>{charity.name}</h1>
            <p>{charity.description}</p>

            {isTopDonator && (
                <div className="top-donator-banner">
                    <span>🏆 Congratulations! You're the Top Donator! 🏆</span>
                </div>
            )}

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
                        <tr 
                            key={index} 
                            className={
                                currentUserData && entry.username === currentUserData.username 
                                    ? `user-row ${index === 0 ? 'top-donator' : ''}` 
                                    : ''
                            }
                        >
                            <td>{index + 1}</td>
                            <td>{entry.username}</td>
                            <td>${Number(entry.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="donate-button"
                onClick={() => navigate(`/donate/${id}`)}
            >
                Make a New Donation
            </button>
        </div>
    );
}

export default CharityDetails;