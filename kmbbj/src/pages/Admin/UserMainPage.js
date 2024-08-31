import React, { useEffect, useState } from 'react';
import Announcement from '../../components/Admin/Announcement';
import UserInfo1 from '../../components/Admin/Userinfo1';
import '../../assets/styles/Profile/ProfilePage.css';
import ProfileEdit from '../../components/Admin/ProfileEdit';
import GameRank from '../../components/Profile/GameRank';
import { fetchAdminAnnouncementsAndUserInfo } from '../../services/Admin/userService';

const UserMainPage = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAdminAnnouncementsAndUserInfo();
        setAnnouncements(data.alarms);
        setUser(data.userInfo);
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    };

    loadData();
  }, []); 

  return (
    <div className="profile-page">
      <div className="left-column">
        <Announcement announcements={announcements} />
      </div>
      <div className="middle-column">
        <ProfileEdit />
      </div>
      <div className="right-column">
        <UserInfo1 user={user} />
        <GameRank />
      </div>
    </div>
  );
};

export default UserMainPage;
