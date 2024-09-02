import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/styles/Charts/CoinList.css";

const CoinTable = ({ coins, onSort, sortConfig }) => {
    const getSortDirection = (key) => {
        return sortConfig.key === key ? sortConfig.direction : 'asc';
    };

    return (
        <div className="table-div">
        <table className="table">
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
                    <th onClick={() => onSort('volume')}>
                        24h Volume {getSortDirection('volume') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('totalValue')}>
                        Market Cap {getSortDirection('totalValue') === 'asc' ? '↑' : '↓'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => (
                    <tr key={coin.symbol}>
                        <td className="link-detail">
                            <p>
                            <Link to={`/coins/coinDetail/${coin.symbol}`} style={{ textDecoration: "none", color: 'black', fontSize: '13px', paddingRight: '5px'}}>
                                {coin.symbol}
                            </Link>
                            {coin.coinName}</p>
                        </td>
                        <td>${coin.price}</td>
                        <td style={{ color: coin.priceChange >= 0 ? 'palegreen' : 'salmon' }}>
                            {coin.priceChange}%
                        </td>
                        <td>{coin.volume}</td>
                        <td>{coin.totalValue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default CoinTable;