import React from 'react';
import "../../assets/styles/Charts/SearchBar.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <ul className="pagination">
            <li>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
                    ⬅
                </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                    <button onClick={() => onPageChange(i)}>
                        {i + 1}
                    </button>
                </li>
            ))}
            <li>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                    ➡
                </button>
            </li>
        </ul>
    );
};

export default Pagination;