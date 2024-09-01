import React, { useState, useEffect } from "react";
import fetchGameTransactionHistory from "../Games/fetchGameTransactionHistory";
import "../../assets/styles/Games/GameTransactionHistory.css";

function GameTransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState("전체");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const useDummyData = true;  // 더미 데이터를 사용할지 결정하는 플래그

        if (useDummyData) {
            const dummyData = [
                {
                    symbol: "BTC",
                    transactionType: "BUY",
                    quantity: 0.03333333,
                    price: 96824000,
                    totalPrice: 3227466,
                    executionDate: "2024-08-31T05:31:01",
                },
                {
                    symbol: "ETH",
                    transactionType: "SELL",
                    quantity: 1.0,
                    price: 3000000,
                    totalPrice: 3000000,
                    executionDate: "2024-08-31T05:45:00",
                },
                {
                    symbol: "XRP",
                    transactionType: "BUY",
                    quantity: 1500,
                    price: 800,
                    totalPrice: 1200000,
                    executionDate: "2024-08-31T06:00:00",
                },
            ];
            setTransactions(dummyData);
            setFilteredTransactions(dummyData); // 기본적으로 전체 데이터를 보여줌
            setLoading(false);
        } else {
            fetchGameTransactionHistory()
                .then(data => {
                    setTransactions(data);
                    setFilteredTransactions(data); // 기본적으로 전체 데이터를 보여줌
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    const handleCoinChange = (e) => {
        setSelectedCoin(e.target.value);
    };

    const handleFilterTransactions = () => {
        if (selectedCoin === "전체") {
            setFilteredTransactions(transactions);
        } else {
            const filtered = transactions.filter(transaction => transaction.symbol === selectedCoin);
            setFilteredTransactions(filtered);
        }
    };

    if (loading) {
        return <p>거래 내역을 불러오는 중...</p>;
    }

    return (
        <div className="game-transaction-history">
            <h2>나의 게임 거래내역</h2>

            <div className="filter-section">
                <label htmlFor="coinFilter">코인 종류</label>
                <select id="coinFilter" value={selectedCoin} onChange={handleCoinChange}>
                    <option value="전체">전체</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="XRP">XRP</option>
                </select>
                <button onClick={handleFilterTransactions}>조회</button>
            </div>

            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>코인</th>
                        <th>구분</th>
                        <th>체결량</th>
                        <th>체결가격</th>
                        <th>KRW</th>
                        <th>체결시간</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length === 0 ? (
                        <tr>
                            <td colSpan="6">거래 내역이 없습니다. 새로운 거래를 시작해 보세요!</td>
                        </tr>
                    ) : (
                        filteredTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.symbol}</td>
                                <td className={transaction.transactionType === "BUY" ? "transaction-buy" : "transaction-sell"}>
                                    {transaction.transactionType}
                                </td>
                                <td>{transaction.quantity}</td>
                                <td>{transaction.price.toLocaleString()}원</td>
                                <td>{transaction.totalPrice.toLocaleString()}KRW</td>
                                <td>{new Date(transaction.executionDate).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GameTransactionHistory;
