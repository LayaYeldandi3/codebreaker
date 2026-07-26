import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SetCode from './pages/SetCode';
import Game from './pages/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/set-code/:roomId" element={<SetCode />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;