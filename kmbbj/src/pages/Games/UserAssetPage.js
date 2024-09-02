import React from 'react';
import { useLocation } from 'react-router-dom';
import TransactionHistory from '../../components/Transaction/TransactionHistory';

const TransactionHistoryPage = () => {
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem('userId'); // userId를 location.state로 받거나 로컬 스토리지에서 가져옴

  return (
    <div>
      <h1>거래 내역</h1>
      <TransactionHistory userId={userId} />
    </div>
  );
};

export default TransactionHistoryPage;
