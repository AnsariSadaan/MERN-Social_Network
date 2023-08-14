// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

// import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="nav-wrapper blue">
                    <Link to="/" className="brand-logo left">MyInstaBook</Link>
                    <ul id="nav-mobile" className="right">
                        <li><Link to="/signin">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar