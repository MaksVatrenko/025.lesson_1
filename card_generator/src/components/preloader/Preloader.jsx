import React from 'react';
import './Preloader.scss';

const Modal = () => (
    <div className="preloader">
        <div className="preloader__wrapper">
            <div></div><div></div><div></div><div></div>
        </div>
        <div className="preloader__blur"></div>
    </div>
);

export default Modal;