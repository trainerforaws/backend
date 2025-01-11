import React, { useState } from 'react';

const SignUp = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if both email and password are provided
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Create the user object
    const userData = {
      email,
      password,
    };

    // Send the POST request to the backend API
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Send email and password in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Redirect to login page after successful signup (optional)
        alert('Sign Up successful! Please login.');
        // Optionally, you could redirect the user to the login page:
        // window.location.href = '/login';  // You can replace this with a React Router redirection if using React Router
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during signup. Please try again.');
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
