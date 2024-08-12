import React from "react";
import { Link } from "react-router-dom";
import moment from "moment"; // 날짜 포매팅을 위해 moment.js 사용
import "../../assets/styles/Matching/RoomList.css";

function RoomList({ rooms }) {
  // 시드머니 값을 "만원" 또는 "억" 단위로 포맷하는 함수
  const formatSeedMoney = (money) => {
    if (money >= 10000) {
      const billion = Math.floor(money / 10000);
      const thousand = money % 10000;
      return thousand === 0 ? `${billion}억` : `${billion}억 ${thousand}만원`;
    }
    return `${money}만원`;
  };

  return (
    <table className="room-table">
      <thead>
        <tr>
          <th className="room-id">방 번호</th>
          <th className="room-title">제목</th>
          <th className="room-count">참가인원</th>
          <th className="room-start-seed">시드머니</th>
          <th className="room-end-round">라운드</th>
          <th className="room-create-date">생성일자</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.roomId} className="room-row-container">
            <td colSpan="6" className="room-cell">
              <Link to={`/matching/enter/${room.roomId}`} className="room-link">
                <div className="room-row">
                  <div>{room.roomId}</div>
                  <div>{room.title}</div>
                  <div>{room.userCount}/10</div>
                  <div>{formatSeedMoney(room.startSeedMoney)}</div>
                  <div>{room.end}라운드</div>
                  <div>
                    {moment(room.createDate).format("YYYY-MM-DD HH:mm")}
                  </div>
                </div>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RoomList;
