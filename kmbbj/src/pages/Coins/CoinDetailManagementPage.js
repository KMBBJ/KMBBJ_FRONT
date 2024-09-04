import React from "react";
import CoinStatusUpdate from '../../components/CoinManage/CoinStatusUpdate';
import CoinDelete from '../../components/CoinManage/CoinDelete';
import { useParams } from 'react-router-dom';
import "../../assets/styles/Charts/CoinManagePage.css";

const ChartPage = () => {
  const { symbol } = useParams();

  return (
    <div className="manage-page-container">
      <div className="manage-page-card">
        <div className="manage-page-card__content">
        <CoinStatusUpdate symbol={symbol} />
        </div>
      </div>
      <div className="manage-page-card">
        <div className="manage-page-card__content">
          <CoinDelete symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;