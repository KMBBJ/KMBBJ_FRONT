import React, { useState } from 'react';
import { addCoin } from '../../services/Coin/CoinService';
import "../../assets/styles/Charts/CoinManagePage.css";


const CoinAdd = () => {
    const [symbol, setSymbol] = useState('');
    const [coinName, setCoinName] = useState('');

    const handleAdd = async () => {
        try {
            await addCoin(symbol, coinName);
            alert('코인이 추가되었습니다.');
        } catch (error) {
            console.error('코인 추가 중 오류 발생:', error);
        }
    };

    return (
        <div className="container">
        <div className="input-container">
            <input
                type="text"
                placeholder="Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
            />
            <input
                type="text"
                placeholder="Coin Name"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
            />
            <button onClick={handleAdd}>Add Coin</button>
        </div>
        </div>
    );
};

export default CoinAdd;