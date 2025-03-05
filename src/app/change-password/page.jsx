'use client';

import { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    if (!validatePassword(newPassword)) {
      setMessage('Password does not meet the required criteria');
      return;
    }
    setMessage(`Congratulations, you've successfully changed your password to ${newPassword}`);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Change Password</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              const newPassword = e.target.value;
              setNewPassword(newPassword);
              setIsValidPassword(validatePassword(newPassword));
              setPasswordMatch(newPassword === confirmPassword);
            }}
            required
            style={styles.input}
          />
          {!isValidPassword && (
            <p style={styles.errorText}>
              Password must contain at least 8 characters, one letter, one number, and one special character.
            </p>
          )}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              const confirmPassword = e.target.value;
              setConfirmPassword(confirmPassword);
              setPasswordMatch(confirmPassword === newPassword);
            }}
            required
            style={styles.input}
          />
          {passwordMatch !== null && (
            <span style={{ ...styles.matchIndicator, color: passwordMatch ? 'green' : 'red' }}>
              {passwordMatch ? '✓' : '✗'}
            </span>
          )}
        </div>
        <button type="submit" disabled={!validatePassword(newPassword) || newPassword !== confirmPassword} style={styles.button}>
          Change Password
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  errorText: {
    fontSize: '12px',
    color: 'red',
    marginTop: '5px',
  },
  matchIndicator: {
    fontSize: '16px',
    marginLeft: '10px',
    marginTop: '5px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
    cursor: 'not-allowed',
  },
  message: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
    marginTop: '20px',
  },
};

export default ChangePassword;