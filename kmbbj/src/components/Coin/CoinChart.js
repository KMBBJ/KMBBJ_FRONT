import React, { useState } from 'react';
import "../../assets/styles/GameCharts/CoinChart.css";


const CoinChart = ({ coins, onSort, sortConfig, onSelectSymbol }) => {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    
    const handleSymbolClick = (symbol) => {
        setSelectedSymbol(symbol);
        onSelectSymbol(symbol);
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
                    <tr key={coin.symbol} onClick={() => handleSymbolClick(coin.symbol)}>
                        <td>
                            <p><h3 className='coinName'>{coin.coinName}</h3> {coin.symbol}</p>
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