import React from 'react';
import '../../assets/styles/Admin/UserInfo.css';

const UserinfoAdmin = ({ userInfo }) => {
  const { name, type, email, suspensionEndDate } = userInfo; // name과 type으로 변경

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
