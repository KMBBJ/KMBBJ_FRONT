/*
모든 앱의 라우팅을 관리함 <Routes>안에 추가하고 싶은데 있으면 적어주면 됨
*/

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';
import ChartRoutes from './ChartRoutes';
import MatchingRoutes from './MatchingRoutes';
import GameRoutes from './GameRoutes';
import TradingRoutes from './TradingRoutes';
import RankingRoutes from './RankingRoutes';
import NotificationRoutes from './NotificationRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/charts/*" element={<ChartRoutes />} />
      <Route path="/matching/*" element={<MatchingRoutes />} />
      <Route path="/games/*" element={<GameRoutes />} />
      <Route path="/trading/*" element={<TradingRoutes />} />
      <Route path="/ranking/*" element={<RankingRoutes />} />
      <Route path="/notifications/*" element={<NotificationRoutes />} />
    </Routes>
  );
};

export default AppRoutes;