import React, { useState } from 'react';
import { rewardUser } from '../../services/Admin/userService';
import '../../assets/styles/Admin/RewardUser.css';

const RewardUser = ({ userId, onRewardSuccess }) => {
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false); // 모달 창 상태

  const handleReward = async () => {
    try {
      const result = await rewardUser(userId, amount);
      console.log('보상 지급 성공:', result);

      // 보상 후 콜백 호출
      if (onRewardSuccess) {
        onRewardSuccess();
      }

      // 입력 필드 초기화
      setAmount('');
    } catch (error) {
      console.error('보상 지급 오류:', error);
    }
  };

  const handleConfirm = () => {
    setShowModal(false); // 모달 창 닫기
    handleReward(); // 보상 지급 함수 호출
  };

  const handleCancel = () => {
    setShowModal(false); // 모달 창 닫기
  };

  const handleSubmit = () => {
    if (!amount) {
      alert('금액을 입력해 주세요');
      return;
    }
    setShowModal(true); // 모달 창 열기
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
      <button onClick={handleSubmit}>제출</button>

      {/* 모달 창 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>ㄹㅇ로 {amount} 보상하시겠습니까?</p>
            <button onClick={handleConfirm}>확인</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardUser;
