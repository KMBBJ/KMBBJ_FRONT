import React, { useEffect, useState } from 'react';
import { fetchUserBalanceAndTransactions } from '../../services/Admin/userService';

const UserBalanceAndTransactions = ({ userId }) => {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBalanceData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserBalanceAndTransactions(userId);
        setBalanceData(data); // 자산 및 거래 내역 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadBalanceData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!balanceData || !balanceData.totalBalance || !balanceData.transactions) {
    return <div>No data available.</div>;
  }

  const { totalBalance, transactions } = balanceData;

  return (
    <div>
      <h2>Total Balance: {totalBalance.asset}</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.assetTransactionId}>
            {transaction.changeType}: {transaction.changeAmount} - 
            {transaction.createTime ? new Date(transaction.createTime).toLocaleString() : 'No Date'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBalanceAndTransactions;
