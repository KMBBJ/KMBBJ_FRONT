import React from "react";
import CoinAdd from "../../components/CoinManage/CoinAdd";
import SearchBar from "../../components/UserCoin/SearchBar";
import CoinTable from "../../components/CoinManage/CoinTable";
import Pagination from "../../components/UserCoin/Pagination";
import useCoinData from "../../hooks/Coin/useCoinData";

const CoinManagementPage = () => {
    const { coins, currentPage, totalPages, setCurrentPage, handleSort, sortConfig, handleSearch } = useCoinData();

    return (
        <div>
            <CoinAdd />
            <div className="container">
            <SearchBar onSearch={handleSearch} />
            <CoinTable coins={coins} onSort={handleSort} sortConfig={sortConfig} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default CoinManagementPage;