import React from 'react';
import { useParams } from 'react-router-dom';
import GameRound from '../../components/Games/GameRound';
import GameBalance from '../../components/Games/GameBalance';
import "../../assets/styles/Games/GamePage.css";

const GamePage = () => {
  const { encryptedGameId, userId } = useParams();

  return (
    <div className="game-page">
      <div className="game-page__container">
        <div className="game-page__coin-list">
          <h2>시장 목록</h2>
          {/* 시장 목록 컴포넌트 삽입 */}
        </div>
        <div className="game-page__chart">
          <h2>차트</h2>
          {/* 차트 컴포넌트 삽입 */}
        </div>
        <div className="game-page__round">
          <GameRound encryptedGameId={encryptedGameId} />
        </div>
        <div className="game-page__order">
          <GameBalance userId={userId} />
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
};

export default GamePage;