import React, { useState } from 'react';
import { rewardUser } from '../../services/Admin/userService';
import '../../assets/styles/Admin/RewardUser.css';

const RewardUser = ({ userId }) => {
  const [amount, setAmount] = useState('');

  const handleReward = async () => {
    try {
      if (!amount) {
        alert('금액을 입력해 주세요');
        return;
      }

      const result = await rewardUser(userId, amount);
      console.log('보상 지급 성공:', result);
    } catch (error) {
      console.error('보상 지급 오류:', error);
    }
  };

  return (
    <div className="reward-user">
      <h2>사용자 보상</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="금액을 입력하세요"
      />
      <button onClick={handleReward}>제출</button>
    </div>
  );
};

export default RewardUser;
