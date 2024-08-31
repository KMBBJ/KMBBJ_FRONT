// src/components/Admin/UnsuspendUser.js
import React from 'react';
import { unsuspendUser } from '../../services/Admin/userService'; // 서비스 모듈 가져오기
import '../../assets/styles/Admin/RewardUser.css'; // 스타일 관련 코드

const UnsuspendUser = ({ userId }) => {
  const handleUnsuspend = async () => {
    try {
      await unsuspendUser(userId);
      alert('User unsuspended successfully.');
    } catch (error) {
      alert('Failed to unsuspend user.');
    }
  };

  return (
    <div className="reward-user">
      <h2>유저 정지 해제</h2>
      <button onClick={handleUnsuspend}>Unsuspend</button>
    </div>
  );
};

export default UnsuspendUser;
