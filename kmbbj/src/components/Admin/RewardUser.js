import React, { useState } from 'react';
import { rewardUser } from '../../services/Admin/userService';

const RewardUser = ({ userId }) => {
  const [amount, setAmount] = useState('');

  const handleReward = async () => {
    try {
      if (!amount) {
        alert('Amount is required');
        return;
      }

      const result = await rewardUser(userId, amount);
      console.log('Reward successful:', result);
    } catch (error) {
      console.error('Error giving reward:', error);
    }
  };

  return (
    <div>
      <h2>Reward User</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleReward}>Submit</button>
    </div>
  );
};

export default RewardUser;
