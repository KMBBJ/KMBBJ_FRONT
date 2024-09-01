import React from "react";
import CoinStatusUpdate from '../../components/CoinManage/CoinStatusUpdate';
import CoinDelete from '../../components/CoinManage/CoinDelete';
import { useParams } from 'react-router-dom';

const ChartPage = () => {
  const { symbol } = useParams();

  return (
    <div className="auth-page">
      <CoinStatusUpdate symbol={symbol} />
      <CoinDelete symbol={symbol} />
    </div>
  );
};

export default ChartPage;