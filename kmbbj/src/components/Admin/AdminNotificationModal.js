// src/components/AdminNotificationModal.js
import React from "react";
import "../../assets/styles/Admin/AdminNotificationModal.css"; // 모달 스타일을 위한 CSS 파일

const AdminNotificationModal = ({ title, content, onClose }) => {
  return (
    <div className="admin-notification-modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default AdminNotificationModal;
