// src/components/Admin/RewardUser.js
import React, { useState } from 'react';
import '../../assets/styles/Profile/UserInfo.css'; // 스타일 관련 코드

const RewardUser = () => {
  const [rewardAmount, setRewardAmount] = useState('');

  const handleReward = () => {
    // 보상 지급 버튼 클릭 시 동작할 로직을 여기에 추가할 수 있습니다.
    // 현재는 단순히 콘솔에 로그를 찍는 예시입니다.
    console.log('Reward given:', rewardAmount);
  };

  return (
    <div className="user-info">
      <h2>유저 보상</h2>
      <input
        type="number"
        value={rewardAmount}
        onChange={(e) => setRewardAmount(e.target.value)}
        placeholder="Enter reward amount"
      />
      <button onClick={handleReward}>Give Reward</button>
    </div>
  );
};

export default RewardUser;
