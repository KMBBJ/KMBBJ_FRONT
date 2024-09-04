import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePage from '../pages/Games/GamePage';
import GameResult from '../components/Games/GameResult';
import GameOver from '../pages/Games/GameOverPage';
import UserAssetPage from '../pages/Games/UserAssetPage';  
import TransactionHistoryPage from '../pages/Games/TransactionHistoryPage';  

const GameRoutes = () => {
  return (
    <Routes>
      <Route path="status/:gameId/balance/:userId" element={<GamePage />} />
      <Route path="result/:encryptedGameId" element={<GameResult />} />
      <Route path="GameOver/:encryptedGameId" element={<GameOver />} />
      <Route path="user-assets" element={<UserAssetPage />} /> 
      <Route path="transaction-history" element={<TransactionHistoryPage />} /> 
    </Routes>
  );
};

export default GameRoutes;