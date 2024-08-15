import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/styles/Charts/CoinList.css";

const CoinTable = ({ coins, onSort, sortConfig }) => {
    const getSortDirection = (key) => {
        return sortConfig.key === key ? sortConfig.direction : 'asc';
    };

    return (
        <table className={"table"}>
            <thead>
                <tr>
                    <th onClick={() => onSort('coinName')}>Name</th>
                    <th onClick={() => onSort('price')}>
                        Price {getSortDirection('price') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('priceChange')}>
                        24h Change {getSortDirection('priceChange') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('volume')}>
                        24h Volume {getSortDirection('volume') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('highPrice')}>
                        24h High {getSortDirection('highPrice') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('lowPrice')}>
                        24h Low {getSortDirection('lowPrice') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => (
                    <tr key={coin.symbol}>
                        <td class="link-detail">
                            <Link to={`/charts/detail/${coin.symbol}`}>
                                {coin.coinName} ({coin.symbol})
                            </Link>
                        </td>
                        <td>{coin.price}</td>
                        <td>{coin.priceChange}%</td>
                        <td>{coin.volume}</td>
                        <td>{coin.highPrice}</td>
                        <td>{coin.lowPrice}</td>
                        <td className={"actions"}>
                            <button>✏️</button>
                            <button>🗑️</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CoinTable;