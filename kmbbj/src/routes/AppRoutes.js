// src/routes/AppRoutes.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { AnnouncementProvider, useAnnouncement } from "../contexts/AnnouncementContext";
import AnnouncementNotificationModal from '../components/Admin/AnnouncementNotificationModal';
import { connectWebSocket, disconnectWebSocket } from '../services/Admin/notificationService';

const AppContent = () => {
  const { isModalOpen, closeAnnouncementModal, openAnnouncementModal, announcement } = useAnnouncement();

  useEffect(() => {
    // WebSocket 연결 및 공지사항 수신 설정
    connectWebSocket((receivedAnnouncement) => {
      openAnnouncementModal(receivedAnnouncement); // 수정된 부분
    });

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      disconnectWebSocket();
    };
  }, [openAnnouncementModal]); // openAnnouncementModal 추가

  return (
    <>
      <AnnouncementNotificationModal 
        isOpen={isModalOpen} 
        onClose={closeAnnouncementModal} 
        announcement={announcement}
      />
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/charts/*" element={<ChartRoutes />} />
          <Route path="/matching/*" element={<MatchingRoutes />} />
          <Route path="/games/*" element={<GameRoutes />} />
          <Route path="/trading/*" element={<TradingRoutes />} />
          <Route path="/ranking/*" element={<RankingRoutes />} />
          <Route path="/notifications/*" element={<NotificationRoutes />} />
          <Route path="*" element={<ProfileRoutes />} />
        </Route>
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return (
    <AnnouncementProvider>
      <AppContent />
    </AnnouncementProvider>
  );
};

export default AppRoutes;
