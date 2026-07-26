import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config'; // 👈 Imported API_BASE_URL here

function SetCode() {
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 4) {
      alert('Code must be exactly 4 digits!');
      return;
    }

    const playerId = sessionStorage.getItem('playerId');
    if (!playerId) {
      alert('Player ID not found! Please return to home page and join again.');
      return;
    }

    try {
      // 👈 Replaced localhost with API_BASE_URL
      await axios.post(`${API_BASE_URL}/api/rooms/${roomId}/set-code`, {
        playerId: playerId,
        code: code
      });

      // Navigate to game view
      navigate(`/game/${roomId}`);
    } catch (err) {
      console.error('Set Code Error:', err);
      alert('Failed to lock in code! Check console or backend logs.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h2>Room Code: {roomId}</h2>
      <h3>Set Your Secret 4-Digit Code</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          maxLength="4"
          placeholder="e.g. 4831"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ 
            padding: '10px', 
            fontSize: '22px', 
            letterSpacing: '6px', 
            textAlign: 'center', 
            width: '140px',
            borderRadius: '6px',
            border: '2px solid #ccc' 
          }}
        />
        <br /><br />
        <button 
          type="submit" 
          style={{ 
            padding: '12px 24px', 
            fontSize: '16px', 
            cursor: 'pointer',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Lock In Code
        </button>
      </form>
    </div>
  );
}

export default SetCode;