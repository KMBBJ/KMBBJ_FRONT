import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import GameRanking from "../../components/Games/GameRanking";
import "../../assets/styles/Games/GameRound.css";

function GameRound() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMidRanking, setShowMidRanking] = useState(false);

  const checkGameOver = useCallback(async (gameStatus) => {
    if (gameStatus && gameStatus.results.length > 0) {
      const currentRound = gameStatus.results[0].roundNumber;
      const totalRounds = gameStatus.totalRounds;
      
      if (currentRound > totalRounds) {
        try {
          // 게임 종료 API 호출
          await api.post(`/games/${gameId}/end`);
          // GameOver 페이지로 이동
          navigate(`/gameOver/${gameId}`);
        } catch (error) {
          console.error("Failed to end game:", error);
          setError("Failed to end game");
        }
      }
    }
  }, [gameId, navigate]);

  const fetchGameStatus = useCallback(async (gameId) => {
    if (!gameId) {
      setError("Game ID is missing");
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/games/status/${gameId}`);
      const data = response.data.data;

      if (typeof data.durationMinutes === "number") {
        setGameStatus(data);
        await checkGameOver(data);
        
        const storedRemainingSeconds = localStorage.getItem(`remainingSeconds_${gameId}`);
        const storedTimestamp = localStorage.getItem(`timestamp_${gameId}`);
        
        if (storedRemainingSeconds && storedTimestamp) {
          const elapsedTime = (Date.now() - parseInt(storedTimestamp)) / 1000;
          const calculatedRemainingSeconds = Math.max(parseInt(storedRemainingSeconds) - elapsedTime, 0);
          setRemainingSeconds(Math.round(calculatedRemainingSeconds));
        } else {
          setRemainingSeconds(data.durationMinutes * 60);
          localStorage.setItem(`remainingSeconds_${gameId}`, (data.durationMinutes * 60).toString());
          localStorage.setItem(`timestamp_${gameId}`, Date.now().toString());
        }
      } else {
        setError("Invalid data received from server");
      }
    } catch (error) {
      console.error("Failed to fetch game status:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [checkGameOver]);

  const startNewRound = useCallback(async (gameId) => {
    try {
      const response = await api.post(`/rounds/${gameId}/end-newRound`);
      const data = response.data.data;

      if (typeof data.durationMinutes === "number") {
        setGameStatus((prevStatus) => {
          const newStatus = {
            ...prevStatus,
            ...data,
          };
          checkGameOver(newStatus);
          return newStatus;
        });
        setRemainingSeconds(data.durationMinutes * 60);
        localStorage.setItem(`remainingSeconds_${gameId}`, (data.durationMinutes * 60).toString());
        localStorage.setItem(`timestamp_${gameId}`, Date.now().toString());
      } else {
        setError("Invalid data received from server when starting a new round");
      }
    } catch (error) {
      console.error("Failed to start a new round:", error);
      setError("Failed to start a new round");
    }
  }, [checkGameOver]);

  useEffect(() => {
    const storedGameId = localStorage.getItem('encryptedGameId');
    
    if (gameId) {
      localStorage.setItem('gameId', gameId);
      fetchGameStatus(gameId);
    } else if (storedGameId) {
      navigate(`/games/status/${storedGameId}`);
    } else {
      setError("No game ID available");
    }

    const intervalId = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds > 1) {
          const gameId = localStorage.getItem('encryptedGameId');
          localStorage.setItem(`remainingSeconds_${gameId}`, (prevSeconds - 1).toString());
          localStorage.setItem(`timestamp_${gameId}`, Date.now().toString());
          return prevSeconds - 1;
        } else if (prevSeconds === 1) {
          const gameId = localStorage.getItem('encryptedGameId');
          startNewRound(gameId);
          return 0;
        } else {
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameId, fetchGameStatus, startNewRound, navigate]);

  useEffect(() => {
    if (gameStatus && gameStatus.results.length > 0) {
      const currentRound = gameStatus.results[0].roundNumber;
      const totalRounds = gameStatus.totalRounds;
      const midRound = Math.floor(totalRounds / 2);

      if (currentRound === midRound + 1) {
        setShowMidRanking(true);
      }
    }
  }, [gameStatus]);

  if (loading) return <p>Loading game status...</p>;
  if (error) return <p>Error loading game status: {error}</p>;
  if (!gameStatus) return <p>No data available.</p>;

  const totalSeconds = gameStatus.durationMinutes * 60;
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const progressPercentage = (remainingSeconds / totalSeconds) * 100;

  const isLastHour = remainingSeconds <= 3600;

  // 최근 4개의 라운드 데이터만 사용
  const recentRounds = gameStatus.results.slice(-4);

  return (
    <div className="game-status">
      <h2>실시간 게임 현황</h2>
      <div className="game-info">
        <div className="game-info-item">
          <span>게임상태 : </span>
          <span className={`game-status-value ${gameStatus.status === 'ACTIVE' ? 'active' : ''}`}>
            {gameStatus.status === 'ACTIVE' ? '진행 중' : gameStatus.status}
          </span>
        </div>
        <div className="game-info-item">
          <span>현재 라운드 : </span>
          <span className="current-round">{gameStatus.results[0]?.roundNumber || '-'}</span>
        </div>
        <div className="game-info-item">
          <span>남은 시간 : </span>
          <span className={`remaining-time ${isLastHour ? 'last-hour' : ''}`}>
            {hours}시간 {minutes < 10 ? "0" : ""}{minutes}분 {seconds < 10 ? "0" : ""}{seconds}초
          </span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
          <div className="progress-bar-animation"></div>
        </div>
      </div>

      <table className="game-results">
        <thead>
          <tr>
            <th>라운드</th>
            <th>가장 많이 매수된 코인</th>
            <th>가장 큰 수익된 코인</th>
            <th>가장 큰 손실된 코인</th>
          </tr>
        </thead>
        <tbody>
          {recentRounds.map((result) => (
            <tr key={result.roundId}>
              <td>라운드 {result.roundNumber}</td>
              <td>
                {result.topBuyCoin !== '-' && result.topBuyPercent !== '-' 
                  ? `${result.topBuyCoin} (${result.topBuyPercent})` 
                  : '-'}
              </td>
              <td>
                {result.topProfitCoin !== '-' && result.topProfitPercent !== '-' 
                  ? `${result.topProfitCoin} (${result.topProfitPercent})` 
                  : '-'}
              </td>
              <td>
                {result.topLossCoin !== '-' && result.topLossPercent !== '-' 
                  ? `${result.topLossCoin} (${result.topLossPercent})` 
                  : '-'}
              </td>
            </tr>
          ))}
          {Array(Math.max(0, 4 - recentRounds.length)).fill().map((_, index) => (
            <tr key={`empty-${index}`}>
              <td>라운드 -</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showMidRanking && (
        <div className="mid-ranking-popup">
          <div className="popup-content">
            <h3>중간 순위</h3>
            <GameRanking encryptedGameId={gameId} />
            <button onClick={() => setShowMidRanking(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameRound;