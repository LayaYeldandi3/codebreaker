import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config'; // 👈 Imported API_BASE_URL here

function Game() {
  const { roomId } = useParams();
  const playerId = sessionStorage.getItem('playerId');

  const [currentGuess, setCurrentGuess] = useState('');
  const [p1Guesses, setP1Guesses] = useState([]);
  const [p2Guesses, setP2Guesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('WAITING');
  const [winner, setWinner] = useState(null);
  
  const [role, setRole] = useState('Player 1');
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // 👈 Replaced hardcoded localhost with API_BASE_URL
        const res = await axios.get(`${API_BASE_URL}/api/rooms/${roomId}/my-status?playerId=${playerId}`);
        const data = res.data;
        if (data && data.room) {
          setGameStatus(data.room.status);
          setWinner(data.room.winner);
          setRole(data.role);
          setIsMyTurn(data.isMyTurn);

          setP1Guesses(data.room.player1Guesses || []);
          setP2Guesses(data.room.player2Guesses || []);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [roomId, playerId]);

  const handleGuessSubmit = async (e) => {
    e.preventDefault();
    if (currentGuess.length !== 4) {
      alert('Guess must be 4 digits!');
      return;
    }

    try {
      // 👈 Replaced hardcoded localhost with API_BASE_URL
      await axios.post(`${API_BASE_URL}/api/rooms/${roomId}/guess`, {
        playerId: playerId,
        guess: currentGuess
      });
      setCurrentGuess('');
    } catch (err) {
      alert('Error submitting guess or not your turn!');
    }
  };

  const RenderGuessRow = ({ entry }) => (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
      {entry.guess.split('').map((digit, idx) => {
        const isCorrect = entry.matches && entry.matches[idx];
        return (
          <span 
            key={idx}
            style={{
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '18px',
              backgroundColor: isCorrect ? '#2e7d32' : '#424242',
              color: '#ffffff'
            }}
          >
            {digit}
          </span>
        );
      })}
      {entry.won && <span style={{ fontSize: '20px' }}> 🎉 WINNER!</span>}
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Room Code: <span style={{ color: '#1976d2' }}>{roomId}</span></h2>
        <h3>Role: {role}</h3>

        {winner && (
          <div style={{ padding: '12px', background: winner === playerId ? '#d4edda' : '#f8d7da', borderRadius: '6px', margin: '10px 0' }}>
            <h2>{winner === playerId ? '🎉 YOU CRACKED THE CODE & WON!' : '❌ OPPONENT CRACKED YOUR CODE FIRST!'}</h2>
          </div>
        )}

        <div style={{ 
          padding: '12px', 
          borderRadius: '8px', 
          background: isMyTurn ? '#e8f5e9' : '#fff3e0',
          border: `2px solid ${isMyTurn ? '#2e7d32' : '#f57c00'}`,
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          {gameStatus === 'PLAYING' 
            ? (isMyTurn ? "👉 YOUR TURN TO GUESS" : "⏳ Waiting for opponent to guess...") 
            : `Game Status: ${gameStatus}`}
        </div>
      </header>

      {/* 🎯 MAIN CANVAS */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, border: '2px solid #ddd', borderRadius: '8px', padding: '15px', background: '#fafafa' }}>
          <h3 style={{ borderBottom: '2px solid #1976d2', paddingBottom: '8px', marginTop: 0 }}>
            Player 1 Guesses
          </h3>
          {p1Guesses.length === 0 ? <p style={{ color: '#888' }}>No guesses yet</p> : (
            p1Guesses.map((g, i) => <RenderGuessRow key={i} entry={g} />)
          )}
        </div>

        <div style={{ flex: 1, border: '2px solid #ddd', borderRadius: '8px', padding: '15px', background: '#fafafa' }}>
          <h3 style={{ borderBottom: '2px solid #e65100', paddingBottom: '8px', marginTop: 0 }}>
            Player 2 Guesses
          </h3>
          {p2Guesses.length === 0 ? <p style={{ color: '#888' }}>No guesses yet</p> : (
            p2Guesses.map((g, i) => <RenderGuessRow key={i} entry={g} />)
          )}
        </div>
      </div>

      {/* ⌨️ TURN INPUT FORM */}
      <form onSubmit={handleGuessSubmit} style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input 
          type="text"
          maxLength="4"
          placeholder={isMyTurn ? "4 Digits" : "Locked..."}
          value={currentGuess}
          disabled={!isMyTurn || gameStatus !== 'PLAYING' || winner !== null}
          onChange={(e) => setCurrentGuess(e.target.value)}
          style={{ 
            padding: '12px', 
            fontSize: '20px', 
            letterSpacing: '6px', 
            textAlign: 'center', 
            width: '160px', 
            marginRight: '12px',
            borderRadius: '6px',
            border: '2px solid #ccc',
            backgroundColor: isMyTurn ? '#fff' : '#eeeeee'
          }}
        />
        <button 
          type="submit" 
          disabled={!isMyTurn || gameStatus !== 'PLAYING' || winner !== null}
          style={{ 
            padding: '12px 24px', 
            fontSize: '18px', 
            cursor: isMyTurn ? 'pointer' : 'not-allowed',
            borderRadius: '6px',
            backgroundColor: isMyTurn ? '#2e7d32' : '#9e9e9e',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold'
          }}
        >
          Submit Guess
        </button>
      </form>

      {/* 📓 PRIVATE NOTEPAD */}
      <div style={{ border: '2px dashed #999', borderRadius: '8px', padding: '15px', background: '#fffde7' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#f57f17' }}>📓 Private Scratchpad (Only visible to you)</h4>
        <textarea 
          rows="4" 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Use this space to track eliminated numbers, work out combinations, or plan your next move..."
          style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>
    </div>
  );
}

export default Game;