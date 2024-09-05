import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameRound from '../../components/Games/GameRound';
import GameBalance from '../../components/Games/GameBalance';
import "../../assets/styles/Games/GamePage.css";
import Chart from "../../components/Charts/Chart";
import CoinChart from '../../components/Coin/CoinChart';
import Pagination from '../../components/UserCoin/Pagination';
import useCoinData from '../../hooks/Coin/useCoinListData';
import GameCoinSearchBar from '../../components/Coin/GameCoinSearchBar';
import CoinDetail from '../../components/Coin/CoinDetail';
import OrderForm from '../../components/Transaction/OrderForm';

const GamePage = () => {
  const navigate = useNavigate();
  const { gameId, userId } = useParams();
  const { coins, currentPage, totalPages, setCurrentPage, handleSort, sortConfig, handleSearch } = useCoinData();

  const [selectedSymbol, setSelectedSymbol] = useState('BTC'); // selectedSymbol이 coinId 역할

  const handleSelectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const navigateToUserAssets = () => {
    navigate(`/games/user-assets`, { state: { userId } }); // UserAssetPage로 이동
  };

  return (
    <div className="game-page">
      <div className="game-page__container">
        <div className="game-page__coin-list">
          <div className="container1">
            <div className="search-bar">
              <GameCoinSearchBar onSearch={handleSearch} />
            </div>
            <div className="coin-table">
              <CoinChart
                coins={coins} 
                onSort={handleSort} 
                sortConfig={sortConfig}
                onSelectSymbol={handleSelectSymbol}
              />
            </div>
            <div className="game-coin-pagination">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
            </div>
          </div>
        </div>
        <div className="game-page__chart">
          <div className="chart">
            <CoinDetail symbol={selectedSymbol} />
            <Chart symbol={selectedSymbol} />
          </div>
        </div>
        <div className="game-page__round">
          <GameRound gameId={gameId} />
        </div>
        <div className="game-page__order">
            <GameBalance userId={userId} />
        </div>
        <div className="game-page__orders">
          <div className="game-page__orders-half">
            <OrderForm userId={userId} coinId={selectedSymbol} />
          </div>
        </div>
        <div className="game-page__chat">
         <button className="order-button" onClick={navigateToUserAssets}>자산 조회</button> {/* UserAssetPage로 이동 */}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
