// src/pages/Admin/UserDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // URL에서 파라미터를 추출하기 위한 훅
import UserinfoAdmin from '../../components/Admin/UserinfoAdmin';
import SuspendUser from '../../components/Admin/SuspendUser'; // 정지 컴포넌트
import RewardUser from '../../components/Admin/RewardUser'; // 보상 지급 컴포넌트
import UnsuspendUser from '../../components/Admin/UnsuspendUser'; // 정지 해제 컴포넌트
import '../../assets/styles/Profile/ProfilePage.css';
import { fetchUserDetails } from '../../services/Admin/userService';

const UserDetailsPage = () => {
  const { id } = useParams(); // URL에서 유저 ID 추출
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return; // ID가 없으면 아무것도 하지 않음
  
      try {
        const data = await fetchUserDetails(id);
        console.log('User data:', data); // 데이터 확인
        setUserInfo(data.userInfo); // 유저 정보만 설정
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
  
    loadData();
  }, [id]); // ID가 변경될 때마다 다시 실행
  

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="right-column">
        <UserinfoAdmin user={userInfo} />
        <SuspendUser userId={id} /> {/* 정지 컴포넌트에 유저 ID 전달 */}
        <UnsuspendUser userId={id} /> {/* 정지 해제 컴포넌트에 유저 ID 전달 */}
        <RewardUser /> {/* 보상 지급 컴포넌트 */}
      </div>
    </div>
  );
};

export default UserDetailsPage;
