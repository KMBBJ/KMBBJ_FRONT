<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import "../../assets/styles/Games/TotalAssetsPage.css"

const TotalAssetsPage = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error("User ID not found in local storage");
        }
    }, []);

    return (
        <div>
            <h1>Total Assets Page</h1>
            {userId ? (
                <p>현재 사용자 ID: {userId}</p>
            ) : (
                <p>User ID를 찾을 수 없습니다.</p>
            )}
            {/* 여기에 다른 컴포넌트를 넣으세요 */}
        </div>
    );
};

export default TotalAssetsPage;
=======
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
>>>>>>> 632dbbf5d8727aa3f01067ef758b6ba02759064b
