import React, { useState } from "react";
import "../../assets/styles/Matching/RoomList.css";

function SearchAndSort({ onSearch, onSort }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("roomId");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSort(newOrder, sortField);
  };

  const handleSortFieldChange = (e) => {
    const newField = e.target.value;
    setSortField(newField);
    onSort(sortOrder, newField);
  };

  return (
    <div className="search-and-sort-container">
      <input
        type="text"
        placeholder="방 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="search-div"
      />
      <button onClick={handleSearch} className="search-button">
        검색
      </button>
      <div className="sort-option">
        <button onClick={handleSort} className="asc-button">
          {sortOrder === "asc" ? "오름차순" : "내림차순"}
        </button>
        <select
          value={sortField}
          onChange={handleSortFieldChange}
          className="dropdown"
        >
          <option value="userCount">참가인원</option>
          <option value="startSeedMoney">초기자산</option>
          <option value="end">라운드</option>
          <option value="createDate">생성시간</option>
        </select>
      </div>
    </div>
  );
}

export default SearchAndSort;
