import React, { useEffect, useState } from 'react';
import Announcement from '../../components/Admin/Announcement';
import UserInfo1 from '../../components/Admin/Userinfo1';
import '../../assets/styles/Admin/ProfileAdminPage.css';
import ProfileEdit from '../../components/Admin/ProfileEdit';
import SuspendUser from '../../components/Admin/SuspendUser';
import RewardUser from '../../components/Admin/RewardUser';
import { fetchAdminAnnouncementsAndUserInfo, fetchUserIdByEmail } from '../../services/Admin/userService';

const UserMainPage = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [action, setAction] = useState(null); // 'suspend' 또는 'reward'
  const [userId, setUserId] = useState(null); // 유저 ID 상태 추가

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

  // 이메일로 유저 ID 가져오는 함수
  useEffect(() => {
    const loadUserId = async () => {
      if (selectedUserEmail) {
        try {
          const id = await fetchUserIdByEmail(selectedUserEmail);
          setUserId(id); // 가져온 유저 ID를 상태로 설정
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    };

    loadUserId();
  }, [selectedUserEmail]); // selectedUserEmail이 변경될 때마다 호출

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
        {action === 'suspend' && userId && <SuspendUser userId={userId} />}
        {action === 'reward' && userId && <RewardUser userId={userId} />}
      </div>
    </div>
  );
};

export default UserMainPage;
