import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext';

const Nav = () => {
    const { isLogin } = useContext(LoginContext)

    return (
        <div>
            <header>
                <img id="logo" src="/img/logo.png" width="200px" alt="logo" />
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        {
                            isLogin && <>
                                <li>
                                    <Link to='/editor'>Editor</Link>
                                </li>
                                <li>
                                    <Link to='/login'>Login</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Nav;