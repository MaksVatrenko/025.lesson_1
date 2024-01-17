import React from 'react';
import './Card.scss';

const Card = ({title, description, image}) => (
    <div className="card">
        <div className="card__wrapper">
            <h2 className="card__title">{title}</h2>
            <p className="card__congratulation">{description}</p>
            <img className="card__image" src={image}></img>
        </div>
    </div>
);

export default Card;