import  { createContext, useEffect, useReducer, useContext } from 'react';
import Navbar from './components/Navbar.jsx';
import './App.css';
import { BrowserRouter, useNavigate, Route, Routes } from 'react-router-dom';
import Home from './components/views/Home.jsx';
import Signin from './components/views/Signin.jsx';
import Signup from './components/views/Signup.jsx';
import Profile from './components/views/Profile.jsx';
import UserProfile from './components/views/UserProfile.jsx';
import CreatePost from './components/views/CreatePost';
import { initialState, reducer } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        dispatch({ type: "USER", payload: user });
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error("Failed to retrieve or parse user from localStorage:", error);
      navigate('/signin');
    }
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App







// sir mera posts table mein kuch entry show nae kar raha hai 