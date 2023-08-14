/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'


const Signin = () => {
    
    return (
        <>
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>InstaBook</h2>
                    <input type="email" placeholder="Email"  />
                    <input type="text" placeholder="Password" />
                    <button className="btn waves-effect waves-light blue" type="submit">
                        Sign in
                    </button>
                    <h5>Don't have an account? <Link to="/signup">Sign Up</Link></h5>
                </div>
            </div>
        </>
    )
}

export default Signin