import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../assets/styles/Matching/RoomDetail.css";

function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await api.post(`/room/enter/${roomId}`);
        setRoom(response.data.data);
      } catch (err) {
        console.error("Failed to fetch room data:", err);
        setError("Failed to load room data");
      }
    };

    fetchRoomData();
  }, [roomId]);

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
    } catch (err) {
      console.error("Failed to leave room:", err);
      setError("Failed to leave room");
    }
  };

  const handleStartGame = async () => {
    try {
      const response = await api.post(`/room/start/${roomId}`);
      if (response.data.status === "OK") {
        console.log("Game started successfully");
      } else {
        console.error("Failed to start game");
        setError("Failed to start game");
      }
    } catch (err) {
      console.error("Failed to start game:", err);
      setError("Failed to start game");
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

  return (
    <div className="room-detail-container">
      <div className="room-header">
        <div className="room-title">
          <h2>{room.roomTitle}</h2>
        </div>
        <div className="room-stats">
          <p>참가인원: {room.userCount}/10</p>
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
