// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


// Create Express app
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect('mongodb+srv://rahulthreestar072:GQ4JP9E9vncSif83@clusterharini.mrq8g.mongodb.net/userDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Create User Schema and Model for Authentication
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Create UserDetails Schema and Model for Homepage form
const userdetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  degree: { type: String, required: true },
  passoutYear: { type: Number, required: true },
  ugpg: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Userdetails = mongoose.model('Userdetails', userdetailsSchema);

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Route to save the homepage form data
app.post('/submit-form', async (req, res) => {
  const { name, dob, degree, passoutYear, ugpg, phone, email } = req.body;

  try {
    // Save the form data into UserDetails collection
    const userdetails = new Userdetails({
      name,
      dob,
      degree,
      passoutYear,
      ugpg,
      phone,
      email,
    });

    await userdetails.save();
    res.status(200).json({ message: 'Data saved successfully! Someone will reach out shortly.' });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: 'Failed to save data.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
