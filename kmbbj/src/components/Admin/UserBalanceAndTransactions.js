import React, { useEffect, useState } from 'react';
import { fetchUserBalanceAndTransactions } from '../../services/Admin/userService';
import '../../assets/styles/Admin/UserBalanceAndTransactions.css';

const UserBalanceAndTransactions = ({ userId }) => {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  useEffect(() => {
    const loadBalanceData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserBalanceAndTransactions(userId, page, size);
        console.log("Fetched data:", data); // 데이터 구조를 확인하기 위한 콘솔 로그
        setBalanceData(data); // 데이터 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadBalanceData();
    }
  }, [userId, page, size]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return <div className="user-balance">로딩 중...</div>;
  }

  if (error) {
    return <div className="user-balance">오류: {error}</div>;
  }

  const { totalBalance, transactions } = balanceData || {}; // transactions로 데이터를 매핑

  return (
    <div className="user-balance">
      <h2>총 잔액: {totalBalance?.asset.toLocaleString('ko-KR') || '0'} 원</h2>
      {transactions && transactions.length > 0 ? (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>유형</th>
              <th>금액</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.assetTransactionId}>
                <td>{transaction.changeType}</td>
                <td>{transaction.changeAmount.toLocaleString('ko-KR')}</td>
                <td>{transaction.createTime ? new Date(transaction.createTime).toLocaleString('ko-KR') : '날짜 없음'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-transactions">거래 내역이 없습니다.</div>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 0}>
          이전
        </button>
        <button onClick={handleNextPage} disabled={transactions?.length < size}>
          다음
        </button>
      </div>
    </div>
  );
};

export default UserBalanceAndTransactions;
