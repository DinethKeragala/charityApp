// src/components/EventList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carditem from './Carditem';  // Import Carditem
import './EventList.css';

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Fetch events from backend
        fetch('http://localhost:5000/api/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleCardClick = (id) => {
        navigate(`/volunteer/${id}`); // Navigate to the volunteer form with event ID
    };

    return (
        <div className="event-list">
            <h1>Upcoming Charity Events</h1>
            <div className="event-cards">
                {events.map(event => (
                    <Carditem
                        key={event.id}
                        src={event.image}  // Assuming events have an image field
                        text={event.description}
                        label={event.name}
                        path={`/volunteer/${event.id}`}  // Link to the volunteer form
                        onClick={() => handleCardClick(event.id)}  // Handle the card click
                    />
                ))}
            </div>
        </div>
    );
}

export default EventList;
