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
        'https://enterskillhub-production.up.railway.app/api/auth/register',
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      );

      alert(res.data.message);
      window.location.href = '/login';
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert('Network Error');
      }
    }
  };

  return (
    <div style={{ margin: '40px' }}>
      <h1>User Registration</h1>

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
    </div>
  );
}

export default Register;
