import React, { useContext, useState, useEffect, useRef } from 'react';
import { LoginContext } from "../contexts/LoginContext";
import Logout from './Logout';
import axios from 'axios';

export const Editor = () => {
    const firstRender = useRef(true)
    const [yearError, setYearError] = useState(null)
    const [ratingError, setRatingError] = useState(null)
    const [disable, setDisabled] = useState(true)
    const { isLogin } = useContext(LoginContext)
    const [daftarMovies, setDaftarMovies] = useState(null)
    const [input, setInput] = useState({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        imgUrl: "",
        id: null
    })

    useEffect(() => {
        const formValidation = () => {
            if (input.year < 1980) {
                setYearError('Year cant be under 1980!')
                return true
            } else if (input.rating < 0 || input.rating > 0) {
                setRatingError('Rating must be between 0 - 10!')
                return true
            } else if (input.year >= 1980){
                setYearError(null)
                return false
            } else {
                setRatingError(null)
                return false
            }
        }

        console.log(disable);


        if (daftarMovies === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    setDaftarMovies(res.data.map(el => {
                        if (firstRender.current) {
                            firstRender.current = false
                            return "";
                        }
                        return {
                            id: el.id,
                            title: el.title,
                            description: el.description,
                            year: el.year,
                            duration: el.duration,
                            genre: el.genre,
                            rating: el.rating,
                            imgUrl: el.imgUrl
                        }
                    }))
                })
        }

        setDisabled(formValidation())

    }, [daftarMovies, disable, input.year, input.rating])

    const handleDelete = (event) => {
        let idDataMovies = parseInt(event.target.value)

        let newDaftarMovies = daftarMovies.filter(el => el.id !== idDataMovies)

        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idDataMovies}`)
            .then(res => {
                console.log(res)
            })

        setDaftarMovies([...newDaftarMovies])

    }

    const handleEdit = (event) => {
        let idDataMovies = parseInt(event.target.value)
        let dataMovies = daftarMovies.find(x => x.id === idDataMovies)
        setInput({
            id: dataMovies.id,
            title: dataMovies.title,
            description: dataMovies.description,
            year: dataMovies.year,
            duration: dataMovies.duration,
            genre: dataMovies.genre,
            rating: dataMovies.rating,
            imgUrl: dataMovies.imgUrl
        })
    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name

        switch (typeOfInput) {
            case "title":
                {
                    setInput({ ...input, title: event.target.value });
                    break
                }
            case "description":
                {
                    setInput({ ...input, description: event.target.value });
                    break
                }
            case "year":
                {
                    setInput({ ...input, year: event.target.value });
                    break
                }
            case "rating":
                {
                    setInput({ ...input, rating: event.target.value });
                    break
                }
            case "imgUrl":
                {
                    setInput({ ...input, imgUrl: event.target.value });
                    break
                }
            case "duration":
                {
                    setInput({ ...input, duration: event.target.value });
                    break
                }
            case "genre":
                {
                    setInput({ ...input, genre: event.target.value });
                    break
                }
            default:
                { break; }
        }
    }

    const handleSubmit = (event) => {
        // menahan submit
        event.preventDefault()

        if (input.id === null) {
            axios.post(`http://backendexample.sanbercloud.com/api/movies`, {
                id: input.id,
                title: input.title,
                description: input.description,
                year: input.year,
                duration: input.duration,
                genre: input.genre,
                rating: input.rating,
                imgUrl: input.imgUrl
            })
                .then(res => {
                    setDaftarMovies([
                        ...daftarMovies,
                        {
                            id: res.data.id,
                            title: res.data.title,
                            description: res.data.description,
                            year: res.data.year,
                            duration: res.data.duration,
                            genre: res.data.genre,
                            rating: res.data.rating,
                            imgUrl: res.data.imgUrl
                        }])
                })
        } else {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`, {
                id: input.id,
                title: input.title,
                description: input.description,
                year: input.year,
                duration: input.duration,
                genre: input.genre,
                rating: input.rating,
                imgUrl: input.imgUrl
            })
                .then(() => {
                    let dataMovies = daftarMovies.find(movie => movie.id === input.id)
                    dataMovies.id = input.id
                    dataMovies.title = input.title
                    dataMovies.description = input.description
                    dataMovies.year = input.year
                    dataMovies.duration = input.duration
                    dataMovies.genre = input.genre
                    dataMovies.rating = input.rating
                    dataMovies.imgUrl = input.imgUrl
                    setDaftarMovies([...daftarMovies])
                })
        }

        // reset input form to default
        setInput({
            title: "",
            description: "",
            year: 2020,
            duration: 120,
            genre: "",
            rating: 0,
            imgUrl: "",
            id: null
        })

    }
    return (
        <section>
            { isLogin &&
                <div style={{ width: "800px" }}>
                    {/* TABEL */}
                    <h1 className="centered">Daftar Movies</h1>

                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "20px" }}>No</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Year</th>
                                <th>Duration</th>
                                <th>Genre</th>
                                <th>Rating</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                daftarMovies !== null && daftarMovies.map((movie, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{movie.title}</td>
                                            <td>{movie.description}</td>
                                            <td>{movie.year}</td>
                                            <td>{movie.duration}</td>
                                            <td>{movie.genre}</td>
                                            <td>{movie.rating}</td>
                                            <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                                                <button className="btn-edit" onClick={handleEdit} value={movie.id}>Edit</button>
                                                <button className="btn-delete" onClick={handleDelete} value={movie.id}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    {/* FORM */}
                    <h1>Form Daftar Harga Movie</h1>

                    <div style={{ width: "50%", margin: "0 auto", display: "block" }}>
                        <div className="group" style={{ border: "1px solid #aaa", padding: "20px" }}>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="title" style={{ float: "left" }}> Title: </label>
                                <input style={{ float: "right" }} type="text" required id="title" name="title" value={input.title} onChange={handleChange} />
                                <br />
                                <br />
                                <label htmlFor="description" style={{ float: "left" }}> Description: </label>
                                <textarea style={{ float: "right" }} type="text" required id="description" name="description" value={input.description} onChange={handleChange} />
                                <br />
                                <br />
                                <label htmlFor="year" style={{ float: "left" }}> Year: </label>
                                <input style={{ float: "right" }} type="number" required id="year" name="year" value={input.year} onChange={handleChange} />
                                <br />
                                <br />
                                <label htmlFor="duration" style={{ float: "left" }}> Duration: </label>
                                <input style={{ float: "right" }} type="number" required id="duration" name="duration" value={input.duration} onChange={handleChange} />
                                <br />
                                <br />
                                <label htmlFor="genre" style={{ float: "left" }}> Genre: </label>
                                <input style={{ float: "right" }} type="text" required id="genre" name="genre" value={input.genre} onChange={handleChange} />
                                <br />
                                <br />
                                <label htmlFor="rating" style={{ float: "left" }}> Rating: </label>
                                <input style={{ float: "right" }} type="number" required id="rating" name="rating" value={input.rating} onChange={handleChange} />
                                <br />
                                <br />
                                <label htmlFor="imgUrl" style={{ float: "left" }}> Image Url: </label>
                                <textarea style={{ float: "right" }} type="text" required id="imgUrl" name="imgUrl" value={input.imgUrl} onChange={handleChange} />
                                <br />
                                <br />
                                {yearError && <p>{yearError}</p>}
                                {ratingError && <p>{ratingError}</p>}
                                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", paddingBottom: "20px" }}>
                                    <button className="submit" disabled={disable} >submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                !isLogin &&
                <Logout />
            }
        </section>
    );
};


export default Editor;


