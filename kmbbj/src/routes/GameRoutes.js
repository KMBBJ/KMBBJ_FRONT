import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePage from '../pages/Games/GamePage';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path="status/:encryptedGameId/balance/:userId" element={<GamePage />} />
    </Routes>
  );
};

export default GameRoutes;