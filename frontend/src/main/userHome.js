// import React from 'react'
// import "./userHome.css"

// export default function UserHome({ userData }){
//     return (
//         <div className="auth-wrapper" style={{ height: "auto" }}>
//           <div className="auth-inner glass" style={{ width: "auto" }}>
//             <h3>Welcom User</h3>
//             <p>
//               Quiz details will be displayed here
//               <a href="/quiz" >
//                 <button>Start Quiz</button>
//               </a>
//             </p>
//           </div>
//         </div>
//       );
    
// }

import React, { useEffect, useState } from 'react';
import "./userHome.css";

export default function UserHome() {
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
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner glass" style={{ width: "auto" }}>
        <h3>Welcome User</h3>
        <p>
          {
            quizzes.length > 0 ? (
              <ul>
                {quizzes.map((quiz) => (
                  <li key={quiz._id}>
                    <strong>Topic:</strong> {quiz.topic}
                    <br />
                    <strong>Total Questions:</strong> {quiz.totalQuestions}
                    <br />
                    <strong>Total Score:</strong> {quiz.totalScore}
                    <br />
                    <strong>Total Time:</strong> {quiz.totalTime}
                    <br />
                    <a href={`/quiz/${quiz.topic}`}>
                      <button>Start Quiz</button>
                    </a>

                  </li>
                ))}
              </ul>
            ) : (
              "No quizzes available."
            )
          }
        </p>
      </div>
    </div>
  );
}


