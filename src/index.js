import React from 'react';
import ReactDOM from 'react-dom/client';  // Use this for React 18 and above
import './index.css';
import App from './App';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
