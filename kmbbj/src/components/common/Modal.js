import React from 'react';
import '../../assets/styles/common/Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          {title && <h2>{title}</h2>}
          {children}
        </div>
        <div className="modal-footer">
          <button className="modal-action-button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;