import React from 'react';
import { deleteCoin } from '../../services/Coin/CoinService';

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
        <div>
            <h2>Delete Coin</h2>
            <button onClick={handleDelete}>Delete Coin</button>
        </div>
    );
};

export default CoinDelete;