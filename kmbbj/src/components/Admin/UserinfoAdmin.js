// src/components/Admin/UserinfoAdmin.js
import React from 'react';
import '../../assets/styles/Admin/UserInfo.css';

const UserinfoAdmin = ({ user }) => {
  if (!user) {
    return <p>Loading...</p>;
  }

  const { name, type, email, suspensionEndDate } = user;

  // suspensionEndDate가 null이거나 빈 문자열이면 정지 상태 해제
  const isSuspended = suspensionEndDate && suspensionEndDate !== 'null' && suspensionEndDate.trim() !== '';

  return (
    <div className={`user-info ${isSuspended ? 'suspended-info' : ''}`}>
      <h2>{type}</h2>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
};

export default UserinfoAdmin;
