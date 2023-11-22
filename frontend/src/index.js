import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import Home from './components/homePage'
import AboutUs from './components/aboutPage'
import UserDetails from "./main/userDetails";
import Quiz from './quizHome/quiz';
import QuestionForm from './quizHome/createQuiz';
import Result from './quizHome/result';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const Logout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-left">
            <h3>KnowledgeSangam</h3>
          </div>
          
          <div className="nav-right">
            {isAuthenticated ? (
              <ul className="nav-list">
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={Logout}>
                    Logout
                  </Link>
                </li>
              </ul>
              ) : (
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
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/createquiz" element={<QuestionForm />} />
            <Route path="/quiz/:quizTopic" element={<Quiz />} />
            <Route path="/results" element={<Result />} />
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

