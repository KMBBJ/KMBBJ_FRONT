// src/pages/Admin/AdminSignupPage.js
import React, { useState } from 'react';
import AdminList from '../../components/Admin/AdminList';
import AddAdmin from '../../components/Admin/AddAdmin';
import '../../assets/styles/Admin/AdminSignupPage.css';

const AdminSignupPage = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAdminAdded = () => {
    setRefresh(!refresh); // 새로운 어드민 추가 시 리스트를 다시 로드하기 위해 상태를 토글
  };

  return (
    <div className="admin-signup-page">
      <h2>Admin Management</h2>
      <AddAdmin onSuccess={handleAdminAdded} /> {/* 관리자 추가 폼 */}
      <AdminList key={refresh} /> {/* 관리자 리스트 */}
    </div>
  );
};

export default AdminSignupPage;
