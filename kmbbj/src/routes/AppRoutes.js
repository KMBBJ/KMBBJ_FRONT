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
      <Route path="/auth" component={AuthRoutes} /> 
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/charts" component={ChartRoutes} />
      <Route path="/matching" component={MatchingRoutes} />
      <Route path="/games" component={GameRoutes} />
      <Route path="/trading" component={TradingRoutes} />
      <Route path="/ranking" component={RankingRoutes} />
      <Route path="/notifications" component={NotificationRoutes} />
    </Routes>
  );
};

export default AppRoutes;