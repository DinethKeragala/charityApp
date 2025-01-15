// Carditem.js
import React from 'react';

const Carditem = (props) => {
    return (
        <li className='cards__item'>
            <div className='cards__item__link' onClick={props.onClick}>
                <figure className='cards__item__pic-wrap' data-category={props.label}>
                    <img src={props.src} alt={props.text} className='cards__item__img' />
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{props.text}</h5>
                </div>
            </div>
        </li>
    );
};

export default Carditem;
