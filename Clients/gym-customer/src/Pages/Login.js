import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/'); // Redirect to home page
    } else {
      setError('Wrong username or password');
    }
  };

  return (
      <div className='login-container'>
      <div className="wrapper">
          <header>Login</header>
        <span>Have an account?</span>

        {error && <div className="error-message">{error}</div>}

        <div className="input-field">
          <i className="bx bx-user"></i>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-field">
          <i className="bx bx-lock-alt"></i>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="bottom">
          <div className="left">
            <input type="checkbox" id="check" />
            <label htmlFor="check"> Remember Me</label>
          </div>
          <div className="right">
            <label><a href="#">Forgot password?</a></label>
          </div>
        </div>
        
        <div className="input-field">
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
      </div>
  );
};

export default Login;
