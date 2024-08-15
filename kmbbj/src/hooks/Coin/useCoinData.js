import { useState, useEffect } from 'react';
import { getCoinList } from '../../services/Charts/CoinService';

export const useCoinData = () => {
    const [coins, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'coinName', direction: 'asc' });

    useEffect(() => {
        loadCoinList(currentPage);
    }, [currentPage]);

    const loadCoinList = async (page) => {
        try {
            const response = await getCoinList(page, 10);
            
            // 응답 데이터가 존재하는지 확인
            if (response && response.data && response.data.content) {
                const formattedCoins = response.data.content.map(coin => ({
                    symbol: coin.coin.symbol,
                    coinName: coin.coin.coinName,
                    price: coin.coin24hDetail.price,
                    priceChange: coin.coin24hDetail.priceChangePercent,
                    volume: coin.coin24hDetail.volume,
                    highPrice: coin.coin24hDetail.highPrice,
                    lowPrice: coin.coin24hDetail.lowPrice,
                }));
                setCoins(sortCoins(formattedCoins, sortConfig.key, sortConfig.direction));
                setTotalPages(response.data.totalPages);
            } else {
                console.error('응답 데이터가 예상한 형식이 아닙니다.', response);
            }
        } catch (error) {
            console.error('코인 데이터를 로드하는 중 오류가 발생했습니다:', error);
        }
    };

    const sortCoins = (coins, key, direction) => {
        return [...coins].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCoins(sortCoins(coins, key, direction));
    };

    return {
        coins,
        currentPage,
        totalPages,
        setCurrentPage,
        handleSort,
        sortConfig,
    };
};

export default useCoinData;