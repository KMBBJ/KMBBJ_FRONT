import React from 'react';
import '../../assets/styles/Admin/UserBalanceAndTransactions.css';

const UserBalanceAndTransactions = ({ balanceData, loading, error, page, setPage, size }) => {
  if (loading) {
    return <div className="user-balance">로딩 중...</div>;
  }

  if (error) {
    return <div className="user-balance">오류: {error}</div>;
  }

  const { totalBalance, transactions } = balanceData || {};

  return (
    <div className="user-balance">
      <h2>총 잔액: {totalBalance?.asset.toLocaleString('ko-KR') || '0'} </h2>
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
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 0))} disabled={page === 0}>
          이전
        </button>
        <button onClick={() => setPage(prevPage => prevPage + 1)} disabled={transactions?.length < size}>
          다음
        </button>
      </div>
    </div>
  );
};

export default UserBalanceAndTransactions;
