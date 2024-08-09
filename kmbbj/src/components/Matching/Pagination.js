import React from "react";
import "../../assets/styles/Matching/Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          disabled={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
          className="page-button"
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
