// src/components/Admin/AnnouncementNotificationModal.js
import React from 'react';
import '../../assets/styles/Admin/AnnouncementNotificationModal.css';

const AnnouncementNotificationModal = ({ isOpen, onClose, announcement }) => {
  if (!isOpen) return null; // isOpen이 false일 때 모달을 렌더링하지 않음

  const title = announcement?.title || "No title available"; // 제목이 없으면 기본값 설정
  const content = announcement?.content || "No content available"; // 내용이 없으면 기본값 설정

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{content}</p>
      </div>
    </div>
  );
};

export default AnnouncementNotificationModal;
