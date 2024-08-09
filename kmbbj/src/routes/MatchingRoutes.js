import React from "react";
import { Route, Routes } from "react-router-dom";
import RoomListPage from "../pages/Matching/RoomListPage";

const MatchingRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<RoomListPage />} />
    </Routes>
  );
};

export default MatchingRoutes;
