import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './components/Routes';
import Nav from './components/Nav';
import Footer from './components/Footer';

class PageContent extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Nav />
                    <Routes />
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default PageContent;