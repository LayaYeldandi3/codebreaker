import axios from 'axios';

// Base URL for our upcoming Spring Boot server
const API_BASE_URL = 'http://localhost:8080/api/rooms';

export const createRoom = async () => {
  // POST /api/rooms/create
  const response = await axios.post(`${API_BASE_URL}/create`);
  return response.data;
};

export const setSecretCode = async (roomId, playerId, code) => {
  // POST /api/rooms/{id}/set-code
  const response = await axios.post(`${API_BASE_URL}/${roomId}/set-code`, {
    playerId,
    code,
  });
  return response.data;
};

export const submitGuess = async (roomId, playerId, guess) => {
  // POST /api/rooms/{id}/guess
  const response = await axios.post(`${API_BASE_URL}/${roomId}/guess`, {
    playerId,
    guess,
  });
  return response.data;
};

export const getRoomStatus = async (roomId) => {
  // GET /api/rooms/{id}/status (Will be used for polling)
  const response = await axios.get(`${API_BASE_URL}/${roomId}/status`);
  return response.data;
};