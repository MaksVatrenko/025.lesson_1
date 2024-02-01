import { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="app__footer footer">
                <div className="footer__wrapper">
                    <div className="footer__container">
                    </div>
                </div>
            </footer>
        );
    }
}