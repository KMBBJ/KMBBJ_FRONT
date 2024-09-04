import React from 'react';
import CoinTable from '../../components/UserCoin/CoinTable';
import Pagination from '../../components/UserCoin/Pagination';
import useCoinData from '../../hooks/Coin/useCoinData';
import SearchBar from '../../components/UserCoin/SearchBar';

const CoinListPage = () => {
    const { coins, currentPage, totalPages, setCurrentPage, handleSort, sortConfig, handleSearch } = useCoinData();

    return (
        <div className="coint-list-container">
            <SearchBar onSearch={handleSearch} />
            <CoinTable coins={coins} onSort={handleSort} sortConfig={sortConfig} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default CoinListPage;