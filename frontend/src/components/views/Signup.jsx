// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <>
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>InstaBook</h2>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email"  />
                    <input type="password" placeholder="Password"  />
                    <button className="btn waves-effect waves-light blue"  >Sign up</button>
                    <h5>Have an account?<Link to="/signin"> Sign In</Link></h5>
                </div>
            </div>
        </>
    )
}

export default Signup