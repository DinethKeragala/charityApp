import React from 'react'
import Carditem from './Carditem'
import './Cards.css'
import charityImage from './charity 1.jpg';

function Cards() {
  return (
    <div className='cards'>
        <h1>Top Stories</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <Carditem 
                    src={charityImage}
                    text="Local Charity Raises $50,000 for Flood Relief Efforts"
                    label="News"
                    path="/articles"
                    />
                </ul>

            </div>

        </div>

    </div>
  )
}

export default Cards