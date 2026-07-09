import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://enterskillhub-production.up.railway.app/api/search')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ margin: '40px' }}>
      <h1>All Users</h1>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: '1px solid black',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Skills: {user.skills.join(', ')}</p>
          <p>Interests: {user.interests.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default Search;
