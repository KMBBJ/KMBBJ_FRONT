import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../assets/styles/Games/GameOver.css";
import GameBalance from '../../components/Games/GameBalance';
import GameResult from '../../components/Games/GameResult';
import api from '../../api/api'; // API 호출을 위한 설정 파일

const GameOver = () => {
    const { encryptedGameId, userId } = useParams();
    const [roundResults, setRoundResults] = useState([]);

    useEffect(() => {
        const fetchRoundResults = async () => {
            try {
                const response = await api.get(`/rounds/${encryptedGameId}/round-results`);
                setRoundResults(response.data.data);
            } catch (error) {
                console.error("Failed to fetch round results:", error);
            }
        };

        fetchRoundResults();
    }, [encryptedGameId]);

    return (
        <div className="container">
            {/* 1번: 게임 결과 */}
            <div className="top-row">
                <h1>게임 결과</h1>
            </div>

            <div className="row">
                {/* 2번: 순위 */}
                <div className="column left-panel">
                    <h2>순위</h2>
                    <GameResult encryptedGameId={encryptedGameId} />
                </div>

                <div className="column right-panel">
                    <div className="combined-top-right">
                        <div className="sub-panel">
                            <h2>게임 현황</h2>
                            <GameBalance userId={userId} />
                        </div>
                        <div className="sub-panel">
                            <h2>채팅방</h2>
                            {/* 채팅방 데이터를 여기에 삽입 */}
                        </div>
                    </div>

                    <div className="bottom-panel">
                        <div className="bottom-sub-panel">
                            <h3>최다 매수 금액 코인</h3>
                            {roundResults.map((result) => (
                                <p key={result.roundId}>
                                    {result.roundNumber} 라운드 {result.topBuyCoin} ({result.topBuyPercent}%)
                                </p>
                            ))}
                        </div>
                        <div className="bottom-sub-panel">
                            <h3>최고 수익률 코인</h3>
                            {roundResults.map((result) => (
                                <p key={result.roundId}>
                                    {result.roundNumber} 라운드 {result.topProfitCoin} ({result.topProfitPercent}%)
                                </p>
                            ))}
                        </div>
                        <div className="bottom-sub-panel">
                            <h3>최고 손실률 코인</h3>
                            {roundResults.map((result) => (
                                <p key={result.roundId}>
                                    {result.roundNumber} 라운드 {result.topLossCoin} ({result.topLossPercent}%)
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
