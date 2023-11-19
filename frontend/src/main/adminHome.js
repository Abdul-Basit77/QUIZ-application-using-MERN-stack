// import React, { useState } from 'react';

// export default function AdminHome() {
//   const [type, setType] = useState("");
//   const [que, setQue] = useState("");
//   const [choices, setChoices] = useState([]);
//   const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]); // Updated to array for MAQ
//   const [answer, setAnswer] = useState("");
//   const [score, setScore] = useState("");
//   const [newChoice, setNewChoice] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     let finalAnswer = "";

//     if (type === "intType") {
//       finalAnswer = answer.toString(); // Use the "Answer" field for "intType"
//     } else {
//       // For MCQ and MAQ, save the selected indices as an array of strings
//       finalAnswer = selectedAnswerIndices.map(index => index.toString());
//     }

//     fetch("http://localhost:5000/uploadQue", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         type,
//         que,
//         choices: type === "intType" ? [] : choices.map(choice => choice.trim()),
//         answer: finalAnswer,
//         score,
//       }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data, "Question Uploaded");
//         if (data.status === "ok") {
//           alert("Question Uploaded Successfully!!");
//         } else {
//           alert("Something went wrong");
//         }
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//         alert("An error occurred. Please try again.");
//       });
//   }

//   // Function to add a new choice
//   const addChoice = () => {
//     setChoices([...choices, newChoice]);
//     setNewChoice("");
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-inner glass">
//         <form onSubmit={handleSubmit}>
//           <h3>Question</h3>

//           <div className="input-box">
//             <label>Type</label>
//             <select
//               className='form-control'
//               onChange={(e) => setType(e.target.value)}
//               value={type}
//             >
//               <option value="mcq">MCQ</option>
//               <option value="maq">MAQ</option>
//               <option value="intType">Integer type</option>
//             </select>
//           </div>

//           <div className="input-box">
//             <label>Question</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Question"
//               onChange={(e) => setQue(e.target.value)}
//               value={que}
//             />
//           </div>

//           {type !== "intType" && (
//             <div className="input-box">
//               <label>Choices (one per line)</label>
//               {choices.map((choice, index) => (
//                 <div key={index}>
//                   {type === "maq" ? (
//                     <input
//                       type="checkbox"
//                       name="maqChoices"
//                       id={`choice${index}`}
//                       checked={selectedAnswerIndices.includes(index)}
//                       onChange={() => {
//                         const newIndices = selectedAnswerIndices.includes(index)
//                           ? selectedAnswerIndices.filter(i => i !== index)
//                           : [...selectedAnswerIndices, index];
//                         setSelectedAnswerIndices(newIndices);
//                       }}
//                     />
//                   ) : (
//                     <input
//                       type="radio"
//                       name="choices"
//                       id={`choice${index}`}
//                       checked={selectedAnswerIndices.length === 1 && selectedAnswerIndices[0] === index}
//                       onChange={() => setSelectedAnswerIndices([index])}
//                     />
//                   )}
//                   <label htmlFor={`choice${index}`}>{choice}</label>
//                 </div>
//               ))}
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter choice"
//                 value={newChoice}
//                 onChange={(e) => setNewChoice(e.target.value)}
//               />
//               <button type="button" onClick={addChoice}>
//                 Add Choice
//               </button>
//             </div>
//           )}

//           {type === "intType" && (
//             <div className="input-box">
//               <label>Answer (Number)</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Enter number as answer"
//                 onChange={(e) => setAnswer(e.target.value)}
//                 value={answer}
//               />
//             </div>
//           )}

//           <div className="input-box">
//             <label>Score</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Score"
//               onChange={(e) => setScore(e.target.value)}
//               value={score}
//             />
//           </div>

//           <button type="submit">
//             Upload
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// Test//

import React, { useState } from 'react';

