import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config'; // 👈 Imported API_BASE_URL here

function Home() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      // 👈 Replaced localhost with API_BASE_URL
      const res = await axios.post(`${API_BASE_URL}/api/rooms/create`);
      const room = res.data;
      
      // Assign unique ID for Creator (Player 1)
      const playerId = 'p1_' + Math.floor(Math.random() * 10000);
      sessionStorage.setItem('playerId', playerId);
      
      // Register Player 1 on backend
      await axios.post(`${API_BASE_URL}/api/rooms/${room.roomId}/join?playerId=${playerId}`);
      
      navigate(`/set-code/${room.roomId}`);
    } catch (err) {
      alert('Error creating room!');
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    const cleanRoomId = roomId.trim().toUpperCase();
    if (cleanRoomId) {
      // Assign unique ID for Joiner (Player 2)
      const playerId = 'p2_' + Math.floor(Math.random() * 10000);
      sessionStorage.setItem('playerId', playerId);

      try {
        // 👈 Replaced localhost with API_BASE_URL
        await axios.post(`${API_BASE_URL}/api/rooms/${cleanRoomId}/join?playerId=${playerId}`);
        navigate(`/set-code/${cleanRoomId}`);
      } catch (err) {
        alert('Error joining room! Check Room ID.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>CodeBreaker</h1>
      <p>The 2-Player Secret Code Race</p>

      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={handleCreateRoom}
          style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}
        >
          Create New Room
        </button>
      </div>

      <p style={{ margin: '20px 0' }}>— OR —</p>

      <form onSubmit={handleJoinRoom}>
        <input 
          type="text" 
          placeholder="Enter Room Code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
        />
        <button 
          type="submit"
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Join Room
        </button>
      </form>
    </div>
  );
}

export default Home;