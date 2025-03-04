// src/components/Carditem.js
import React from 'react';
import { Link } from 'react-router-dom';


const Carditem = ({ src, text, label, path, onClick }) => {
    return (
        <li className='cards__item' onClick={onClick}>
            <div className='cards__item__link'>
                <figure className='cards__item__pic-wrap' data-category={label}>
                    <img src={src} alt={text} className='cards__item__img' />
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{text}</h5>
                    <Link to={path} className='btn--outline'>
                        Sign Up Now
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default Carditem;
