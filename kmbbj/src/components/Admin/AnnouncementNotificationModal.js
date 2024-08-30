import React from 'react';


const AnnouncementNotificationModal = ({ isOpen, onClose, announcement }) => {
  if (!isOpen) return null; // 모달이 열려있지 않을 때는 아무 것도 렌더링하지 않음

  const title = announcement?.title || "No title available";
  const content = announcement?.content || "No content available";

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
