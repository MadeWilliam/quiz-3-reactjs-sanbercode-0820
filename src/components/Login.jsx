import React, { Component } from 'react';
import { LoginContext } from "../contexts/LoginContext";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault()

        if(this.state.username === this.context.username && this.state.password === this.context.password) {
            this.context.toggleLogin();
        } else {
            alert("Username atau Password Salah")
        }

        this.setState({
            username: "",
            password: ""
        });
    }

    static contextType = LoginContext;

    render() {
        return (
            <div>
                {
                    !this.context.isLogin &&
                    < section >
                        <h1 className="centered">Login Page</h1>
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="login-container">
                                    <div className="username-container">
                                        <label htmlFor="username">Username : </label>
                                        < input type="text" name="username" id="username" value={this.state.username} onChange={this.handleUsernameChange} placeholder="admin" required />
                                    </div>
                                    <div className="password-container">
                                        <label htmlFor="prPrice">Password : </label>
                                        < input type="password" name="password" id="prPrice" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password" required />
                                    </div>
                                    <button className="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                        <p>Credentials</p>
                        <p>username : admin</p>
                        <p>password : password</p>
                    </section >
                }
                {
                    this.context.isLogin &&
                    <section>
                        <div>
                            <h1 className="centered">You are logged in</h1>
                            <h2>Go to tab Editor to edit movies</h2>
                        </div>
                    </section>
                }
            </div>
        );
    }
}

export default Login;