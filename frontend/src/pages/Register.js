import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        user,
      );

      alert(res.data.message);

      // Go to Login page after successful registration
      window.location.href = '/login';
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert('Network Error');
      }
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <h1>EnterSkillHub</h1>
      <h2>User Registration</h2>

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

      <button onClick={registerUser}>Register</button>

      <br />
      <br />

      <button onClick={() => (window.location.href = '/login')}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default Register;
