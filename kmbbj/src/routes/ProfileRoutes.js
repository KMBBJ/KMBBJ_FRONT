import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from '../pages/Profile/ProfilePage';
import AdminAnnouncementListPage from '../pages/Admin/AdminAnnouncementListPage';


const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="announcements" element={<AdminAnnouncementListPage />} />
      </Routes>
    );
  };
  
  export default AppRoutes;