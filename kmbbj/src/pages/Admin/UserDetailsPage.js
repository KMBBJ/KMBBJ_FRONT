import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserinfoAdmin from '../../components/Admin/UserinfoAdmin';
import SuspendUser from '../../components/Admin/SuspendUser';
import RewardUser from '../../components/Admin/RewardUser';
import UnsuspendUser from '../../components/Admin/UnsuspendUser';
import UserBalanceAndTransactions from '../../components/Admin/UserBalanceAndTransactions';
import { fetchUserDetails, fetchUserBalanceAndTransactions } from '../../services/Admin/userService';
import '../../assets/styles/Admin/ProfileAdminDetailPage.css';

const UserDetailsPage = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(true); // Balance loading 상태 추가
  const [balanceError, setBalanceError] = useState(null); // Balance error 상태 추가
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await fetchUserDetails(id);
        setUserInfo(response.data.userInfo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadBalanceData = async () => {
      try {
        setBalanceLoading(true);
        const data = await fetchUserBalanceAndTransactions(id, page, size);
        setBalanceData(data);
      } catch (err) {
        setBalanceError(err.message);
      } finally {
        setBalanceLoading(false);
      }
    };

    if (id) {
      loadUserData();
      loadBalanceData();
    }
  }, [id, page, size]);

  const reloadBalanceData = async () => {
    try {
      setBalanceLoading(true);
      const data = await fetchUserBalanceAndTransactions(id, page, size);
      setBalanceData(data);
    } catch (err) {
      setBalanceError(err.message);
    } finally {
      setBalanceLoading(false);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!userInfo) {
    return <div>사용자 데이터가 없습니다.</div>;
  }

  return (
    <div className="profile-page">
      <div className="left-column">
        <div className="user-info">
          <UserinfoAdmin userInfo={userInfo} />
        </div>
        <div className="suspend-user">
          <SuspendUser userId={id} />
        </div>
        <div className="unsuspend-user">
          <UnsuspendUser userId={id} />
        </div>
        <div className="reward-user">
          <RewardUser userId={id} onRewardSuccess={reloadBalanceData} />
        </div>
        <div className="admin-navigation">
          <Link to="/admin" className="admin-button">
            관리자 페이지  
          </Link>
          <Link to="/admin/user_search" className="admin-button">
            사용자 검색
          </Link>
        </div>
      </div>
      <div className="right-column">
        <UserBalanceAndTransactions
          balanceData={balanceData}
          loading={balanceLoading}
          error={balanceError}
          page={page}
          setPage={setPage}
          size={size}
        />
      </div>
    </div>
  );
};

export default UserDetailsPage;
