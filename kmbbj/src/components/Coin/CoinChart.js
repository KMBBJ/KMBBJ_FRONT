import React, { useState } from 'react';
import "../../assets/styles/GameCharts/CoinChart.css";

const CoinChart = ({ coins, onSort, sortConfig, onSelectSymbol }) => {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    
    const handleSymbolClick = (coin) => {
        setSelectedSymbol(coin.symbol);
        onSelectSymbol(coin.symbol);
        localStorage.setItem('coinId', coin.coinId);
        localStorage.setItem('coinPrice', coin.price.replace(/,/g, ''));
    };

    const getSortDirection = (key) => {
        return sortConfig.key === key ? sortConfig.direction : 'asc';
    };

    return (
        <>
        <div className="game-coin-table-div">
        <table className="game-coin-table">
            <thead>
                <tr>
                    <th onClick={() => onSort('coinName')}>
                        코인명 {getSortDirection('coinName') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('price')}>
                        현재가 {getSortDirection('price') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('priceChange')}>
                        전일대비 {getSortDirection('priceChange') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('totalValue')}>
                        거래대금 {getSortDirection('totalValue') === 'asc' ? '↑' : '↓'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => (
                    <tr key={coin.symbol} onClick={() => handleSymbolClick(coin)}>
                        <td>
                            <div className='coin-name-symbol-div'>
                                <div><span className='coinName'>{coin.coinName}</span></div>
                                <div><span className='coinSymbol'>{coin.symbol}/KRW</span></div>
                            </div>
                        </td>
                        <td>{coin.price}</td>
                        <td style={{ color: coin.priceChange >= 0 ? 'palegreen' : 'salmon' }}>
                        <div><span className="coin-pricechange" style={{ color: coin.priceChange >= 0 ? 'palegreen' : 'salmon' }}>{coin.priceChange}</span></div>
                        <div><span className="coin-pricechange-percent" style={{ color: coin.priceChangePercent >= 0 ? 'palegreen' : 'salmon' }}>{coin.priceChangePercent}%</span></div>
                        </td>
                        <td>{coin.totalValue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    );
};

export default CoinChart;
