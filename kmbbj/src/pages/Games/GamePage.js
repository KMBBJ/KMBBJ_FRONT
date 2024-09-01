import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GameRound from '../../components/Games/GameRound';
import GameBalance from '../../components/Games/GameBalance';
import "../../assets/styles/Games/GamePage.css";
import Chart from "../../components/Charts/Chart";
import CoinChart from '../../components/Coin/CoinChart';
import Pagination from '../../components/UserCoin/Pagination';
import useCoinData from '../../hooks/Coin/useCoinListData';
import GameCoinSearchBar from '../../components/Coin/GameCoinSearchBar';
import CoinDetail from '../../components/Coin/CoinDetail'

const GamePage = () => {
  const { encryptedGameId, userId } = useParams();
  const { coins, currentPage, totalPages, setCurrentPage, handleSort, sortConfig, handleSearch } = useCoinData();

  const [selectedSymbol, setSelectedSymbol] = useState('BTC');

  const handleSelectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="game-page">
      <div className="game-page__container">
        <div className="game-page__coin-list">
        <div className="container">
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
          <GameRound encryptedGameId={encryptedGameId} />
        </div>
        <div className="game-page__order">
          <div className="game-page__order-balance">
            <GameBalance userId={userId} />
          </div>
          <div className="game-page__order-buttons">
            <button className="order-button">A</button>
            <button className="order-button">B</button>
          </div>
        </div>
        <div className="game-page__orders">
          <h2>주문 입력</h2>
          {/* 주문 입력 컴포넌트 삽입 */}
        </div>
        <div className="game-page__chat">
          <h2>실시간 채팅</h2>
          {/* 실시간 채팅 컴포넌트 삽입 */}
        </div>
      </div>
    </div>
  );
}

export default GamePage;