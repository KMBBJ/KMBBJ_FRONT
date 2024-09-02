import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import "../../assets/styles/Games/GameResult.css";

function GameResult() {
  const { encryptedGameId } = useParams();
  const [gameResults, setGameResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useTestData, setUseTestData] = useState(false);

  const fetchGameResults = useCallback(async () => {
    if (!encryptedGameId) {
      setError("Game ID is missing");
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/games/${encryptedGameId}/results`);
      if (response.data.status === "OK" && response.data.data.length > 0) {
        setGameResults(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to load game results");
      }
    } catch (error) {
      console.error("Failed to fetch game results:", error);
      setError(error.message || "Failed to load game results");
    } finally {
      setLoading(false);
    }
  }, [encryptedGameId]);

  useEffect(() => {
    if (useTestData) {
      const dummyData = getDummyData();
      setGameResults(dummyData);
      setLoading(false);
      setError(null);
    } else {
      fetchGameResults();
    }
  }, [useTestData, fetchGameResults]);

  const getDummyData = () => {
    return [
      { username: "박성원", userRank: 1, totalProfit: 10000000, totalLoss: 0 },
      { username: "정재영", userRank: 2, totalProfit: 5000000, totalLoss: 1000000 },
      { username: "박석원", userRank: 3, totalProfit: 3000000, totalLoss: 500000 },
      { username: "김강현", userRank: 4, totalProfit: 1000000, totalLoss: 2000000 },
      { username: "이민수", userRank: 5, totalProfit: 500000, totalLoss: 3000000 },
      { username: "최영희", userRank: 6, totalProfit: 200000, totalLoss: 3500000 },
      { username: "정소영", userRank: 7, totalProfit: 100000, totalLoss: 4000000 },
    ];
  };

  const toggleTestData = () => {
    setUseTestData(!useTestData);
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(Math.abs(value));
  };

  const getResultText = (profit, loss) => {
    const netResult = profit - loss;
    if (netResult > 0) {
      return `총 수익: ${formatMoney(netResult)}`;
    } else if (netResult < 0) {
      return `총 손실: ${formatMoney(-netResult)}`;
    }
    return "손익 없음";
  };

  const getCardColor = (rank) => {
    switch(rank) {
      case 1: return "gold";
      case 2: return "silver";
      case 3: return "bronze";
      default: return "default";
    }
  };

  if (loading) return <p>게임 결과를 불러오는 중...</p>;
  if (error && !useTestData) return (
    <div>
      <p>오류: {error}</p>
      <button onClick={toggleTestData}>테스트 데이터 사용</button>
    </div>
  );
  if (gameResults.length === 0 && !useTestData) return (
    <div>
      <p>게임 결과가 없습니다.</p>
      <button onClick={toggleTestData}>테스트 데이터 사용</button>
    </div>
  );

  return (
    <div className="game-result">
    <h2>게임 최종 결과</h2>
    <button onClick={toggleTestData}>
      {useTestData ? "실제 데이터 사용" : "테스트 데이터 사용"}
    </button>
    <div className="top-three">
      {gameResults.slice(0, 3).map((result, index) => (
        <div key={index} className={`result-card ${getCardColor(result.userRank)}`}>
          <div className="rank">{result.userRank}위</div>
          <div className="user-info">
            <h3>{result.username}</h3>
            <p>{getResultText(result.totalProfit, result.totalLoss)}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="other-ranks">
      <h3>기타 순위</h3>
      <ul>
        {gameResults.slice(3).map((result, index) => (
          <li key={index}>
            <span className="rank">{result.userRank}위</span>
            <span className="username">{result.username}</span>
            {getResultText(result.totalProfit, result.totalLoss)}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default GameResult;