import React from 'react';
import '../../assets/styles/common/Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-footer">
          <button className="modal-action-button" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;