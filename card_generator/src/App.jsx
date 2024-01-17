import { useState } from 'react';
import './scss/index.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import Modal from './components/modal/Modal';
import { congratulations } from './constants.js';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCongratulation, setNewCongratulation] = useState({
        title: '',
        description: '',
        image: '',
    });
    const [arrCongratulations, setArrCongratulations] = useState([]);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCongratulation({
            ...newCongratulation,
            [name]: value,
        });
    }

    const addNewCongratulation = () => {
        if(!newCongratulation.title || !newCongratulation.description || !newCongratulation.image) {
            alert("Fill in all the fields.");
            return;
        }
        setArrCongratulations([
            newCongratulation,
            ...arrCongratulations,
        ]);
        setIsModalOpen(false);
    }

    const addNewRandomCongratulation = () => {
        let remainingCongratulations = congratulations.filter(congratulation =>
            !arrCongratulations.some(existing => existing.title === congratulation.title)
        );

        if (remainingCongratulations.length === 0) {
            alert("All random congratulations have already been used.");
            return;
        }

        const newRandomCongratulation = remainingCongratulations[Math.floor(Math.random() * remainingCongratulations.length)];

        setArrCongratulations([
            newRandomCongratulation,
            ...arrCongratulations,
        ]);
    }

  return (
      <div className='app'>
        <Header />
        <Main handleOpenModal={handleOpenModal} arrCongratulations={arrCongratulations} handleRandomCongratulation={addNewRandomCongratulation}/>
        <Footer />
          {isModalOpen &&
              <Modal
                  handleCloseModal={handleCloseModal}
                  handleInputChange={handleInputChange}
                  handleAddNewCongratulation={addNewCongratulation}
              />
          }
      </div>
  );
}

export default App;
