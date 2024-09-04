import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserMainPage from '../pages/Admin/UserMainPage';
import UserDetailsPage from '../pages/Admin/UserDetailsPage'; 
import UserListPage from '../pages/Admin/UserListPage';
import AddAdminPage from '../pages/Admin/AdminSignupPage';


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path=":id" element={<UserDetailsPage />} /> {/* 유저 상세 정보를 위한 경로 */}
       <Route path="user_search" element={<UserListPage />} />
       <Route path="" element={<UserMainPage />} />
       <Route path="addAdmin" element={<AddAdminPage />} />
    </Routes>
  );
};

export default AdminRoutes;