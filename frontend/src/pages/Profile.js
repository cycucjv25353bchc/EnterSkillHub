import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(
        'http://https://enterskillhub-production.up.railway.app/api/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setName(res.data.name || '');
        setSkills(
          Array.isArray(res.data.skills) ? res.data.skills.join(', ') : '',
        );
        setInterests(
          Array.isArray(res.data.interests)
            ? res.data.interests.join(', ')
            : '',
        );
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to load profile');
      });
  }, []);

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      console.log('Sending:', {
        name,
        skills,
        interests,
      });

      const res = await axios.put(
        'http://https://enterskillhub-production.up.railway.app/api/profile',
        {
          name,
          skills,
          interests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      alert('Profile Updated Successfully');

      navigate('/dashboard');
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ margin: '40px' }}>
      <h2>Edit Profile</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Interests (comma separated)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}

export default Profile;
