import React from 'react';
import AssetCard from '../../components/Profile/AssetCard';
import ProfileEdit from '../../components/Profile/ProfileEdit';
import UserInfo from '../../components/Profile/UserInfo';
import GameRank from '../../components/Profile/GameRank';
import '../../assets/styles/Profile/ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="left-column">
        <AssetCard />
      </div>
      <div className="middle-column">
        <ProfileEdit />
      </div>
      <div className="right-column">
        <UserInfo />
        <GameRank />
      </div>
    </div>
  );
};

export default ProfilePage;