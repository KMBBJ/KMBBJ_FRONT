import React from 'react';
import { useLocation } from 'react-router-dom';
import UserAsset from '../../components/Transaction/UserAsset';

const UserAssetPage = () => {
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem('userId'); // userId를 location.state로 받거나 로컬 스토리지에서 가져옴

  return (
    <div>
      <h1>보유 자산</h1>
      <UserAsset userId={userId} />
    </div>
  );
};

export default UserAssetPage;
