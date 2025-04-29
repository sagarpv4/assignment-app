import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InstagramSearch() {


  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const input = e.target.value;

    const inputAlphanumericOnly = input.replace(/[^a-zA-Z0-9]/g, '');
    const inputTrimmed = inputAlphanumericOnly.slice(0, 30);
    setSearch(inputTrimmed);
  };


  const handleSearch = async () => {
    try {
      let url = "https://v1.rocketapi.io/instagram/user/search";
      const response = await fetch(url, {
        method: 'POST', // Using POST (not GET) because we have to send a JSON body
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token G39ABAF63GQulxjanaRw_A',
        },
        body: JSON.stringify({ "query": search }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log("response data: " + data);
      const users = data?.response?.body?.users ?? [];

      setUsers(users);
    } catch (err) {

      setError(err.message);
      setResults(null);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevents pasting
  };

  return (
    <>
      <div>

        <div style={{ padding: '2rem' }}>
          <h2 style={{ textAlign: 'left' }}>Search Input</h2>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            onPaste={handlePaste}
            placeholder="Enter alphanumeric text"
            maxLength={30}
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              width: '300px'
            }}
          />
          <span style={{ margin: '10px', padding: '5px' }}>Max 30 characters</span>
        </div>

        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>
          Search
        </button>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <table className="table">
          <thead>
            <tr>
              <th scope="col">User Name </th>
              <th scope="col">Full Name </th>
              <th scope="col">Profile Picture</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

            {users && users.length > 0 ? (
              users.map((user) => (
                <tr>
                  <td>{user.username}</td>
                  <td>{user.full_name}</td>
                  <td>
                    <a href={user.profile_pic_url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={user.profile_pic_url}
                        alt={user.username}
                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                      />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>
                  No Users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </>
  )
}


