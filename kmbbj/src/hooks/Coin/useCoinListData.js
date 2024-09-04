import { useState, useEffect, useCallback } from 'react';
import { getCoinListPage } from '../../services/Coin/CoinService';

export const useCoinData = () => {
    const [coins, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'coinName', direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');

    function formatToMillion(value) {
        if (value >= 1e6) {
            const millionValue = (value / 1e6).toFixed(1);
            return `${parseFloat(millionValue).toLocaleString()}백만`; // 백만 단위로 반환하고 세 자리마다 쉼표 추가
        }
        return value.toLocaleString(); // 십만 미만인 경우 그대로 반환하고 세 자리마다 쉼표 추가
    }

    function addCommas(value) {
        if (value >= 1000) {
            return `${parseFloat(value.toFixed(1)).toLocaleString()}`;
        } else if(value % 1 === 0) {
            return value;
        } else
        return value.toFixed(3);
    }


    const loadCoinList = useCallback(async (page, sortConfig, searchQuery) => {
        try {
            const response = await getCoinListPage(page, 13, sortConfig.key, sortConfig.direction, searchQuery);
            
            if (response && response.data && response.data.content) {
                const formattedCoins = response.data.content.map(coin => ({
                    coinId: coin.coin.coinId,
                    symbol: coin.coin.symbol,
                    coinName: coin.coin.coinName,
                    price: addCommas(coin.coin24hDetail.price),
                    priceChange: addCommas(coin.coin24hDetail.priceChange),
                    priceChangePercent: coin.coin24hDetail.priceChangePercent,
                    volume: formatToMillion(coin.coin24hDetail.volume),
                    totalValue: formatToMillion(coin.coin24hDetail.totalValue)
                }));
                setCoins(formattedCoins);
                setTotalPages(response.data.totalPages);
            } else {
                console.error('응답 데이터가 예상한 형식이 아닙니다.', response);
            }
        } catch (error) {
            console.error('코인 데이터를 로드하는 중 오류가 발생했습니다:', error);
        }
    }, []);

    useEffect(() => {
        loadCoinList(currentPage, sortConfig, searchQuery);
    }, [currentPage, sortConfig, searchQuery, loadCoinList]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(0);  // 정렬이 변경될 때 첫 페이지로 돌아가도록 설정
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(0);  // 검색어가 변경될 때 첫 페이지로 돌아가도록 설정
    };



    return {
        coins,
        currentPage,
        totalPages,
        setCurrentPage,
        handleSort,
        sortConfig,
        handleSearch
    };
};

export default useCoinData;