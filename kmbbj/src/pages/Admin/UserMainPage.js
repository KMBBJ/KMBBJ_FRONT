import React, { useEffect, useState } from 'react';
import Announcement from '../../components/Admin/Announcement';
import UserInfo1 from '../../components/Admin/Userinfo1';
import '../../assets/styles/Profile/ProfilePage.css';
import ProfileEdit from '../../components/Admin/ProfileEdit';
import SuspendUser from '../../components/Admin/SuspendUser';
import RewardUser from '../../components/Admin/RewardUser';
import { fetchAdminAnnouncementsAndUserInfo } from '../../services/Admin/userService';

const UserMainPage = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [action, setAction] = useState(null); // 'suspend' 또는 'reward'

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
        <ProfileEdit 
          onAction={(email, actionType) => {
            setSelectedUserEmail(email);
            setAction(actionType);
          }}
        />
      </div>
      <div className="right-column">
        <UserInfo1 user={user} />
        {action === 'suspend' && <SuspendUser userId={selectedUserEmail} />}
        {action === 'reward' && <RewardUser userId={selectedUserEmail} />}
      </div>
    </div>
  );
};

export default UserMainPage;
