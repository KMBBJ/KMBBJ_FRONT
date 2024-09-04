import React, { useState } from 'react';
import "../../assets/styles/GameCharts/CoinChart.css";

const CoinChart = ({ coins, onSort, sortConfig, onSelectSymbol }) => {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    
    const handleSymbolClick = (coin) => {
        setSelectedSymbol(coin.symbol);
        onSelectSymbol(coin.symbol);
        localStorage.setItem('coinId', coin.coinId);
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
                        Name {getSortDirection('coinName') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('price')}>
                        Price {getSortDirection('price') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('priceChange')}>
                        24h Change {getSortDirection('priceChange') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('totalValue')}>
                        Market Cap {getSortDirection('totalValue') === 'asc' ? '↑' : '↓'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => (
                    <tr key={coin.symbol} onClick={() => handleSymbolClick(coin)}>
                        <td>
                            <div>
                                <span className='coinName'>{coin.coinName}</span> <span className='coinSymbol'>{coin.symbol}</span>
                            </div>
                        </td>
                        <td>${coin.price}</td>
                        <td style={{ color: coin.priceChange >= 0 ? 'palegreen' : 'salmon' }}>
                            {coin.priceChange}%
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
