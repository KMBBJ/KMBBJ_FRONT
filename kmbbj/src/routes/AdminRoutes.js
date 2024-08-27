import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserDetailsPage from '../pages/Admin/UserDetailsPage'; 
import UserListPage from '../pages/Admin/UserListPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path=":id" element={<UserDetailsPage />} /> {/* 유저 상세 정보를 위한 경로 */}
       <Route path="user_search" element={<UserListPage />} />
    </Routes>
  );
};

export default AdminRoutes;