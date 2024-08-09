import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from '../pages/Profile/ProfilePage';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<ProfilePage />} />
      </Routes>
    );
  };
  
  export default AppRoutes;