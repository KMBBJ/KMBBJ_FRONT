import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinListPage from '../pages/Coins/CoinListPage';
import CoinManagementPage from '../pages/Coins/CoinManagementPage';
import CoinDetailManagementPage from '../pages/Coins/CoinDetailManagementPage';

const CoinRoutes = () => {
  return (
    <Routes>
      <Route path='list' element={<CoinListPage/>} />
      <Route path='manageCoin' element={<CoinManagementPage/>} />
      <Route path="coinDetail/:symbol" element={<CoinDetailManagementPage/>} />
    </Routes>
  );
};

export default CoinRoutes;