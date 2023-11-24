import React, { useEffect, useState } from 'react';

export default function AdminHome() {
  const [quizzes, setQuizzes] = useState([]);

  // Fetching the list of available quizzes when the component mounts
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
    <div className="auth-wrapper " style={{ height: "auto" }}>
      <div className="auth-inner glass" style={{ width: "auto", height: "400px"  }}>
        <h3>Welcome Admin</h3>
        <p style={{ display: "flex",justifyContent:"center", alignItems:"center", fontSize:"1.2rem"}}>Available Quizes</p>
          {
            quizzes.length > 0 ? (
              <ul style={{display: "flex" }}>
                {quizzes.map((quiz) => (
                  <li style={{marginLeft:"20px",marginBottom:"10px"}} key={quiz._id}>
                    <strong>Topic:</strong> {quiz.topic}
                    <br />
                    <strong>Total Questions:</strong> {quiz.totalQuestions}
                    <br />
                    <strong>Total Score:</strong> {quiz.totalScore}
                    <br />
                    <strong>Total Time:</strong> {quiz.totalTime}
                    <br />
                  </li>
                ))}
              </ul>
            ) : (
              "No quizzes available."
            )
          }
        
          <a style={{display:"flex", justifyContent:"center", alignItems:"center"}} href={`/createquiz`}>
              <button style={{width:"20%"}}>Create New Quiz</button>
          </a>
      </div>
    </div>
  );
}


