import React from 'react';
import { useParams } from 'react-router-dom';
import UserinfoAdmin from '../../components/Admin/UserinfoAdmin';
import SuspendUser from '../../components/Admin/SuspendUser';
import RewardUser from '../../components/Admin/RewardUser';
import UnsuspendUser from '../../components/Admin/UnsuspendUser';
import UserBalanceAndTransactions from '../../components/Admin/UserBalanceAndTransactions';
import '../../assets/styles/Profile/ProfilePage.css';

const UserDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="profile-page">
      <div className="right-column">
        <UserinfoAdmin userId={id} />
        <UserBalanceAndTransactions userId={id} /> 
        <SuspendUser userId={id} />
        <UnsuspendUser userId={id} />
        <RewardUser userId={id} />
      </div>
    </div>
  );
};

export default UserDetailsPage;
