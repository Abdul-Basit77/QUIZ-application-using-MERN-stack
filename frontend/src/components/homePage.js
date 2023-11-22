import React from 'react';
import "./page.css";

export default function Home() {
  return (
    <div className="card " >
      <h3>Apollo's Oracle</h3>
        <p>
        Knowledge Sangam is a Quiz App inspired by Apollo's Oracle which will serve as a modern day equivalent 
        to the ancient temple, allowing users to engage in quizzes that challenges their knowledge and wisdom.<br/>
        Here Admins can create Quiz and users can attepmt it after attempting quiz users will be able to see 
        their result and leaderboard, Only admins can create new quiz or delete exixting one.
        Users or Admins can signup with their email id and can login to access their respective pages, Only person 
        with secret key will be able to sign-up as admin. 
        </p> 
    </div>  
    );
}