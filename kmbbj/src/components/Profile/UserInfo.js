import React from 'react';
import '../../assets/styles/Profile/UserInfo.css';

const UserInfo = ({ nickName, email }) => {
  return (
    <div className="user-info">
      <h2>사용자 정보</h2>
      <p>{nickName}</p>
      <p>{email}</p>
    </div>
  );
};

export default UserInfo;