import React from "react";
import Chart from '../../components/Charts/Chart';
import CoinDetail from '../../components/Coin/CoinDetail'
import { useParams } from 'react-router-dom';

const ChartPage = () => {
  const { symbol } = useParams();

  return (
    <div className="auth-page">
      <CoinDetail symbol={symbol}/>
      <Chart symbol={symbol} />
    </div>
  );
};

export default ChartPage;