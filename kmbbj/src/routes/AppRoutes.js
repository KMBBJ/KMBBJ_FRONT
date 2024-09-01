/*
모든 앱의 라우팅을 관리함 <Routes>안에 추가하고 싶은데 있으면 적어주면 됨
인증이 필요하지 않은 경로는 /auth 링크로 타고가는데 저한테 말해주면됨
*/

import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import ChartRoutes from "./ChartRoutes";
import MatchingRoutes from "./MatchingRoutes";
import GameRoutes from "./GameRoutes";
import TradingRoutes from "./TradingRoutes";
import RankingRoutes from "./RankingRoutes";
import NotificationRoutes from "./NotificationRoutes";
import ProfileRoutes from "./ProfileRoutes";
import PrivateRoute from "./PrivateRoutes";
import CoinRoutes from "./CoinRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 인증이 필요하지 않은 경로 */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* 인증이 필요한 경로 */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/charts/*" element={<ChartRoutes />} />
        <Route path="/coins/*" element={<CoinRoutes />} />
        <Route path="/matching/*" element={<MatchingRoutes />} />
        <Route path="/games/*" element={<GameRoutes />} />
        <Route path="/trading/*" element={<TradingRoutes />} />
        <Route path="/ranking/*" element={<RankingRoutes />} />
        <Route path="/notifications/*" element={<NotificationRoutes />} />
        <Route path="*" element={<ProfileRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
