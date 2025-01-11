import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // To navigate to another page after login

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, add your actual login logic (e.g., check credentials or make an API request)
    console.log({ email, password });

    // For now, we'll just redirect to the "home" route after successful login.
    // You can add a check if login is successful or not and redirect accordingly
    if (email && password) {
      // Redirect to the "home" page
      navigate("/home");
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginPage;
