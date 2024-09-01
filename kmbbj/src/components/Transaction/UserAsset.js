import React, { useEffect, useState } from 'react';
import transactionService from '../../services/Transaction/transactionService';
import '../../assets/styles/Transaction/UserAsset.css';

const UserAsset = () => {
  const [userAssets, setUserAssets] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchUserAssets = async () => {
      try {
        const response = await transactionService.getUserAssetDetails({ userId });
        setUserAssets(response);
      } catch (error) {
        console.error('Failed to fetch user assets:', error);
      }
    };

    fetchUserAssets();
  }, []);

  if (!userAssets) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-asset">
      <div className="total-assets">
        <h2>보유자산</h2>
        <h3>총 보유자산</h3>
        <h1>{userAssets.totalEvaluationAmount.toLocaleString()} 원</h1>
      </div>

      <div className="asset-details">
        <div className="summary">
          <p>수익률: {userAssets.totalProfitRate.toFixed(2)}%</p>
          <p>평가손익: {userAssets.totalEvaluationAmount.toLocaleString()} 원</p>
          <p>보유원화: {userAssets.totalPurchaseAmount.toLocaleString()} 원</p>
          <p>매수금액: {userAssets.totalPurchaseAmount.toLocaleString()} 원</p>
        </div>

        <table className="asset-table">
          <thead>
            <tr>
              <th>가상자산 명</th>
              <th>보유수량</th>
              <th>매수금액</th>
              <th>평가금액</th>
              <th>수익률</th>
            </tr>
          </thead>
          <tbody>
            {userAssets.coinAssets.map((coin) => (
              <tr key={coin.coinSymbol}>
                <td>{coin.coinSymbol}</td>
                <td>{coin.quantity}</td>
                <td>{coin.purchaseAmount ? `${coin.purchaseAmount.toLocaleString()} 원` : '-'}</td>
                <td>{coin.evaluationAmount ? `${coin.evaluationAmount.toLocaleString()} 원` : '-'}</td>
                <td
                  className={coin.profitRate > 0 ? 'positive' : 'negative'}
                >
                  {coin.profitRate.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAsset;