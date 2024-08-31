import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePage from '../pages/Games/GamePage';
import GameRanking from '../components/Games/GameRanking';
import GameResult from '../components/Games/GameResult';
import GameTransactionHistory from "../components/Games/GameTransactionHistory"

const GameRoutes = () => {
  return (
    <Routes>
      <Route path="status/:encryptedGameId/balance/:userId" element={<GamePage />} />
      <Route path="ranking/:encryptedGameId" element={<GameRanking />} />
      <Route path="result/:encryptedGameId" element={<GameResult />} />
      <Route path="transaction-history" element={<GameTransactionHistory />} />
    </Routes>
  );
};

export default GameRoutes;