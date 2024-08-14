import React from 'react';
import '../../assets/styles/Profile/UserInfo.css';

const UserInfo1 = ({ user }) => {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-info">
      <h2>{user.type}</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserInfo1;
