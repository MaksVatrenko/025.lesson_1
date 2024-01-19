import { useCallback, useEffect, useState } from 'react';
import './scss/index.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import Modal from './components/modal/Modal';
import Preloader from './components/preloader/Preloader';
import {congratulations} from './api';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allCongratulations, setAllCongratulations] = useState([]);
    const [congratulationsToShow, setCongratulationsToShow] = useState([]);
    const [newCongratulation, setNewCongratulation] = useState({
        title: '',
        message: '',
        image: '',
    });
    const [currentModalType, setCurrentModalType] = useState('add');
    const [indexChangeModal, setIndexChangeModal] = useState(null); // [id, modalType
    const [isLoader, setIsLoader] = useState(false);

    const fetchCongratulations = useCallback(async () => {
        const { data } = await congratulations.get();
        setAllCongratulations(data);
    }, []);

    useEffect(() => {
        setIsLoader(true);
        Promise.all([
            fetchCongratulations()
        ]).finally(() => {
            setIsLoader(false);
        })
    }, []);

    const handleOpenModal = (id, modalType = 'add') => {
        setIsModalOpen(true);
        setIndexChangeModal(id);
        if(modalType !== currentModalType) setCurrentModalType(modalType);
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

    const addNewCongratulation = async () => {
        if(!newCongratulation.title || !newCongratulation.message || !newCongratulation.image) {
            alert("Fill in all the fields.");
            return;
        }

        setIsLoader(true)

        try {
            const { data } = await congratulations.post(newCongratulation);
            setCongratulationsToShow([
                newCongratulation,
                ...congratulationsToShow,
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoader(false)
            handleCloseModal();
        }
    }

    const changeCurrentCongratulation = async (id) => {
        if(!newCongratulation.title || !newCongratulation.message || !newCongratulation.image) {
            alert("Fill in all the fields.");
            return;
        }

        setIsLoader(true)

        try {
            await congratulations.put(id, newCongratulation);
            setCongratulationsToShow(congratulationsToShow.map(congratulation => congratulation.id === id ? newCongratulation : congratulation));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoader(false)
            handleCloseModal();
        }
    }

    const addNewRandomCongratulation = () => {
        let remainingCongratulations = allCongratulations.filter(congratulation =>
            !congratulationsToShow.some(existing => existing.title === congratulation.title)
        );


        if(remainingCongratulations.length === 0) {
            alert("All random congratulations have already been used.");
            return;
        }

        const newRandomCongratulation = remainingCongratulations[Math.floor(Math.random() * remainingCongratulations.length)];

        setCongratulationsToShow([
            newRandomCongratulation,
            ...congratulationsToShow,
        ]);
    }

    const deleteCongratulation = async (id) => {
        try {
            setIsLoader(true)
            await congratulations.delete(id);
            setCongratulationsToShow(congratulationsToShow.filter(congratulation => congratulation.id !== id));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoader(false)
        }
    }

  return (
      <div className='app'>
        <Header />
        <Main
            handleOpenModal={handleOpenModal}
            handleCongratulation={congratulationsToShow}
            handleRandomCongratulation={addNewRandomCongratulation}
            handleDelete={deleteCongratulation}
        />
        <Footer />
          {isModalOpen &&
              <Modal
                  handleCloseModal={handleCloseModal}
                  handleInputChange={handleInputChange}
                  handleAddNewCongratulation={addNewCongratulation}
                  handleChangeCurrentCongratulation={() => changeCurrentCongratulation(indexChangeModal)}
                  currentModalType={currentModalType}
              />
          }
          {isLoader &&  <Preloader />}
      </div>
  );
}

export default App;
