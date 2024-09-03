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
    const createDate = new Date().toISOString();
    let seedMoneyValue = "";

    switch (startSeedMoney) {
      case "1000만":
        seedMoneyValue = "TEN_MILLION";
        break;
      case "2000만":
        seedMoneyValue = "TWENTY_MILLION";
        break;
      case "3000만":
        seedMoneyValue = "THIRTY_MILLION";
        break;
      default:
        alert("시드머니를 선택하세요.");
        return;
    }

    const payload = {
      title,
      startSeedMoney: seedMoneyValue,
      end: parseInt(end, 10),
      createDate,
      isDeleted: false,
      isStarted: false,
      delay: parseInt(delay, 10),
    };

    if (end <= 0 || delay <= 0) {
      alert("라운드 수와 딜레이는 0보다 커야 합니다.");
      return;
    }

    try {
      const response = await api.post("/room/create", payload);
      if (response.status === 200) {
        alert(`${response.data.message}`);
        onClose(); // 모달 닫기 함수 또는 다른 UI 처리
        const { roomId } = response.data.data;
        navigate(`/matching/enter/${roomId}`);
      } else {
        alert("방 생성에 실패했습니다: " + response.data.message);
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
        alert("방 생성 중 오류가 발생했습니다.");
      }
      console.error("Failed to create room:", error);
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
          <select
            value={startSeedMoney}
            onChange={(e) => setStartSeedMoney(e.target.value)}
            required
          >
            <option value="">선택하세요</option>
            <option value="1000만">1000만</option>
            <option value="2000만">2000만</option>
            <option value="3000만">3000만</option>
          </select>
        </div>
        <div className="form-group">
          <label>라운드 수</label>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>딜레이</label>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            min="1"
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
