import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/profile/profileService';
import { useAuth } from '../../hooks/Auth/AuthContext';
import AssetCard from '../../components/Profile/AssetCard';
import ProfileEdit from '../../components/Profile/ProfileEdit';
import UserInfo from '../../components/Profile/UserInfo';
import GameRank from '../../components/Profile/GameRank';
import '../../assets/styles/Profile/ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth(); // 로그인한 사용자 정보를 AuthContext에서 가져옴
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(user.id);
        setProfile(profileData.data);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="left-column">
        <AssetCard asset={profile.asset} assetTransactionList={profile.assetTransactionList} />
      </div>
      <div className="middle-column">
        <ProfileEdit />
      </div>
      <div className="right-column">
        <UserInfo nickName={profile.nickName} email={profile.email} />
        <GameRank recentRanks={profile.recentRanks || []} />
      </div>
    </div>
  );
};

export default ProfilePage;