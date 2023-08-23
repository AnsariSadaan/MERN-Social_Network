//PATH = client/src/components/Signup.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {

    if (! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email Id", classes: "#f44336 red" })
      return;
    }

    fetch("https://mern-social-network-phi.vercel.app/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#f44336 red" })
        }
        else {
          M.toast({ html: data.message, classes: "#4caf50 green" })
          navigate('/signin');
        }
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>MyInstaBook</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn waves-effect waves-light blue" onClick={() => PostData()} >Sign up</button>
        <h5>Have an account?<Link to="/signin"> Sign In</Link></h5>
      </div>
    </div>
  )
}

export default Signup

