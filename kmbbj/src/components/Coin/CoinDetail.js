import React, { useState, useEffect } from 'react';
import { getCoinDetail } from '../../services/Coin/CoinService';
import "../../assets/styles/Charts/CoinDetail.css";

const CoinDetail = ( {symbol} ) => {
    const [coinData, setCoinData] = useState(null);

    function formatToMillion(value) {
        if (value >= 1e6) { // 백만 이상인 경우
            const millionValue = (value / 1e6).toFixed(1); // 소수점 2자리까지 표시
            return `${parseFloat(millionValue).toLocaleString()}백만`; // M 단위로 반환하고 세 자리마다 쉼표 추가
        }
        return value.toLocaleString(); // 십만 미만인 경우 그대로 반환하고 세 자리마다 쉼표 추가
    }

    function addCommas(value) {
        if (value >= 1000) {
            return `${parseFloat(value.toFixed(1)).toLocaleString()}`;
        } else if(value % 1 === 0) {
            return value;
        } else
        return value.toFixed(4);
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
                priceChange: addCommas(formattedCoin.coin24hDetail.priceChange),
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
                <div className="coin-name-div">
                    <div><span className="coin-name">{coinData.coinName}</span></div>
                    <div><span className="coin-symbol">({coinData.symbol}/KRW)</span></div>
                </div>
                <div className="coin-price-div">
                    <span className="coin-price" style={{ color: coinData.priceChange >= 0 ? 'palegreen' : 'salmon' }}>{coinData.price}/KRW</span>
                    <div className="coin-price-change-div">
                        <span className="coin-price-change-percent" style={{ color: coinData.priceChange >= 0 ? 'palegreen' : 'salmon' }}> {coinData.priceChangePercent}%</span>
                        <span className="coin-price-change" style={{ color: coinData.priceChange >= 0 ? 'palegreen' : 'salmon' }}>{coinData.priceChange}</span>
                    </div>
                </div>
                <div className="coin-24h-div-container">
                    <div className="coin-24h-div">
                        <div className="coin-volume"><span>거래량(24h) {coinData.volume} {coinData.symbol}</span></div>
                        <div className="coin-totalValue"><span>거래대금(24H) {coinData.totalValue} KRW</span></div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default CoinDetail;