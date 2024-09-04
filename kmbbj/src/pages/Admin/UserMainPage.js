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
  const [userNotFound, setUserNotFound] = useState(false); // 유저 없음 상태 추가

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

  useEffect(() => {
    const loadUserId = async () => {
      if (selectedUserEmail) {
        try {
          const id = await fetchUserIdByEmail(selectedUserEmail);
          if (id) {
            setUserId(id); // 가져온 유저 ID를 상태로 설정
            setUserNotFound(false); // 유저 없음 상태 초기화
          } else {
            setUserId(null);
            setUserNotFound(true); // 유저 없음 상태 설정
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
          setUserId(null);
          setUserNotFound(true); // 유저 없음 상태 설정
        }
      }
    };

    loadUserId();
  }, [selectedUserEmail]);

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
        {userNotFound && <div className="user-not-found">해당 이메일에 대한 유저가 없습니다.</div>}
        {action === 'suspend' && userId && <SuspendUser userId={userId} />}
        {action === 'reward' && userId && <RewardUser userId={userId} />}
      </div>
    </div>
  );
};

export default UserMainPage;
