import React from 'react';
import { Routes, Route } from 'react-router-dom';


import UserListPage from '../pages/Admin/UserListPage';
import UserMainPage from '../pages/Admin/UserMainPage';

const AdminRoutes = () => {
  return (
    <Routes>
       <Route path="user_search" element={<UserListPage />} />
       <Route path="" element={<UserMainPage />} />
    </Routes>
  );
};

export default AdminRoutes;