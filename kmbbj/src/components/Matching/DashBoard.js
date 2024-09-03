import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/api";
import SearchAndSort from "./SearchAndSort";
import RoomList from "./RoomList";
import Pagination from "./Pagination";
import "../../assets/styles/Matching/RoomList.css";

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("roomId");
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = searchTerm ? "/room/searching" : "/room/list";
      const params = searchTerm
        ? {
            title: searchTerm,
            page: currentPage - 1,
          }
        : {
            isDeleted: false,
            isStarted: false,
            page: currentPage - 1,
            sortField,
            sortDirection: sortOrder,
          };
      const response = await api.post(endpoint, params);
      const { content, totalPages } = response.data.data;
      setRooms(content);
      setTotalPages(totalPages);
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
        searchTerm
          ? alert("검색 도중 오류가 발생했습니다.")
          : alert("방 목록을 불러오지 못했습니다.");
      }
      console.error("Failed to create room:", error);
    }
  }, [searchTerm, currentPage, sortField, sortOrder]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]); // useCallback에서 반환된 fetchRooms 함수를 의존성 배열에 포함시킵니다.

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSort = (order, field) => {
    setSortOrder(order);
    setSortField(field);
    setCurrentPage(1);
  };

  return (
    <div className="dashboard">
      {error && <p className="error">{error}</p>}
      <SearchAndSort onSearch={handleSearch} onSort={handleSort} />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <RoomList rooms={rooms} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Dashboard;
