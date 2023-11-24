import React, {useState } from "react";
import "./component.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);        
          window.location.href = "./userDetails";
        }
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner glass">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="input-box">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: 'white' }}
            />
          </div>
            <button type="submit">
              Submit
            </button>
          <p className="bottom-text">
              New here : <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}