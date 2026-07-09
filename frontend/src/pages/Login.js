import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://enterskillhub-production.up.railway.app/api/auth/register',
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      );

      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h1>EnterSkillHub</h1>

      <h2>User Registration</h2>

      <form onSubmit={registerUser}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Register</button>
      </form>

      <br />

      <button onClick={() => navigate('/login')}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default Register;
