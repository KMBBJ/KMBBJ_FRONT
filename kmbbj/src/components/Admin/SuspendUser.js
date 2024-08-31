// src/components/Admin/SuspendUser.js
import React, { useState } from 'react';
import { suspendUser } from '../../services/Admin/userService'; // 서비스 모듈 가져오기
import '../../assets/styles/Admin/RewardUser.css'; // 스타일 관련 코드

const SuspendUser = ({ userId }) => {
  const [suspendDate, setSuspendDate] = useState('');

  const handleSuspend = async () => {
    try {
      await suspendUser(userId, suspendDate);
      alert('User suspended successfully.');
    } catch (error) {
      alert('Failed to suspend user.');
    }
  };

  return (
    <div className="reward-user">
      <h2>유저 정지</h2>
      <input
        type="date"
        value={suspendDate}
        onChange={(e) => setSuspendDate(e.target.value)}
        placeholder="Select suspension date"
      />
      <button onClick={handleSuspend}>정지</button>
    </div>
  );
};

export default SuspendUser;
