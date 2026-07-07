import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://enterskillhub-production.up.railway.app/api/auth/login',
        {
          email,
          password,
        },
      );
      console.log(res.data);

      // Save JWT Token
      localStorage.setItem('token', res.data.token);

      alert('Login Successful');

      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h1>EnterSkillHub</h1>

      <h2>User Login</h2>

      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
