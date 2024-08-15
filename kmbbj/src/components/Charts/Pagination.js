import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <ul className={"pagination"}>
            <li>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
                    Previous
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
                    Next
                </button>
            </li>
        </ul>
    );
};

export default Pagination;