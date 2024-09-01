import React, { useState } from 'react';
import { updateCoinStatus } from '../../services/Coin/CoinService';


const CoinStatusUpdate = ({ symbol }) => {
    const [status, setStatus] = useState('');

    const handleUpdate = async () => {
        try {
            await updateCoinStatus(symbol, status);
            alert('코인 상태가 업데이트되었습니다.');
        } catch (error) {
            console.error('코인 상태 업데이트 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <h2>Update Coin Status</h2>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="TRADING">TRADING</option>
                <option value="DELETED">DELETED</option>
            </select>
            <button onClick={handleUpdate}>Update Status</button>
        </div>
    );
};

export default CoinStatusUpdate;