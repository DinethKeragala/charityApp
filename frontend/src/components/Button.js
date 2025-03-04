// src/components/Button.js
import React from "react";
import './Button.css';
import { Link } from "react-router-dom";

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children, type, onClick, buttonStyle, buttonSize, linkTo // Add linkTo prop
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    // Only render Link if linkTo is provided
    const buttonContent = linkTo ? (
        <Link to={linkTo} className='btn-mobile'>
            <button 
                className={`btn ${checkButtonStyle} ${checkButtonSize}`} 
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    ) : (
        <button 
            className={`btn ${checkButtonStyle} ${checkButtonSize}`} 
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );

    return buttonContent;
};
