import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
    fetchIdeas();
  }, [fetchProfile, fetchIdeas]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        'https://enterskillhub-production.up.railway.app/api/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(res.data);
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const fetchIdeas = async () => {
    try {
      const res = await axios.get(
        'http://https://enterskillhub-production.up.railway.app/api/ideas',
      );
      setIdeas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addIdea = async () => {
    if (!title || !description) {
      alert('Fill all fields');
      return;
    }

    try {
      await axios.post(
        'http://https://enterskillhub-production.up.railway.app/api/ideas',
        {
          title,
          description,
        },
      );

      setTitle('');
      setDescription('');
      fetchIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIdea = async (id) => {
    try {
      await axios.delete(
        `http://https://enterskillhub-production.up.railway.app/api/ideas/${id}`,
      );
      fetchIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  const searchUsers = async () => {
    try {
      const res = await axios.get(
        `http://https://enterskillhub-production.up.railway.app/api/search?keyword=${keyword}`,
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ margin: '40px' }}>
      <h1>EnterSkillHub</h1>

      {user && (
        <>
          <h2>Welcome {user.name}</h2>

          <p>Email: {user.email}</p>

          <p>Skills: {user.skills}</p>

          <p>Interests: {user.interests}</p>

          <button onClick={() => navigate('/profile')}>Edit Profile</button>

          <button onClick={logout} style={{ marginLeft: '10px' }}>
            Logout
          </button>

          <hr />

          <h2>Business Ideas</h2>

          <input
            type="text"
            placeholder="Idea Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />
          <br />

          <textarea
            placeholder="Idea Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />
          <br />

          <button onClick={addIdea}>Add Idea</button>

          <hr />

          {ideas.map((idea) => (
            <div
              key={idea._id}
              style={{
                border: '1px solid gray',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h3>{idea.title}</h3>

              <p>{idea.description}</p>

              <button onClick={() => deleteIdea(idea._id)}>Delete</button>
            </div>
          ))}

          <hr />

          <h2>Search Users</h2>

          <input
            type="text"
            placeholder="Enter skill or interest"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button onClick={searchUsers} style={{ marginLeft: '10px' }}>
            Search
          </button>

          <br />
          <br />

          {users.map((u) => (
            <div
              key={u._id}
              style={{
                border: '1px solid blue',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h3>{u.name}</h3>
              <p>{u.email}</p>
              <p>Skills: {u.skills}</p>
              <p>Interests: {u.interests}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;
