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
