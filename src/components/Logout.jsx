import React, { Component } from 'react';

class Logout extends Component {
    render() {
        return (
            <section>
                <div>
                    <h1 className="centered">You are logged out</h1>
                    <h2 className="centered">Please login to edit movies</h2>
                </div>
            </section>
        );
    }
}

export default Logout;