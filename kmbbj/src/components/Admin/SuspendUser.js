import React, { useState } from 'react';
import { suspendUser } from '../../services/Admin/userService';
import '../../assets/styles/Admin/RewardUser.css'; // 기존의 CSS 스타일 사용

const SuspendUser = ({ userId }) => {
  const [suspendDate, setSuspendDate] = useState('');
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  const handleSuspend = async () => {
    try {
      await suspendUser(userId, suspendDate);
      window.location.reload(); // 작업 완료 후 페이지 새로고침
    } catch (error) {
      alert('Failed to suspend user.');
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleSuspend(); // 정지 작업 실행
  };

  const handleCancel = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleSubmit = () => {
    if (!suspendDate) {
      alert('Please select a suspension date.');
      return;
    }
    setShowModal(true); // 모달 열기
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
      <button onClick={handleSubmit}>정지</button>

      {/* 모달 창 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>정말로 {suspendDate}까지 유저를 정지하시겠습니까?</p>
            <button onClick={handleConfirm}>확인</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuspendUser;
