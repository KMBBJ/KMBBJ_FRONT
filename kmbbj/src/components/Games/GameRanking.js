import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import "../../assets/styles/Games/GameRanking.css";

function GameRanking() {
  const { encryptedGameId } = useParams();
  const [allRankings, setAllRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useTestData, setUseTestData] = useState(false);

  const fetchRankings = useCallback(async (gameId) => {
    if (!gameId) {
      setError("Game ID is missing");
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/games/${gameId}/rankings`);
      const data = response.data.data;

      if (Array.isArray(data)) {
        setAllRankings(data);
      } else {
        setError("Invalid data received from server");
      }
    } catch (error) {
      console.error("Failed to fetch rankings:", error);
      setError("Failed to load rankings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!useTestData && encryptedGameId) {
      fetchRankings(encryptedGameId);
    }
  }, [encryptedGameId, fetchRankings, useTestData]);

  // 더미 데이터 
  const addTestData = () => {
    const testData = [
      [
        { rank: 1, user: "User1", profit: "1000", loss: "0" },
        { rank: 2, user: "User2", profit: "500", loss: "0" },
        { rank: 3, user: "User3", profit: "0", loss: "200" },
      ],
      [
        { rank: 1, user: "User2", profit: "1500", loss: "0" },
        { rank: 2, user: "User1", profit: "1200", loss: "0" },
        { rank: 3, user: "User3", profit: "100", loss: "0" },
      ],
    ];
    setAllRankings(testData);
    setLoading(false);
    setError(null);
  };

  const toggleTestData = () => {
    setUseTestData(!useTestData);
    if (!useTestData) {
      addTestData();
    } else {
      setAllRankings([]);
      setLoading(true);
      if (encryptedGameId) {
        fetchRankings(encryptedGameId);
      }
    }
  };

  return (
    <div className="game-ranking">
      <h2>게임 순위</h2>
      <button onClick={toggleTestData}>
        {useTestData ? "실제 데이터 사용" : "테스트 데이터 사용"}
      </button>
      {loading ? (
        <p>순위 정보를 불러오는 중입니다...</p>
      ) : error ? (
        <p>오류: {error}</p>
      ) : allRankings.length === 0 ? (
        <p>현재 순위 정보가 없습니다. 게임이 진행되면 여기에 순위가 표시됩니다.</p>
      ) : (
        allRankings.map((roundRankings, roundIndex) => (
          <div key={roundIndex} className="round-ranking">
            <h3>라운드 {roundIndex + 1}</h3>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>닉네임</th>
                  <th>수익</th>
                  <th>손실</th>
                </tr>
              </thead>
              <tbody>
                {roundRankings.map((ranking) => (
                  <tr key={ranking.user}>
                    <td>{ranking.rank}</td>
                    <td>{ranking.user}</td>
                    <td className="profit">{ranking.profit}</td>
                    <td className="loss">{ranking.loss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default GameRanking;