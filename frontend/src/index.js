import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Home from "./home"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import Home from './components/homePage'
import AboutUs from './components/aboutPage'
import UserDetails from "./main/userDetails";
import Quiz from './main/quiz';

function App() {

  const Logout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  const excludedRoutes = ['/home', '/aboutUs', '/login', '/signup'];
  const showLogoutLink = !excludedRoutes.includes(window.location.pathname);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-left">
            <h3>KnowledgeSangam</h3>
          </div>
          
          <div className="nav-right">
              {!showLogoutLink && (
                <ul className="nav-list">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/aboutUs">
                      About Us
                    </Link>
                  </li>
                </ul>
              )}
              {showLogoutLink && (
                <ul className="nav-list">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={Logout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

