import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePage from '../pages/Games/GamePage';
import GameResult from '../components/Games/GameResult';
import GameTransactionHistory from "../pages/Games/GameTransactionHistory"
import TotalAssetsPage from '../pages/Games/TotalAssetsPage';
import GameOver from '../pages/Games/GameOverPage';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path="status/:encryptedGameId/balance/:userId" element={<GamePage />} />
      <Route path="result/:encryptedGameId" element={<GameResult />} />
      <Route path="transaction-history" element={<GameTransactionHistory />} />
      <Route path="TotalAsset" element={<TotalAssetsPage />} />
      <Route path="GameOver/:encryptedGameId" element={<GameOver />} />
    </Routes>
  );
};

export default GameRoutes;