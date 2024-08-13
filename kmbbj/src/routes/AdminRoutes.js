import React from 'react';
import { Routes, Route } from 'react-router-dom';


import UserListPage from '../pages/Admin/UserListPage';

const AdminRoutes = () => {
  return (
    <Routes>
       <Route path="user_search" element={<UserListPage />} />
    </Routes>
  );
};

export default AdminRoutes;