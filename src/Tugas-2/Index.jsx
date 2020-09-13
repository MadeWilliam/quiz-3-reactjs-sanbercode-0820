import React, { Component } from 'react';
import axios from 'axios';

import '../Style.css';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
        }
    }

    componentDidMount() {
        if (this.state.movies === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    console.log(res);
                    this.setState({ movies: res.data })
                    console.log(this.state.movies);
                })
        };
    }

    render() {
        const { movies } = this.state;

        return (
            <div>
                <section >
                    <h1>Daftar Film Terbaik</h1>
                    <div id="movie-list">
                        {
                            movies !== null && movies.map((movie, index) => {
                                return (
                                    <div key={index} className="movie-outer">
                                        <h2>{movie.title}</h2>
                                        <div className="movie-img-container">
                                            <img className="movie-img" src={movie.image_url} alt="" />
                                            <div className="movie-attribute">
                                                <h2>Rating: {movie.rating}</h2>
                                                <h2>Durasi: {(movie.duration % 60) < 10 ? `${Math.floor(movie.duration / 60)} Jam ${movie.duration % 60} Menit` : `${Math.floor(movie.duration / 60)} Jam ${movie.duration % 60} Menit`}</h2>
                                                
                                                <h2>Genre: {movie.genre}</h2>
                                            </div>
                                        </div>
                                        <div className="movie-desc">
                                            <p><b>deskripsi: </b>{movie.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div >
        );
    }
}

export default Index;
