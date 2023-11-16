import React from 'react'
import "./userHome.css"
// export default function UserHome({ userData }){
//     return(
//             <div class="main-div">
//                 <div class="inner-div">
//                     <h2 class=""question>Question</h2>
//                     <ul>
//                         <li>
//                             <input type="radio" name="'answer" id="ans1" class="answer" />
//                             <label for="ans1" id="option1">Option</label>
//                         </li>
    
//                         <li>
//                             <input type="radio" name="'answer" id="ans2" class="answer" />
//                             <label for="ans2" id="option2">Option</label>
//                         </li>
                        
//                         <li>
//                             <input type="radio" name="'answer" id="ans3" class="answer" />
//                             <label for="ans3" id="option3">Option</label>
//                         </li>
                        
//                         <li>
//                             <input type="radio" name="'answer" id="ans4" class="answer" />
//                             <label for="ans4" id="option4">Option</label>
//                         </li>
//                     </ul>
    
//                     <button id="submit">submit</button>
//                     <div id="showScore" class="scoreArea"> </div>
//                 </div>
//             </div>
//         ); 
        
// }
    
export default function UserHome({ userData }){
    return (
        <div className="auth-wrapper" style={{ height: "auto" }}>
          <div className="auth-inner glass" style={{ width: "auto" }}>
            <h3>Welcom User</h3>
            <p>
              Quiz details will be displayed here
              <a href="/quiz" >
                <button>Start Quiz</button>
              </a>
            </p>
          </div>
        </div>
      );
    
}