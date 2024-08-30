import React from 'react';
import { useParams } from 'react-router-dom';
import GameRound from '../../components/Games/GameRound'; 
import GameBalance from '../../components/Games/GameBalance'; 

const GamePage = () => {
  const { encryptedGameId, userId } = useParams();

  return (
    <div className="game-page">
      <h1>게임 정보</h1>
      <div className="game-status-section">
        <h2>게임 상태</h2>
        <GameRound encryptedGameId={encryptedGameId} />
      </div>
      <div className="game-balance-section">
        <h2>게임 잔액</h2>
        <GameBalance userId={userId} />
      </div>
    </div>
  );
};

export default GamePage;