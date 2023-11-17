import React, { useState } from 'react';

export default function AdminHome() {
  const [type, setType] = useState("");
  const [que, setQue] = useState("");
  const [choices, setChoices] = useState([]);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]); // Updated to array for MAQ
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");
  const [newChoice, setNewChoice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    let finalAnswer = "";

    if (type === "intType") {
      finalAnswer = answer.toString(); // Use the "Answer" field for "intType"
    } else {
      // For MCQ and MAQ, save the selected indices as an array of strings
      finalAnswer = selectedAnswerIndices.map(index => index.toString());
    }

    fetch("http://localhost:5000/uploadQue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type,
        que,
        choices: type === "intType" ? [] : choices.map(choice => choice.trim()),
        answer: finalAnswer,
        score,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "Question Uploaded");
        if (data.status === "ok") {
          alert("Question Uploaded Successfully!!");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("An error occurred. Please try again.");
      });
  }

  // Function to add a new choice
  const addChoice = () => {
    setChoices([...choices, newChoice]);
    setNewChoice("");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner glass">
        <form onSubmit={handleSubmit}>
          <h3>Question</h3>

          <div className="input-box">
            <label>Type</label>
            <select
              className='form-control'
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
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
              onChange={(e) => setQue(e.target.value)}
              value={que}
            />
          </div>

          {type !== "intType" && (
            <div className="input-box">
              <label>Choices (one per line)</label>
              {choices.map((choice, index) => (
                <div key={index}>
                  {type === "maq" ? (
                    <input
                      type="checkbox"
                      name="maqChoices"
                      id={`choice${index}`}
                      checked={selectedAnswerIndices.includes(index)}
                      onChange={() => {
                        const newIndices = selectedAnswerIndices.includes(index)
                          ? selectedAnswerIndices.filter(i => i !== index)
                          : [...selectedAnswerIndices, index];
                        setSelectedAnswerIndices(newIndices);
                      }}
                    />
                  ) : (
                    <input
                      type="radio"
                      name="choices"
                      id={`choice${index}`}
                      checked={selectedAnswerIndices.length === 1 && selectedAnswerIndices[0] === index}
                      onChange={() => setSelectedAnswerIndices([index])}
                    />
                  )}
                  <label htmlFor={`choice${index}`}>{choice}</label>
                </div>
              ))}
              <input
                type="text"
                className="form-control"
                placeholder="Enter choice"
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
              />
              <button type="button" onClick={addChoice}>
                Add Choice
              </button>
            </div>
          )}

          {type === "intType" && (
            <div className="input-box">
              <label>Answer (Number)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter number as answer"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </div>
          )}

          <div className="input-box">
            <label>Score</label>
            <input
              type="text"
              className="form-control"
              placeholder="Score"
              onChange={(e) => setScore(e.target.value)}
              value={score}
            />
          </div>

          <button type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}


