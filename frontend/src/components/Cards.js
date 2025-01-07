import React from 'react'
import Carditem from './Carditem'
import './Cards.css'
import charityImage1 from './charity 1.jpg';
import charityImage2 from './charity 2.jpeg';
import charityImage3 from './charity 3.jpg';
import orgImage1 from './org1.png';
import orgImage2 from './org2.png';
import orgImage3 from './org3.png';

function Cards() {
  return (
    <div className='cards'>
        <h1>Top Stories</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <Carditem 
                    src={charityImage1}
                    text="Local Charity Raises $50,000 for Flood Relief Efforts"
                    label="News"
                    path="/articles"
                    />
                    <Carditem 
                    src={charityImage2}
                    text="Charity Launches New Grant Program to Support Groundbreaking Cancer Research"
                    label="News"
                    path="/articles"
                    />
                    <Carditem 
                    src={charityImage3}
                    text="Why Giving Back Matters: The Lifelong Impact of Charity"
                    label="Education"
                    path="/articles"
                    />
                </ul>

            </div>

        </div>

        <h1>Organizations We Work With</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <Carditem 
                    src={orgImage1}
                    text="Save the Children"
                    path="/articles"
                    />
                    <Carditem 
                    src={orgImage2}
                    text="Charity Launches New Grant Program to Support Groundbreaking Cancer Research"
                    path="/articles"
                    />
                    <Carditem 
                    src={orgImage3}
                    text="Why Giving Back Matters: The Lifelong Impact of Charity"
                    path="/articles"
                    />
                </ul>

            </div>

        </div>

    </div>
    
  )
}

export default Cards