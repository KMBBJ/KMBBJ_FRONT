// src/components/Admin/UserinfoAdmin.js
import React from 'react';
import '../../assets/styles/Admin/UserInfo.css'; // 경로 확인

const UserinfoAdmin = ({ userInfo }) => {
  const { name, type, email, suspensionEndDate } = userInfo;

  // suspensionEndDate가 올바르게 평가되는지 확인
  const isSuspended = suspensionEndDate && suspensionEndDate.trim() !== '' && suspensionEndDate !== "null";

  return (
    <div className={`user-info ${isSuspended ? 'suspended-info' : ''}`}>
      <h2>{type}</h2>
      <p>{name}</p>
      <p>{email}</p>
      {isSuspended && (
        <p className="suspension-date">
          Suspended until: {new Date(suspensionEndDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default UserinfoAdmin;
