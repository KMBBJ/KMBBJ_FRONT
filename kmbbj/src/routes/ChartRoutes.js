import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChartPage from '../pages/Charts/ChartPage';

const ChartRoutes = () => {
  return (
    <Routes>
      <Route path="/:symbol" element={<ChartPage />} />
    </Routes>
  );
};

export default ChartRoutes;