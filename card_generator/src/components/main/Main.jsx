import React from 'react';
import './Main.scss';
import Card from '../card/Card.jsx';

const Main = ({handleOpenModal, arrCongratulations, handleRandomCongratulation}) => {
    // const [congratulations, setCongratulations] = React.useState([]);
    //
    // React.useEffect(() => {}, [congratulations]);
    return (
        <main className="app__main main">
            <div className="main__wrapper">
                <div className="main__container">
                    <div className="main__buttons">
                        <button className="main__button main-button" onClick={handleRandomCongratulation}>Generate Congratulation</button>
                        <button className="main__button main-button" onClick={handleOpenModal}>Create New Congratulation</button>
                    </div>

                    <div className="main__cards">
                        {arrCongratulations.map((item, index) => (
                            <Card
                                key={index}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;