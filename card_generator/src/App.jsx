import React from 'react';
import './scss/index.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import Modal from './components/modal/Modal';
import Preloader from './components/preloader/Preloader';
import { congratulations } from './api';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            allCongratulations: [],
            congratulationsToShow: [],
            newCongratulation: { title: '', message: '', image: '' },
            currentModalType: 'add',
            indexChangeModal: null,
            isLoader: false,
        };
    }

    async fetchCongratulations() {
        const { data } = await congratulations.get();
        this.setState({ allCongratulations: data });
    }

    componentDidMount() {
        this.setState({ isLoader: true });
        Promise.all([
            this.fetchCongratulations()
        ]).finally(() => {
            this.setState({ isLoader: false });
        });
    }

    handleOpenModal = (id, modalType = 'add') => {
        this.setState({
            isModalOpen: true,
            indexChangeModal: id,
            currentModalType: modalType !== this.state.currentModalType ? modalType : this.state.currentModalType
        });
    }

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newCongratulation: {
                ...prevState.newCongratulation,
                [name]: value,
            },
        }));
    }

    addNewCongratulation = async () => {
        const { newCongratulation, congratulationsToShow } = this.state;
        if (!newCongratulation.title || !newCongratulation.message || !newCongratulation.image) {
            alert("Fill in all the fields.");
            return;
        }

        this.setState({ isLoader: true });

        try {
            const { data } = await congratulations.post(newCongratulation);
            this.setState({
                congratulationsToShow: [newCongratulation, ...congratulationsToShow]
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoader: false });
            this.handleCloseModal();
        }
    }

    changeCurrentCongratulation = async (id) => {
        const { newCongratulation, congratulationsToShow } = this.state;
        if (!newCongratulation.title || !newCongratulation.message || !newCongratulation.image) {
            alert("Fill in all the fields.");
            return;
        }

        this.setState({ isLoader: true });

        try {
            await congratulations.put(id, newCongratulation);
            this.setState({
                congratulationsToShow: congratulationsToShow.map(congratulation =>
                    congratulation.id === id ? newCongratulation : congratulation
                )
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoader: false });
            this.handleCloseModal();
        }
    }

    addNewRandomCongratulation = () => {
        const { allCongratulations, congratulationsToShow } = this.state;
        let remainingCongratulations = allCongratulations.filter(congratulation =>
            !congratulationsToShow.some(existing => existing.title === congratulation.title)
        );

        if (remainingCongratulations.length === 0) {
            alert("All random congratulations have already been used.");
            return;
        }

        const newRandomCongratulation = remainingCongratulations[Math.floor(Math.random() * remainingCongratulations.length)];

        this.setState({
            congratulationsToShow: [newRandomCongratulation, ...congratulationsToShow],
        });
    }

    deleteCongratulation = async (id) => {
        this.setState({ isLoader: true });

        try {
            await congratulations.delete(id);
            this.setState(prevState => ({
                congratulationsToShow: prevState.congratulationsToShow.filter(congratulation => congratulation.id !== id)
            }));
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoader: false });
        }
    }

    render() {
        const { isModalOpen, congratulationsToShow, isLoader, currentModalType, indexChangeModal } = this.state;
        return (
            <div className='app'>
                <Header />
                <Main
                    handleOpenModal={this.handleOpenModal}
                    handleCongratulation={congratulationsToShow}
                    handleRandomCongratulation={this.addNewRandomCongratulation}
                    handleDelete={this.deleteCongratulation}
                />
                <Footer />
                {isModalOpen &&
                    <Modal
                        handleCloseModal={this.handleCloseModal}
                        handleInputChange={this.handleInputChange}
                        handleAddNewCongratulation={this.addNewCongratulation}
                        handleChangeCurrentCongratulation={() => this.changeCurrentCongratulation(indexChangeModal)}
                        currentModalType={currentModalType}
                    />
                }
                {isLoader && <Preloader />}
            </div>
        );
    }
}

export default App;
