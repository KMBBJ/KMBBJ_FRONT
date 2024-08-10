import React from "react";
import { Route, Routes } from "react-router-dom";
import RoomListPage from "../pages/Matching/RoomListPage";
import RoomDetailPage from "../pages/Matching/RoomDetailPage";

const MatchingRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<RoomListPage />} />
      <Route path="enter/:roomId" element={<RoomDetailPage />} />
    </Routes>
  );
};

export default MatchingRoutes;
