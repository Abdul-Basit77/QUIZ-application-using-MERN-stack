// import React, { useState } from 'react';

// export default function AdminHome() {
//   const [topic, setTopic] = useState('');
//   const [totalQuestions, setTotalQuestions] = useState(1);
//   const [totalScore, setTotalScore] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);
//   const [questions, setQuestions] = useState([
//     { type: '', question: '', choices: [], correctAnswers: [], score: 0 },
//   ]);

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;

//     setQuestions(updatedQuestions);
//   };

//   const handleAddChoice = (index) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].choices.push('');
//     setQuestions(updatedQuestions);
//   };

//   const handleChoiceChange = (questionIndex, choiceIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].choices[choiceIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleCorrectAnswerChange = (index, value) => {
//     const updatedQuestions = [...questions];

//      if (updatedQuestions[index].type === 'mcq') {
//     updatedQuestions[index].correctAnswers = [value.split(',').pop()];
//     } else {
//     updatedQuestions[index].correctAnswers = value.split(',');
//     }

//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formattedQuestions = questions.map((question) => {
//         let finalAnswer = '';

//         if (question.type === 'intType') {
//           finalAnswer = question.correctAnswers[0].toString(); 
//         } else {
//           finalAnswer = question.correctAnswers.map((index) => index.toString());
//         }

//         return {
//           type: question.type,
//           question: question.question,
//           choices: question.type === 'intType' ? [] : question.choices.map((choice) => choice.trim()),
//           correctAnswers: finalAnswer,
//           score: question.score,
//         };
//       });

//       const response = await fetch('http://localhost:5000/uploadQue', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify({
//           topic,
//           totalQuestions,
//           totalScore,
//           totalTime,
//           questions: formattedQuestions,
//         }),
//       });

//       if (response.ok) {
//         console.log('Questions uploaded successfully!');
//         alert('Questions uploaded successfully!');
//       } else {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error uploading questions:', error.message);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner glass">
//         <form onSubmit={handleSubmit}>
//           <h3>Upload Questions</h3>

//           <div className="input-box">
//             <label>Topic:</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Topic"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//             />
//           </div>

//           <div className="input-box">
//             <label>Total Questions:</label>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Total Questions"
//               value={totalQuestions}
//               onChange={(e) => {
//                 setTotalQuestions(parseInt(e.target.value, 10));
//                 setQuestions(Array.from({ length: parseInt(e.target.value, 10) }, () => (
//                   { type: '', question: '', choices: [], correctAnswers: [], score: 0 })));
//               }}/>
//           </div>

//           <div className="input-box">
//             <label>Total Score:</label>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Total Score"
//               value={totalScore}
//               onChange={(e) => setTotalScore(parseInt(e.target.value, 10))}/>
//           </div>

//           <div className="input-box">
//             <label>Total Time:</label>
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Total Time"
//               value={totalTime}
//               onChange={(e) => setTotalTime(parseInt(e.target.value, 10))}/>
//           </div>

//           {questions.map((question, index) => (
//             <div key={index}>
//               <h4>Question: {index + 1}</h4>

//               <div className="input-box">
//                 <label>Type:</label>
//                 <select
//                   className='form-control'
//                   onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
//                   value={question.type || 'mcq'}>
//                     <option value="mcq">MCQ</option>
//                     <option value="maq">MAQ</option>
//                     <option value="intType">Integer type</option>
//                 </select>
//               </div>

//               <div className="input-box">
//                 <label>Question</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Question"
//                   value={question.question}
//                   onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}/>
//               </div>

//               {question.type !== 'intType' && (
//                 <div className="input-box">
//                   <label>Choices:</label>
//                   {question.choices.map((choice, choiceIndex) => (
//                     <div key={choiceIndex}>
//                       <input
//                         type={question.type === 'maq' ? 'checkbox' : 'radio'}
//                         name={`choices${index}`}
//                         id={`choice${index}_${choiceIndex}`}
//                         checked={question.correctAnswers.includes(choiceIndex.toString())}
//                         onChange={() => {
//                           const newCorrectAnswers = question.correctAnswers.includes(choiceIndex.toString())
//                             ? question.correctAnswers.filter(i => i !== choiceIndex.toString())
//                             : [...question.correctAnswers, choiceIndex.toString()];
//                           handleCorrectAnswerChange(index, newCorrectAnswers.join(','));
//                         }}/>
//                       <label htmlFor={`choice${index}_${choiceIndex}`}>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder={`Choice ${choiceIndex + 1}`}
//                           value={choice}
//                           onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}/>
//                       </label>
//                     </div>
//                   ))}
//                   <button type="button" onClick={() => handleAddChoice(index)}>
//                     Add Choice
//                   </button>
//                 </div>
//               )}

//               {question.type === 'intType' && (
//                 <div className="input-box">
//                   <label>Answer (Number)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Enter number as answer"
//                     onChange={(e) => handleQuestionChange(index, 'correctAnswers', e.target.value)}
//                     value={question.correctAnswers}/>
//                 </div>
//               )}

//               <div className="input-box">
//                 <label>Score</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Score"
//                   onChange={(e) => handleQuestionChange(index, 'score', e.target.value)}
//                   value={question.score}/>
//               </div>
//             </div>
//           ))}

//           <button type="submit">
//             Upload
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

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


