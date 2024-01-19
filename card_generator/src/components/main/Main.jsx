import React from 'react';
import './Main.scss';
import Card from '../card/Card.jsx';

const Main = ({handleOpenModal, handleCongratulation, handleRandomCongratulation, handleDelete}) => {
    return (
        <main className="app__main main">
            <div className="main__wrapper">
                <div className="main__container">
                    <div className="main__buttons">
                        <button className="main__button main-button" onClick={handleRandomCongratulation}>Generate Congratulation</button>
                        <button className="main__button main-button" onClick={() => handleOpenModal('add')}>Create New Congratulation</button>
                    </div>

                    <div className="main__cards">
                        {handleCongratulation.map((item, index) => (
                            <Card
                                key={index}
                                title={item.title}
                                message={item.message}
                                image={item.image}
                                handleDelete={() => handleDelete(item.id)}
                                handleChange={() => handleOpenModal(item.id, 'change')}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;