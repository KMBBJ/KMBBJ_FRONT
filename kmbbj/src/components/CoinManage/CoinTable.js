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
                    <th onClick={() => onSort('volume')}>
                        거래량(24h) {getSortDirection('volume') === 'asc' ? '↑' : '↓'}
                    </th>
                    <th onClick={() => onSort('totalValue')}>
                        거래대금 {getSortDirection('totalValue') === 'asc' ? '↑' : '↓'}
                    </th>
                </tr>
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
                        <td>{coin.price}/KRW</td>
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