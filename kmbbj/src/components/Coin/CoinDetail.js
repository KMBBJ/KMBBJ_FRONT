import React, { useState, useEffect } from 'react';
import { getCoinDetail } from '../../services/Coin/CoinService';
import "../../assets/styles/Charts/CoinDetail.css";

const CoinDetail = ( {symbol} ) => {
    const [coinData, setCoinData] = useState(null);

    function formatToMillion(value) {
        if (value >= 1e5) { // 십만 이상인 경우
            const millionValue = (value / 1e5).toFixed(2); // 소수점 2자리까지 표시
            return `${parseFloat(millionValue).toLocaleString()}M`; // M 단위로 반환하고 세 자리마다 쉼표 추가
        }
        return value.toLocaleString(); // 십만 미만인 경우 그대로 반환하고 세 자리마다 쉼표 추가
    }

    function addCommas(value) {
        if (value >= 1000) {
            return `${value.toLocaleString()}`;
        }
        return value;
    }

    useEffect(() => {
        const fetchCoinData = async () => {
        try {
            const response = await getCoinDetail(symbol);
            if (response && response.data) {
              const formattedCoin = response.data; // 첫 번째 코인 정보만 가져옴
            setCoinData({
                symbol: formattedCoin.coin.symbol,
                coinName: formattedCoin.coin.coinName,
                price: addCommas(formattedCoin.coin24hDetail.price),
                priceChange: formattedCoin.coin24hDetail.priceChange,
                priceChangePercent: formattedCoin.coin24hDetail.priceChangePercent,
                volume: formatToMillion(formattedCoin.coin24hDetail.volume),
                totalValue: formatToMillion(formattedCoin.coin24hDetail.totalValue)
            });
            } else {
                console.error('응답 데이터가 예상한 형식이 아닙니다.', response);
            }
        } catch (error) {
            console.error('코인 데이터를 로드하는 중 오류가 발생했습니다:', error);
        }
        };
    
        fetchCoinData();
    }, [symbol]);
    
    return (
        <div>
            {coinData && (
            <div className="coin-info">
                <span className="coin-name">{coinData.coinName} ({coinData.symbol}USDC)</span>
                <span className="coin-price" style={{ color: coinData.priceChange >= 0 ? 'palegreen' : 'salmon' }}>{coinData.price}</span>
                <span className="coin-price-change-percent" style={{ color: coinData.priceChange >= 0 ? 'palegreen' : 'salmon' }}> {coinData.priceChangePercent}%</span>
                <span className="coin-price-change" style={{ color: coinData.priceChange >= 0 ? 'palegreen' : 'salmon' }}>{coinData.priceChange}</span>
                <span className="coin-volume">거래량 {coinData.volume}</span>
                <span className="coin-totalValue">거래대금 {coinData.totalValue}</span>
            </div>
            )}
        </div>
    );
};

export default CoinDetail;