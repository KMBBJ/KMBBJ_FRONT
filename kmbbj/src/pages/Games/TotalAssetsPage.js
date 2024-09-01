import React, { useEffect, useState } from 'react';
import fetchTotalAssets from '../api/fetchTotalAssets';

const TotalAssetsPage = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const data = await fetchTotalAssets();
                setAssets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAssets();
    }, []);

    if (loading) {
        return <p>자산 정보를 불러오는 중...</p>;
    }

    if (error) {
        return <p>오류: {error}</p>;
    }

    return (
        <div>
            <h1>총 보유 자산</h1>
            {/* 데이터를 렌더링하는 로직 */}
            {assets.length > 0 ? (
                <ul>
                    {assets.map((asset, index) => (
                        <li key={index}>{asset.symbol}: {asset.amount} ({asset.currentPrice} 원)</li>
                    ))}
                </ul>
            ) : (
                <p>자산이 없습니다.</p>
            )}
        </div>
    );
};

export default TotalAssetsPage;
