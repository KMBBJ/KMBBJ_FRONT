import React, { useEffect, useState } from 'react';
import { fetchUserDetails } from '../../services/Admin/userService';
import '../../assets/styles/Admin/UserInfo.css';

const UserinfoAdmin = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchUserDetails(userId);
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserInfo();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>No user data available.</div>;
  }

  const { nickname, authority, email, suspensionEndDate } = userInfo;

  const isSuspended = suspensionEndDate && suspensionEndDate.trim() !== '';

  return (
    <div className={`user-info ${isSuspended ? 'suspended-info' : ''}`}>
      <h2>{authority}</h2>
      <p>{nickname}</p>
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
