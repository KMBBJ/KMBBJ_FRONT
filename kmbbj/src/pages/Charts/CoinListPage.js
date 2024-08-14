import React from 'react';
import CoinTable from '../../components/Charts/CoinTable';
import Pagination from '../../components/Charts/Pagination';
import useCoinData from '../../hooks/Coin/useCoinData';

const CoinListPage = () => {
    const { coins, currentPage, totalPages, setCurrentPage, handleSort, sortConfig } = useCoinData();

    return (
        <div className={"container"}>
            <CoinTable coins={coins} onSort={handleSort} sortConfig={sortConfig} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default CoinListPage;