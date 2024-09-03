import React, { useState } from 'react';
import { unsuspendUser } from '../../services/Admin/userService';
import '../../assets/styles/Admin/RewardUser.css'; // 기존의 CSS 스타일 사용

const UnsuspendUser = ({ userId }) => {
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  const handleUnsuspend = async () => {
    try {
      await unsuspendUser(userId);
      window.location.reload(); // 작업 완료 후 페이지 새로고침
    } catch (error) {
      alert('Failed to unsuspend user.');
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleUnsuspend(); // 정지 해제 작업 실행
  };

  const handleCancel = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleSubmit = () => {
    setShowModal(true); // 모달 열기
  };

  return (
    <div className="reward-user">
      <h2>유저 정지 해제</h2>
      <button onClick={handleSubmit}>정지 해제</button>

      {/* 모달 창 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>정말로 유저의 정지를 해제하시겠습니까?</p>
            <button onClick={handleConfirm}>확인</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsuspendUser;
