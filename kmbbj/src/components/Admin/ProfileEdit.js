import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Admin/ProfileEdit.css';

const ProfileEdit = ({ onAction }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleUserListClick = (event) => {
    event.preventDefault();
    navigate('/admin/user_search');
  };

  const handleSuspendClick = (event) => {
    event.preventDefault();
    onAction(email, 'suspend');
  };

  const handleRewardClick = (event) => {
    event.preventDefault();
    onAction(email, 'reward');
  };

  const handleManageCoinClick = (event) => {
    event.preventDefault();
    navigate('/coins/manageCoin');
  };

  return (
    <div className="profile-edit">
      <h2>설정</h2>
      <form>
        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter user email" 
        />
        <button type="button" onClick={handleRewardClick}>보상</button>
      </form>

      <form onSubmit={handleSuspendClick}>
        <button type="submit">정지</button>
      </form>

      <form onSubmit={handleManageCoinClick}>
        <button type="submit">코인 관리</button>
      </form>

      <form onSubmit={handleUserListClick}>
        <button type="submit">사용자 목록</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
