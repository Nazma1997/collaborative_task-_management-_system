// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('user Info')) || [];
    const user = existingUsers.find((u) => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      // Successful login
      setLoginError(null);
      // console.log('User logged in:', user);
      navigate('/') 
      toast.success('Login Successfully')
      localStorage.setItem('user', credentials.email)
      window.location.reload()
    } else {
      //  an error message for unsuccessful login
      setLoginError('Login failed. Invalid email or password.');
      toast.error('Invalid Data')
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p className="error"><Link to='/register'>Are You New? Create An Account</Link></p>
      {loginError && <p className="error">{loginError}</p>}
    </div>
  );
}

export default Login;
