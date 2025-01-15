import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carditem from './Carditem';
import './CharitySelection.css';

function CharitySelection() {
    const [charities, setCharities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch charities from the backend
        fetch('http://localhost:5000/api/charities')
            .then(response => response.json())
            .then(data => setCharities(data))
            .catch(error => console.error('Error fetching charities:', error));
    }, []);

    const handleCardClick = (id) => {
        navigate(`/charities/${id}`); // Redirect to Charity Details page
    };

    return (
        <div className="charity-selection">
            <h1>Select a Charity</h1>
            <div className="charity-cards">
                {charities.map((charity) => (
                    <Carditem
                        key={charity.id}
                        src={charity.image}
                        text={charity.description}
                        label={charity.name}
                        path={`/charities/${charity.id}`} // Add proper path
                        onClick={() => handleCardClick(charity.id)} // Navigate on click
                    />
                ))}
            </div>
        </div>
    );
}

export default CharitySelection;
