import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation after form submission

const HomePage = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [degree, setDegree] = useState("");
  const [passout, setPassout] = useState("");
  const [ugpg, setUgpg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // for navigation after form submission

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      dob,
      degree,
      passoutYear: passout,
      ugpg,
      phone,
      email,
    };

    // The fetch function is placed here to handle the form data submission
    fetch("http://localhost:5000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); // Show success message after data is saved
        setTimeout(() => {
          navigate("/"); // Redirect to homepage after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        setMessage("Error saving data. Please try again.");
        console.error("Error:", error); // Log the error to the console
      });
  };

  // Generate years from 2010 to 2025
  const yearOptions = [];
  for (let year = 2010; year <= 2025; year++) {
    yearOptions.push(year);
  }

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login page after sign out
  };

  return (
    <div className="home-container" style={{ padding: "20px", position: "relative" }}>
      {/* Sign out button */}
      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={handleSignOut}
      >
        Sign Out
      </button>

      <h4>Welcome to the Home Page</h4>
      <p>You are now logged in!</p>

      {/* Form to collect user details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label>Date of Birth (DOB):</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Degree:</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Enter your degree"
            required
          />
        </div>

        <div>
          <label>Passout Year:</label>
          <select
            value={passout}
            onChange={(e) => setPassout(e.target.value)}
            required
          >
            <option value="">Select</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>UG/PG:</label>
          <select
            value={ugpg}
            onChange={(e) => setUgpg(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label>Email ID:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email ID"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Display success or error message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default HomePage;
