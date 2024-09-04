import React, { useState } from 'react';
import { updateCoinStatus } from '../../services/Coin/CoinService';
import "../../assets/styles/Charts/CoinUpdate.css";

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
            <h2>코인 상태 변경</h2>
            <div className="radio-input">
                <label className="label">
                    <input
                        type="radio"
                        name="coin-status"
                        value="TRADING"
                        checked={status === "TRADING"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <p className="text">TRADING</p>
                </label>
                <label className="label">
                    <input
                        type="radio"
                        name="coin-status"
                        value="DELETED"
                        checked={status === "DELETED"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <p className="text">DELETED</p>
                </label>
            </div>
            <div className="update-button-container">
                <button className="beautiful-button" onClick={handleUpdate}>상태 업데이트</button>
            </div>
        </div>
    );
};

export default CoinStatusUpdate;