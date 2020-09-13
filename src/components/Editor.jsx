import React, { Component } from 'react';
import { LoginContext } from "../contexts/LoginContext";
import Logout from './Logout';

class Editor extends Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props)
        this.state = {
            pesertaLomba: ['Budi', 'Susi', 'Lala', 'Agung'],
            inputName: "",
            /// array tidak punya index -1
            indexOfForm: -1
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        let index = event.target.value
        let newPesertaLomba = this.state.pesertaLomba
        let editedPeserta = newPesertaLomba[this.state.indexOfForm]
        newPesertaLomba.splice(index, 1)

        if (editedPeserta !== undefined) {
            // array findIndex baru ada di ES6
            var newIndex = newPesertaLomba.findIndex((el) => el === editedPeserta)
            this.setState({ pesertaLomba: newPesertaLomba, indexOfForm: newIndex })

        } else {

            this.setState({ pesertaLomba: newPesertaLomba })
        }

    }

    handleEdit(event) {
        let index = event.target.value
        let peserta = this.state.pesertaLomba[index]
        this.setState({ inputName: peserta, indexOfForm: index })
    }

    // method with arrow function
    handleChange = (event) => {
        this.setState({ inputName: event.target.value });
    }

    handleSubmit(event) {
        // menahan submit
        event.preventDefault()

        let name = this.state.inputName

        if (name.replace(/\s/g, '') !== "") {
            let newPesertaLomba = this.state.pesertaLomba
            let index = this.state.indexOfForm

            if (index === -1) {
                newPesertaLomba = [...newPesertaLomba, name]
            } else {
                newPesertaLomba[index] = name
            }

            this.setState({
                pesertaLomba: newPesertaLomba,
                inputName: ""
            })
        }

    }

    render() {
        return (
            <div>
                {
                    this.context.isLogin &&
                    <section>
                        <h1>Daftar Peserta Lomba</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.pesertaLomba.map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{val}</td>
                                                <td>
                                                    <button onClick={this.handleEdit} value={index}>Edit</button>
                                                    <button onClick={this.handleDelete} value={index}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {/* Form */}
                        <h1>Form Peserta</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label> Masukkan nama peserta: </label>
                            <input type="text" value={this.state.inputName} onChange={this.handleChange} />
                            <button className="submit">submit</button>
                        </form>
                    </section>
                }
                {
                    !this.context.isLogin &&
                    <Logout />
                }
            </div>
        )
    }

}

export default Editor;