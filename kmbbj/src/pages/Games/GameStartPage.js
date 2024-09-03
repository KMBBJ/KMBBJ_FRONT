import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api'; // API 호출을 위한 설정 파일

const GameStartPage = () => {
  const navigate = useNavigate();
  const { data } = useParams(); // URL에서 data 파라미터 받아오기
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startGame = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Received data:', data); // 받은 data 콘솔에 출력

        // API 호출로 암호화된 게임 ID 가져오기
        const response = await api.post('/games/start', { data });
        console.log('API response:', response.data); // API 응답 콘솔에 출력

        const { encryptedGameId } = response.data;

        if (!encryptedGameId) {
          throw new Error('게임 ID를 받지 못했습니다.');
        }

        // 받은 ID로 리다이렉트
        navigate(`/games/status/${encryptedGameId}`);
      } catch (error) {
        console.error('게임 시작 중 오류 발생:', error);
        setError(error.message || '게임을 시작하는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    startGame();
  }, [data, navigate]);

  if (loading) {
    return <div>게임을 준비하는 중입니다. 잠시만 기다려주세요...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return null; // 정상적인 경우 리다이렉트되므로 여기까지 오지 않습니다.
};

export default GameStartPage;
