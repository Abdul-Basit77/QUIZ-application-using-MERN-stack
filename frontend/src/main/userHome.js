import React, { useEffect, useState } from 'react';
import "./userHome.css";
import { Link } from 'react-router-dom';

export default function UserHome({ name }) {
  const [quizzes, setQuizzes] = useState([]);
  console.log("Received name in UserHome:", name);
  // Fetching  list of available quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:5000/getQuizzes");
        const data = await response.json();
        if (data.status === "ok") {
          setQuizzes(data.quizzes);
        } else {
          console.error("Error fetching quizzes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner glass" style={{ width: "auto", height: "400px"  }}>
        <h3>Welcome  {name}</h3>
        <p style={{ display: "flex",justifyContent:"center", alignItems:"center", fontSize:"1.2rem"}}>Select A Quiz To Start</p>
          {
            quizzes.length > 0 ? (
              <ul style={{display: "flex" }}>
                {quizzes.map((quiz) => (
                  <li  style={{marginLeft:"20px",marginBottom:"20px"}} key={quiz._id}>
                    <strong>Topic:</strong> {quiz.topic}
                    <br />
                    <strong>Total Questions:</strong> {quiz.totalQuestions}
                    <br />
                    <strong>Total Score:</strong> {quiz.totalScore}
                    <br />
                    <strong>Total Time:</strong> {quiz.totalTime}
                    <br />
                    <Link to={`/quiz/${quiz.topic}?name=${encodeURIComponent(name)}`}>
                      <button style={{marginTop:"20px"}}>Start Quiz</button>
                    </Link>
                  </li>
                ))}
                
              </ul>
            ) : ("No quizzes available.")
          }
        
      </div>
    </div>
  );
}


