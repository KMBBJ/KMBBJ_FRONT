import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinListPage from '../pages/Charts/CoinListPage';
import ChartPage from '../pages/Charts/ChartPage';

const ChartRoutes = () => {
  return (
    <Routes>
      <Route path='list' element={<CoinListPage/>} />
      <Route path='detail' element={<ChartPage/>} />
    </Routes>
  );
};

export default ChartRoutes;