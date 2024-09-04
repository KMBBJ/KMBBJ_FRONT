import React, { useEffect, useState } from 'react';
import * as transactionService from '../../services/Transaction/transactionService';  // 경로는 프로젝트 구조에 맞게 수정하세요
import '../../assets/styles/Transaction/TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchTransactions = async () => {
      try {
        const response = await transactionService.getTransactionsByUserId({ userId });
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleCancelOrder = async (transactionId) => {
    try {
      await transactionService.cancelOrder({ transactionId });
      // 성공적으로 취소 후 거래 내역 갱신
      setTransactions(transactions.filter(transaction => transaction.transactionId !== transactionId));
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('주문 취소에 실패했습니다.');
    }
  };

  return (
    <div className="transaction-history">
      <h2>거래 내역</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>거래 ID</th>
            <th>유형</th>
            <th>수량</th>
            <th>가격</th>
            <th>총 가격</th>
            <th>생성 날짜</th>
            <th>상태</th>
            <th>체결 날짜</th>
            <th>코인 심볼</th>
            <th>취소</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.price?.toLocaleString()} 원</td>
              <td>{transaction.totalPrice?.toLocaleString()} 원</td>
              <td>{transaction.createDate}</td>
              <td>{transaction.status}</td>
              <td>{transaction.executionDate || '-'}</td>
              <td>{transaction.symbol}</td>
              <td>
                {transaction.status === 'PENDING' && (
                  <button
                    className="cancel-button"
                    onClick={() => handleCancelOrder(transaction.transactionId)}
                  >
                    취소
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;