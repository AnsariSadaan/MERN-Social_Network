
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Navbar() {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li key="profile"><Link to="/profile">Profile</Link></li>,
        <li key="create"><Link to="/create">Create Post</Link></li>,
        <li key="signout"><button className="btn #f44336 blue"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: 'CLEAR' });
            navigate('/signin');
          }}>Sign Out</button></li>
      ]
    } else {
      return [
        <li key="signin"><Link to="/signin">SignIn</Link></li>,
        <li key="signup"><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper blue">
        <Link to="/" className="brand-logo left">InstaBook</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar