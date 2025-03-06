import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carditem from './Carditem';  
import './EventList.css';

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch('http://localhost:5000/api/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleCardClick = (id) => {
        navigate(`/volunteer/${id}`); 
    };

    return (
        <div className="event-list">
            <h1>Upcoming Charity Events</h1>
            <div className="event-cards">
                {events.map(event => (
                    <Carditem
                        key={event.id}
                        src={event.image}  
                        text={event.description}
                        label={event.name}
                        path={`/volunteer/${event.id}`}  
                        onClick={() => handleCardClick(event.id)}  
                    />
                ))}
            </div>
        </div>
    );
}

export default EventList;
