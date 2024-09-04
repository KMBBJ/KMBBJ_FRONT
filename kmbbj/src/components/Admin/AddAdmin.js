// src/components/Admin/AddAdmin.js
import React, { useState } from 'react';
import { join } from '../../services/Admin/userService';
import '../../assets/styles/Admin//AddAdmin.css';

const AddAdmin = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (password !== passwordCheck) {
      return; // 패스워드가 일치하지 않으면 함수 종료
    }

    try {
      await join(email, password, passwordCheck);
      setSuccess('Admin successfully added.');
      setEmail('');
      setPassword('');
      setPasswordCheck('');
      if (onSuccess) onSuccess(); // 성공 시 콜백 실행
    } catch (err) {
      // 에러 발생 시 아무 메시지도 표시하지 않음
    }
  };

  return (
    <div className="add-admin-container">
      <h3 className="add-admin-heading">Add New Admin</h3>
      <form onSubmit={handleSignup} className="add-admin-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
            className="form-input"
          />
        </div>
        {success && <div className="success-message">{success}</div>}
        <button type="submit" className="submit-button">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdmin;
