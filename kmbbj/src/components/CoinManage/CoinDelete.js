import React from 'react';
import { deleteCoin } from '../../services/Coin/CoinService';
import "../../assets/styles/Charts/CoinUpdate.css";

const CoinDelete = ({ symbol }) => {
    const handleDelete = async () => {
        try {
            await deleteCoin(symbol);
            alert('코인이 삭제되었습니다.');
        } catch (error) {
            console.error('코인 삭제 중 오류 발생:', error);
        }
    };

    return (
        <div className='delete-coin-container'>
        <h2>코인 삭제</h2>
            <div className='delete-coin-button'>
                <button className='beautiful-button' onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default CoinDelete;