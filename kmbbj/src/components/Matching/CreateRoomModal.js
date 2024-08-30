import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../assets/styles/Matching/CreateRoomModal.css";

const CreateRoomModal = ({ onClose, onCreateRoom }) => {
  const [title, setTitle] = useState("");
  const [startSeedMoney, setStartSeedMoney] = useState("");
  const [end, setEnd] = useState("");
  const [delay, setDelay] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleCreateRoom = async () => {
    const createDate = new Date().toISOString(); // 현재 시간을 ISO 형식으로 변환
    const payload = {
      title,
      startSeedMoney: parseInt(startSeedMoney, 10),
      end: parseInt(end, 10),
      createDate,
      isDeleted: false,
      isStarted: false,
      delay: parseInt(delay, 10),
    };

    try {
      const response = await api.post("/room/create", payload);
      if (response.data.status === "OK") {
        alert(`${response.data.message}`); // 성공 메시지 알림
        onClose(); // 모달 닫기
        const { roomId } = response.data.data;
        navigate(`/matching/enter/${roomId}`); // 생성된 방의 상세 페이지로 이동
      } else {
        alert("방 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to create room:", error);
      alert("방 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>방 생성</h2>
        <div className="form-group">
          <label>방 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>초기 자산</label>
          <input
            type="number"
            value={startSeedMoney}
            onChange={(e) => setStartSeedMoney(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>라운드 수</label>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>딜레이</label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            required
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleCreateRoom} className="create-room-button">
            생성하기
          </button>
          <button onClick={onClose} className="cancel-button">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
