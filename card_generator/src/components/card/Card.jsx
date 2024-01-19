import React from 'react';
import './Card.scss';

const Card = ({title, message, image, handleDelete, handleChange}) => (
    <div className="card">
        <div className="card__wrapper">
            <h2 className="card__title">{title}</h2>
            <p className="card__congratulation">{message}</p>
            <img className="card__image" src={image}></img>
            <button className="card__button main-button" onClick={handleDelete}>Delete</button>
            <button className="card__button main-button" onClick={handleChange}>Change</button>
        </div>
    </div>
);

export default Card;