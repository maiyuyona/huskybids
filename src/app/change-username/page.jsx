"use client";

import { useState } from 'react';

const ChangeUsername = () => {
  // Local state for the username
  const [username, setUsername] = useState('Dubs'); // Initial username
  const [newUsername, setNewUsername] = useState(''); // Input for new username
  const [message, setMessage] = useState(''); // Success message
  const [error, setError] = useState(''); // Error message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if username is not empty
    if (!newUsername.trim()) {
      setError('Username cannot be empty.');
      return;
    }

    // Update the username and show success message
    setUsername(newUsername);
    setMessage(`Your username has been changed to ${newUsername}`);
    setError(''); // Clear any previous errors
    setNewUsername(''); // Clear the input field
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Change Username</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Current Username:</label>
          <p style={styles.currentUsername}>{username}</p>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>New Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
              setError(''); // Clear error when user starts typing
            }}
            required
            style={styles.input}
            aria-label="New Username"
          />
        </div>
        {error && <p style={styles.errorText}>{error}</p>}
        <button
          type="submit"
          style={newUsername.trim() ? styles.button : { ...styles.button, ...styles.buttonDisabled }}
          disabled={!newUsername.trim()} // Disable button if input is empty
        >
          Change Username
        </button>
      </form>

      {message && <p style={styles.successMessage}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px',
  },
  currentUsername: {
    fontSize: '16px',
    color: '#333',
    margin: '0',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    marginBottom: '8px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  errorText: {
    fontSize: '12px',
    color: 'red',
    marginTop: '5px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
    cursor: 'not-allowed',
  },
  successMessage: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#4CAF50',
    marginTop: '20px',
  },
};

export default ChangeUsername;