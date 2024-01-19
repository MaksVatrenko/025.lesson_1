import React from 'react';
import './Modal.scss';

const Modal = ({handleCloseModal, handleInputChange, handleAddNewCongratulation, handleChangeCurrentCongratulation, currentModalType}) => (
    <div className="modal">
        <div className="modal__wrapper">
            <button className="modal__close" onClick={handleCloseModal}></button>
            <h3 className="modal__title">Add new Congratulation</h3>
            <input type="text" className="modal__input" placeholder='title' name='title' onChange={handleInputChange}/>
            <input type="text" className="modal__input" placeholder='message' name='message' onChange={handleInputChange}/>
            <input type="text" className="modal__input" placeholder='image URL' name='image' onChange={handleInputChange}/>
            {
                currentModalType === 'add' &&
                <button className="modal__button main-button" onClick={handleAddNewCongratulation}>
                Add new congratulation
                </button>
            }
            {
                currentModalType === 'change' &&
                <button className="modal__button main-button" onClick={handleChangeCurrentCongratulation}>
                    Change congratulation
                </button>
            }
        </div>
        <div className="modal__blur" onClick={handleCloseModal}></div>
    </div>
);

export default Modal;