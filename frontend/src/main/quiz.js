// import React from 'react';
// // import CodeSnippet1 from '../../assets/images/code-snippet-1.png';

// const QuizQues = () => {
//   const react = {
//     topic: 'React',
//     level: 'Intermediate',
//     totalQuestions: 11,
//     totalScore: 95,
//     totalTime: 600,
//     questions: [
//       {
//         question: 'What is JSX in React?',
//         choices: [
//           'A syntax extension for JavaScript that allows writing HTML-like code in JavaScript',
//           'A state management library for React applications',
//           'A build tool for bundling React applications',
//           'A testing framework for React components',
//         ],
//         type: 'MCQs',
//         correctAnswers: [
//           'A syntax extension for JavaScript that allows writing HTML-like code in JavaScript',
//         ],
//         score: 10,
//       },
//       {
//         question: 'React components must always return a single JSX element.',
//         choices: ['True', 'False'],
//         type: 'boolean',
//         correctAnswers: ['True'],
//         score: 5,
//       },
//       {
//         question: 'What is the purpose of React components?',
//         choices: [
//           'To handle HTTP requests and fetch data from APIs',
//           'To manage the state of a React application',
//           'To define the structure and appearance of the user interface',
//           'To handle user interactions and events',
//         ],
//         type: 'MCQs',
//         correctAnswers: ['To define the structure and appearance of the user interface'],
//         score: 10,
//       },
//       {
//         question:
//           'Which of the following are valid React lifecycle methods? (Select all that apply)',
//         choices: [
//           'componentWillMount',
//           'componentDidMount',
//           'componentWillUpdate',
//           'componentDidUpdate',
//         ],
//         type: 'MAQs',
//         correctAnswers: ['componentDidMount', 'componentWillUpdate', 'componentDidUpdate'],
//         score: 10,
//       },
//       {
//         question: 'What will be the output of the following React code?',
//         code: `import React, { useState } from 'react';

//         const Counter = () => {
//         const [count, setCount] = useState(0);

//         const increment = () => {
//             setCount(count + 1);
//         };

//         return (
//             <div>
//             <p>Count: {count}</p>
//             <button onClick={increment}>Increment</button>
//             </div>
//         );
//         };

//         const App = () => {
//         return <Counter />;
//         };

//         export default App;`,
//         choices: ['Count: 0', 'Count: 1', 'Count: undefined', 'An error will occur'],
//         type: 'MCQs',
//         correctAnswers: ['Count: 0'],
//         score: 10,
//       },
//       {
//         question:
//           'In React, props are used to pass data from parent components to child components.',
//         choices: ['True', 'False'],
//         type: 'boolean',
//         correctAnswers: ['True'],
//         score: 5,
//       },
//       {
//         question: 'What is the output of the following code snippet?',
//         // image: CodeSnippet1,
//         choices: ['0', '1', '2', 'undefined'],
//         type: 'MCQs',
//         correctAnswers: ['0'],
//         score: 10,
//       },
//       {
//         question:
//           'Which of the following are valid ways to conditionally render content in React? (Select all that apply)',
//         choices: [
//           'Using the if-else statement',
//           'Using the ternary operator',
//           'Using the switch statement',
//           'Using the && operator',
//         ],
//         type: 'MAQs',
//         correctAnswers: [
//           'Using the if-else statement',
//           'Using the ternary operator',
//           'Using the && operator',
//         ],
//         score: 10,
//       },
//       {
//         question: 'In React, what is the purpose of keys in lists?',
//         choices: [
//           'To provide a unique identifier for each item in the list',
//           'To control the order of items in the list',
//           'To enable sorting and filtering of the list',
//           'To handle user interactions within the list',
//         ],
//         type: 'MCQs',
//         correctAnswers: ['To provide a unique identifier for each item in the list'],
//         score: 10,
//       },
//       {
//         question: 'What will be the result of the following React code?',
//         code: `import React from 'react';

//         class Button extends React.Component {
//           handleClick() {
//             console.log('Button clicked');
//           }

//           render() {
//             return <button onClick={this.handleClick}>Click me</button>;
//           }
//         }

//         const App = () => {
//           return <Button />;
//         };

//         export default App;`,
//         choices: [
//           'The "Button clicked" message will be logged to the console when the button is clicked',
//           'The button will not respond to the click event',
//           'An error will occur due to the incorrect usage of onClick',
//           'The button will display but nothing will happen when clicked',
//         ],
//         type: 'MCQs',
//         correctAnswers: [
//           'The "Button clicked" message will be logged to the console when the button is clicked',
//         ],
//         score: 10,
//       },
//       {
//         question: 'React uses a virtual DOM to optimize rendering performance.',
//         choices: ['True', 'False'],
//         type: 'boolean',
//         correctAnswers: ['True'],
//         score: 5,
//       },
//     ],
//   };

//   return (
//     <div>
//       {/* Your React component rendering logic here using the 'react' object */}
//     </div>
//   );
// };

// export default QuizQues;

import React, { useEffect, useState } from 'react';
import "./userHome.css";

export default function UserHome({ userData }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getQuestions", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "queDetails");

        // Check if the data structure is as expected
        console.log("API response data:", data);

        // If the structure is correct, proceed with setting state
        if (data && data.data && Array.isArray(data.data)) {
          // Set the state with the extracted data
          setQuestions(data.data);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner glass'>
        <h3>Questions</h3>
        {/* Now you can use the extracted data in your component */}
        {/* For example, you can map through the questions and render them */}
        {questions.map((question, index) => (
          <div key={index}>
            <p>Question: {question.que}</p>
            <form>
              {/* Check if choices is defined before mapping */}
              {question.choices &&
                question.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex}>
                    <input
                      type="radio"
                      id={`choices${choiceIndex}`}
                      name={`question${index}`}
                      value={choice}
                    />
                    <label htmlFor={`choices${choiceIndex}`}>{choice}</label>
                  </div>
                ))}
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}


    // function onNext(){
    //     console.log("Next question")
    // }
    // function onPre(){
    //     console.log("Previous question")
    // }

    // return(
    //     <div className="auth-wrapper">
    //         <div className="auth-inner glass">
    //             <h3>Questions</h3>

    //             {/* Questions display */}
    //             <Questions></Questions>

    //             <div className="btn">
    //                 <button className="prev" onClick={onPre}>Previous</button>
    //                 <button className="next" onClick={onNext}>Next</button>
    //             </div>
    //         </div>
    //     </div>

        

    // )
// }


