import React, { useState } from 'react';
import '../../assets/styles/Admin/AddAnnouncementModal.css'; // Make sure this path is correct

const AddAnnouncementModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (title && content) {
      onSave({ title, content });
      setTitle('');  // 제목 초기화
      setContent('');  // 내용 초기화
    } else {
      alert('제목과 내용을 모두 입력해 주세요.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <label className="modal-label">
          Title
          <input
            className="modal-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="modal-label">
          Message
          <textarea
            className="modal-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button className="modal-submit" onClick={handleSave}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;
