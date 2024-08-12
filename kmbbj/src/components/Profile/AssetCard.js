import React from 'react';
import '../../assets/styles/Profile/AssetCard.css';

const AssetCard = ({ asset, assetTransactionList }) => {
  return (
    <div className="asset-card">
      <h2>내 자산 현황</h2>
      <p>${asset}</p>
      <ul>
        {assetTransactionList.map((transaction, index) => (
          <li key={index}>{transaction.date} {transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssetCard;