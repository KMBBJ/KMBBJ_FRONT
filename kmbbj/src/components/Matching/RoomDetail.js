import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../assets/styles/Matching/RoomDetail.css";

function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [gameStarted, setGameStarted] = useState(false); // 게임 시작 상태

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await api.post(`/room/enter/${roomId}`);
        setRoom(response.data.data);
        const storedGameStartTime = localStorage.getItem("gameStartTime");
        if (storedGameStartTime && new Date(storedGameStartTime) > new Date()) {
          initializeCountdown(new Date(storedGameStartTime));
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.exception
        ) {
          // 백엔드에서 전달된 오류 메시지를 표시
          alert(`${error.response.data.exception.errorMessage}`);
        } else {
          // 기타 네트워크 또는 예상치 못한 오류 메시지 표시
          alert("방을 입장 중 오류가 발생했습니다.");
          window.location.href = `/matching/list`;
        }
        console.error("Failed to enter room:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const initializeGameStarted = () => {
    const storedGameStarted = localStorage.getItem("gameStarted");
    if (storedGameStarted) {
      setGameStarted(storedGameStarted === "true");
    }
  };

  useEffect(() => {
    initializeGameStarted();
    checkGameStartTime();
  }, [roomId]);

  const checkGameStartTime = () => {
    const storedGameStartTime = localStorage.getItem("gameStartTime");
    if (storedGameStartTime) {
      const gameStartTime = new Date(storedGameStartTime);
      if (gameStartTime > new Date()) {
        initializeCountdown(gameStartTime);
      } else {
        localStorage.removeItem("gameStartTime"); // 시간이 지났으면 정보 삭제
      }
    }
  };

  const initializeCountdown = (gameStartTime) => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = gameStartTime - now;

      if (difference > 0) {
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown(`${minutes}분 ${seconds}초 남음`);
      } else {
        setCountdown("게임이 시작되었습니다.");
        clearInterval(timer);
        localStorage.removeItem("gameStartTime"); // 게임 시작 후 카운트다운 삭제
        localStorage.removeItem("gameStarted");
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!room) {
    return <div>로딩 중...</div>;
  }

  const handleLeaveRoom = async () => {
    try {
      const response = await api.post(`/room/quit/${roomId}`);
      if (response.data.status === "OK") {
        navigate("/matching/list");
      } else {
        console.error("Failed to leave room");
        setError("Failed to leave room");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.exception
      ) {
        // 백엔드에서 전달된 오류 메시지를 표시
        alert(`${error.response.data.exception.errorMessage}`);
      } else {
        // 기타 네트워크 또는 예상치 못한 오류 메시지 표시
        alert("방을 나가던 중 오류가 발생했습니다.");
      }
      console.error("Failed to leave room:", error);
    }
  };

  const handleStartGame = async () => {
    try {
      const response = await api.post(`/room/start/${roomId}`);
      if (response.data.status === "OK" && response.data.data !== 0) {
        setGameStarted(true);
        localStorage.setItem("gameStarted", "true");
        console.log("Game started successfully");
        const currentTime = moment().format("HH:mm");
        const gameStartTime = new Date(Date.now() + response.data.data * 60000);
        localStorage.setItem("gameStartTime", gameStartTime);
        initializeCountdown(gameStartTime);
        alert(
          `현재 시간: ${currentTime}을 기준으로 ${response.data.data}분 뒤에 게임이 시작됩니다.`
        );
      } else {
        console.error("Failed to start game");
        setError("Failed to start game");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.exception
      ) {
        // 백엔드에서 전달된 오류 메시지를 표시
        alert(`${error.response.data.exception.errorMessage}`);
      } else {
        // 기타 네트워크 또는 예상치 못한 오류 메시지 표시
        alert("게임을 시작하던 중 오류가 발생했습니다.");
      }
      console.error("Failed to start game:", error);
    }
  };

  const formatMoney = (money) => {
    if (money >= 100000000) {
      const billion = Math.floor(money / 100000000);
      const thousand = money % 100000000;
      const thousand1 = thousand / 10000;
      return thousand === 0 ? `${billion}억` : `${billion}억 ${thousand1}만원`;
    }
    const totalAsset = money / 10000;
    return `${totalAsset}만원`;
  };

  const formatStartSeedMoney = (startSeedMoney) => {
    let seedMoneyValue = "";
    switch (startSeedMoney) {
      case "THREE_MILLION":
        seedMoneyValue = "300만";
        break;
      case "FIVE_MILLION":
        seedMoneyValue = "500만";
        break;
      case "SEVEN_MILLION":
        seedMoneyValue = "700만";
        break;
      case "TEN_MILLION":
        seedMoneyValue = "1000만";
        break;
      case "FIFTEEN_MILLION":
        seedMoneyValue = "1500만";
        break;
      case "TWENTY_MILLION":
        seedMoneyValue = "2000만";
        break;
      case "THIRTY_MILLION":
        seedMoneyValue = "3000만";
        break;
      default:
        seedMoneyValue = "??";
        return;
    }
    return seedMoneyValue;
  };

  return (
    <div className="room-detail-container">
      <div className="room-header">
        <div className="room-title">
          <h2>{room.roomTitle}</h2>
        </div>
        <div className="room-stats">
          {gameStarted && <div>매칭 시작: {countdown}</div>}
          <p>참가인원: {room.userCount}/10</p>
          <p>시드 머니: {formatStartSeedMoney(room.startSeedMoney)}</p>
          <p>딜레이: {room.delay}분</p>
          <p>라운드: {room.end}</p>
          <p>평균 자산: {formatMoney(room.averageAsset)}</p>
        </div>
        <button className="leave-button" onClick={handleLeaveRoom}>
          방 나가기
        </button>
      </div>

      <div className="user-list">
        {room.roomUser.map((user, index) => (
          <div key={index} className="user-item">
            <span></span>
            <span>{user.userName}</span>
            <span>{user.manager ? "방장" : ""}</span>
            <span>{formatMoney(user.userAsset)}</span>
          </div>
        ))}
      </div>

      <div className="user-actions">
        <button className="start-button" onClick={handleStartGame}>
          게임 시작
        </button>
      </div>

      <div className="chat-room">
        <h3>채팅방</h3>
        <div className="chat-messages">
          {/* 여기에 채팅 메시지들이 표시됩니다 */}
          <p>채팅 메시지1</p>
          <p>채팅 메시지2</p>
        </div>
        <input type="text" placeholder="메시지를 입력하세요..." />
        <button className="send-button">보내기</button>
      </div>
    </div>
  );
}

export default RoomDetail;
