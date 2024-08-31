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
      { username: "홍길동", userRank: 1, totalProfit: 10000000, totalLoss: 0 },
      { username: "김철수", userRank: 2, totalProfit: 5000000, totalLoss: 1000000 },
      { username: "이영희", userRank: 3, totalProfit: 3000000, totalLoss: 500000 },
      { username: "박지수", userRank: 4, totalProfit: 1000000, totalLoss: 2000000 },
      { username: "최민호", userRank: 5, totalProfit: 500000, totalLoss: 3000000 },
    ];
  };

  const toggleTestData = () => {
    setUseTestData(!useTestData);
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
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
      <table className="result-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>사용자 이름</th> {/* 사용자 이름만 표시 */}
            <th>총 수익</th>
            <th>총 손실</th>
            <th>최종 잔액</th>
          </tr>
        </thead>
        <tbody>
          {gameResults.map((result, index) => (
            <tr key={index}>
              <td>{result.userRank}</td>
              <td>{result.username}</td> 
              <td className="profit">{formatMoney(result.totalProfit)}</td>
              <td className="loss">{formatMoney(result.totalLoss)}</td>
              <td>{formatMoney(result.totalProfit - result.totalLoss)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameResult;