export default function QuestionForm() {
  const [topic, setTopic] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [questions, setQuestions] = useState([
    { type: '', question: '', choices: [], correctAnswers: [], score: 0 },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;

    setQuestions(updatedQuestions);
  };

  const handleAddChoice = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.push('');
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswers = value.split(',');
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedQuestions = questions.map((question) => {
        let finalAnswer = '';

        if (question.type === 'intType') {
          finalAnswer = question.correctAnswers[0].toString(); // Use the "correctAnswers" field for "intType"
        } else {
          // For MCQ and MAQ, save the selected indices as an array of strings
          finalAnswer = question.correctAnswers.map((index) => index.toString());
        }

        return {
          type: question.type,
          question: question.question,
          choices: question.type === 'intType' ? [] : question.choices.map((choice) => choice.trim()),
          correctAnswers: finalAnswer,
          score: question.score,
        };
      });

      const response = await fetch('http://localhost:5000/uploadQue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          topic,
          totalQuestions,
          totalScore,
          totalTime,
          questions: formattedQuestions,
        }),
      });

      if (response.ok) {
        console.log('Questions uploaded successfully!');
        alert('Questions uploaded successfully!');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading questions:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner glass">
        <form onSubmit={handleSubmit}>
          <h3>Upload Questions</h3>

          <div className="input-box">
            <label>Topic:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label>Total Questions:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Total Questions"
              value={totalQuestions}
              onChange={(e) => {
                setTotalQuestions(parseInt(e.target.value, 10));
                setQuestions(Array.from({ length: parseInt(e.target.value, 10) }, () => (
                  { type: '', question: '', choices: [], correctAnswers: [], score: 0 })));
              }}/>
          </div>

          <div className="input-box">
            <label>Total Score:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Total Score"
              value={totalScore}
              onChange={(e) => setTotalScore(parseInt(e.target.value, 10))}/>
          </div>

          <div className="input-box">
            <label>Total Time:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Total Time"
              value={totalTime}
              onChange={(e) => setTotalTime(parseInt(e.target.value, 10))}/>
          </div>

          {questions.map((question, index) => (
            <div key={index}>
              <h4>Question: {index + 1}</h4>

              <div className="input-box">
                <label>Type:</label>
                <select
                  className='form-control'
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                  value={question.type}>
                    <option value="mcq">MCQ</option>
                    <option value="maq">MAQ</option>
                    <option value="intType">Integer type</option>
                </select>
              </div>

              <div className="input-box">
                <label>Question</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}/>
              </div>

              {question.type !== 'intType' && (
                <div className="input-box">
                  <label>Choices:</label>
                  {question.choices.map((choice, choiceIndex) => (
                    <div key={choiceIndex}>
                      <input
                        type={question.type === 'maq' ? 'checkbox' : 'radio'}
                        name={`choices${index}`}
                        id={`choice${index}_${choiceIndex}`}
                        checked={question.correctAnswers.includes(choiceIndex.toString())}
                        onChange={() => {
                          const newCorrectAnswers = question.correctAnswers.includes(choiceIndex.toString())
                            ? question.correctAnswers.filter(i => i !== choiceIndex.toString())
                            : [...question.correctAnswers, choiceIndex.toString()];
                          handleCorrectAnswerChange(index, newCorrectAnswers.join(','));
                        }}/>
                      <label htmlFor={`choice${index}_${choiceIndex}`}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Choice ${choiceIndex + 1}`}
                          value={choice}
                          onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}/>
                      </label>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddChoice(index)}>
                    Add Choice
                  </button>
                </div>
              )}

              {question.type === 'intType' && (
                <div className="input-box">
                  <label>Answer (Number)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter number as answer"
                    onChange={(e) => handleQuestionChange(index, 'correctAnswers', e.target.value)}
                    value={question.correctAnswers}/>
                </div>
              )}

              <div className="input-box">
                <label>Score</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Score"
                  onChange={(e) => handleQuestionChange(index, 'score', e.target.value)}
                  value={question.score}/>
              </div>
            </div>
          ))}

          <button type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}


