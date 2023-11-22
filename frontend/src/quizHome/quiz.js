import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../main/userHome.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Array to store selected answers
  const [correctAnswers, setCorrectAnswers] = useState([]); // Array to store correct answers
  const [scores, setScores] = useState([]); // Array to store scores
  const { quizTopic } = useParams(); 

  // Function to check if two arrays are equal
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  useEffect(() => {
    // Fetching questions for the specific topic using the quizTopic
    fetch(`http://localhost:5000/getQuiz/${quizTopic}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "queDetails");

        console.log("API response data:", data);

        if (data.status === "ok" && data.quiz.questions && Array.isArray(data.quiz.questions)) {
          // Initialize arrays with empty values for each question
          setSelectedAnswers(Array(data.quiz.questions.length).fill([]));
          setCorrectAnswers(data.quiz.questions.map(question => question.correctAnswers.map(choice => parseInt(choice))));
          setScores(data.quiz.questions.map(question => question.score));
          setQuestions(data.quiz.questions);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [quizTopic]);

  const handleAnswerChange = (index, choiceIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    // newSelectedAnswers[index] = [...newSelectedAnswers[index], choiceIndex];
    if (questions[index].type === 'intType') {
      // For intType questions, store only the selected integer as a string
      newSelectedAnswers[index] = [choiceIndex];
    } else {
      // For other types of questions, store the selected choices as an array of strings
      newSelectedAnswers[index] = [...newSelectedAnswers[index], choiceIndex];
    }
    setSelectedAnswers(newSelectedAnswers);
  };

   // Handle quiz submission
   const submitQuiz = () => {
    // Initialize obScore to 0
    let obScore = 0;

    // Iterate over each question and compare selected and correct answers
    for (let i = 0; i < selectedAnswers.length; i++) {
      // If selected answer matches the correct answer index, increase the obScore
      if (arraysEqual(selectedAnswers[i], correctAnswers[i])) {
        obScore += scores[i];
      }
    }

    // Log the cumulative score
    console.log('obScore:', obScore);

    // Send the obScore to the server (if needed)
    // fetch('http://localhost:5000/submitQuiz', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     quizTopic,
    //     selectedAnswers,
    //     obScore,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data); // Display or store the final score
    //
    //     // Navigate to the "/results" page
    //     history.push('/results');
    //   })
    //   .catch((error) => {
    //     console.error('Error submitting quiz:', error);
    //   });

    // Log the selected answers, correct answers, and scores (for testing purposes)
    console.log('Selected Answers:', selectedAnswers);
    console.log('Correct Answers:', correctAnswers);
    console.log('Scores:', scores);
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner glass'>
        <h3>Questions for {quizTopic}</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <p>Question: {question.question}</p>
            {question.type !== 'intType' && (
              <form>
                {question.choices &&
                  question.choices.map((choice, choiceIndex) => (
                    <div key={choiceIndex}>
                      <input
                        type='checkbox'
                        id={`choices${choiceIndex}`}
                        name={`question${index}`}
                        value={choice}
                        onChange={() => handleAnswerChange(index, choiceIndex)}
                      />
                      <label htmlFor={`choices${choiceIndex}`}>{choice}</label>
                    </div>
                  ))}
              </form>
            )}
            {question.type === 'intType' && (
              <form>
                <div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter number as answer"
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              </form>
            )}
          </div>
        ))}
        <button onClick={submitQuiz}>Submit Quiz</button>
        {/* <a href={`/results`}> */}
          {/* <button>Submit Quiz</button> */}
        {/* </a> */}
      </div>
    </div>
  );
}


