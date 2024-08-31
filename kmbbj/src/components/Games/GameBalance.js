import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../api/api";
import "../../assets/styles/Games/GameBalance.css";

const GameBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('gameBalanceUserId');
    if (userId && userId !== storedUserId) {
      localStorage.setItem('gameBalanceUserId', userId);
    } else if (!userId && storedUserId) {
      navigate(`/games/balance/${storedUserId}`);
      return;
    }

    const fetchBalance = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/games/balance/${userId || storedUserId}`);
        console.log('API Response:', response.data);
        setBalance(response.data.data);
      } catch (err) {
        console.error('Error fetching game balance:', err);
        setError('게임 잔액 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (userId || storedUserId) {
      fetchBalance();
    }
  }, [userId, navigate]);

  if (loading) return <div className="game-balance-card">로딩 중...</div>;
  if (error) return <div className="game-balance-card error-message">{error}</div>;
  if (!balance) return <div className="game-balance-card">데이터가 없습니다.</div>;

  const calculateAverageRate = () => {
    if (balance.initialBalance === 0) return 0;
    const rate = ((balance.currentBalance - balance.initialBalance) / balance.initialBalance) * 100;
    return rate.toFixed(2);
  };

  const averageRate = calculateAverageRate();
  const profitLoss = balance.currentBalance - balance.initialBalance;
  const isPositive = profitLoss > 0;

  return (
    <div className="game-balance-card">
      <h2 className="card-title">총 평가 자산</h2>
      <div className="total-balance">{balance.currentBalance.toLocaleString()} 원</div>
      <div className={`average-rate ${isPositive ? 'profit' : 'loss'}`}>
        {Math.abs(profitLoss).toLocaleString()}원 
        {isPositive ? '▲' : '▼'} ( {averageRate}% )
      </div>
      
      <div className="balance-grid">
        <div className="balance-column">
          <div className="balance-label">초기자산</div>
          <div className="balance-value">{balance.initialBalance.toLocaleString()}원</div>
        </div>
        <div className="balance-column">
          <div className="balance-label">보유현금</div>
          <div className="balance-value">{balance.currentBalance.toLocaleString()}원</div>
        </div>
        <div className="balance-column">
          <div className="balance-label">코인명</div>
          <div className="balance-value">{balance.symbol || '-'}</div>
        </div>
      </div>
      
      <div className="profit-loss-grid">
        <div className="profit-loss-column">
          <div className="profit-loss-label">평균 수익률</div>
          <div className={`profit-loss-value ${isPositive ? 'profit' : 'loss'}`}>{averageRate}%</div>
        </div>
        <div className="profit-loss-column">
          <div className="profit-loss-label">평가 수익</div>
          <div className="profit-value">{balance.profitAmount.toLocaleString()}원</div>
        </div>
        <div className="profit-loss-column">
          <div className="profit-loss-label">평가 손실</div>
          <div className="loss-value">{balance.lossAmount.toLocaleString()}원</div>
        </div>
      </div>
      
      <div className="order-amount">
        <span>주문 금액 (KRW)</span>
        <span>{balance.orderAmount.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default GameBalance;