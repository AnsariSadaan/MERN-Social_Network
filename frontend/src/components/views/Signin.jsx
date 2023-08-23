import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../App';
import M from 'materialize-css';

function Signin() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //creating network request
  const PostData = async () => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email Id", classes: "#f44336 red darken-4" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password,
          email
        })
      });

      const data = await response.json();

      if (data.error) {
        M.toast({ html: data.error, classes: "#f44336 red" });
      } else {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        M.toast({ html: 'Successfully Signed In', classes: "#4caf50 green" });
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>MyInstaBook</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn waves-effect waves-light blue" type="submit" onClick={() => PostData()}>
          Sign in
        </button>
        <h5>Dont have an account? <Link to="/register">Sign Up</Link></h5>
      </div>
    </div>
  )
}

export default Signin

