import { Component } from 'react';
import './Header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="app__header header">
                <div className="header__wrapper">
                    <div className="header__container">
                        <h1 className="header__title">
                            Happy New Year! Wishing you a year filled with happiness, health, and prosperity!
                        </h1>
                    </div>
                </div>
            </header>
        );
    }
}