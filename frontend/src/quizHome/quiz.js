import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../main/userHome.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]); 
  const [scores, setScores] = useState([]); 
  const { quizTopic } = useParams();
  const name = new URLSearchParams(window.location.search).get('name');

  // Function to check answer array
  function arraysEqual(arr1, arr2) {
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    return sortedArr1.length === sortedArr2.length && sortedArr1.every((value, index) => value === sortedArr2[index]);
  }

  useEffect(() => {
    console.log('quizTopic:', quizTopic);

    fetch(`http://localhost:5000/getQuiz/${quizTopic}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "queDetails");
        console.log('name:', name);
        console.log("API response data:", data);

        if (data.status === "ok" && data.quiz.questions && Array.isArray(data.quiz.questions)) {
          
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
  }, [quizTopic, name]);

  const handleAnswerChange = (index, choiceIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    
    if (questions[index].type === 'intType') {
      
      newSelectedAnswers[index] = [parseInt(choiceIndex, 10)];
    } else {
       
      const selectedChoices = newSelectedAnswers[index] || []; 
      const updatedChoices = selectedChoices.includes(choiceIndex)
        ? selectedChoices.filter((choice) => choice !== choiceIndex)
        : [...selectedChoices, choiceIndex];

      newSelectedAnswers[index] = updatedChoices;
    }
    setSelectedAnswers(newSelectedAnswers);
  };

   // Quiz submission
   const submitQuiz = () => {
    
    let obScore = 0;

    for (let i = 0; i < selectedAnswers.length; i++) {
      if (arraysEqual(selectedAnswers[i], correctAnswers[i])) {
        obScore += scores[i];
      }
    }

    console.log('obScore:', obScore);
    fetch('http://localhost:5000/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        quizTopic,
        obScore,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'already attempted') {
          alert("You have already attempted this Quiz");
        }else{
        console.log('Server response:',data); 
        }
        alert("Your Score is: " + obScore);
      })
      .catch((error) => {
        console.error('Error submitting quiz:', error);
      });

    console.log('Selected Answers:', selectedAnswers);
    console.log('Correct Answers:', correctAnswers);
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
      </div>
    </div>
  );
}


