import React, { useEffect, useState } from 'react';
import Announcement from '../../components/Admin/Announcement';
import UserInfo1 from '../../components/Admin/Userinfo1';  // 수정된 컴포넌트 이름
import '../../assets/styles/Profile/ProfilePage.css';
import { fetchAdminAnnouncementsAndUserInfo } from '../../services/Admin/userService';
import ProfileEdit from '../../components/Admin/ProfileEdit';
import GameRank from '../../components/Profile/GameRank';

const UserMainPage = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAdminAnnouncementsAndUserInfo();
        setAnnouncements(data.alarms);  // 공지사항 저장
        setUser(data.userInfo);         // 사용자 정보 저장
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
