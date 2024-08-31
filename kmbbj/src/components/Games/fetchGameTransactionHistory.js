import api from "../../api/api"; // API 호출을 위한 모듈

const fetchGameTransactionHistory = async () => {
    try {
        // 로컬 스토리지에서 사용자 ID를 가져옴
        const userId = localStorage.getItem("userId");
        if (!userId) {
            throw new Error("User ID not found in local storage");
        }

        const response = await api.post("/transactions/user/transactions", {
            userId: parseInt(userId), // userId를 정수형으로 변환
        });

        if (response.data.status === "100 CONTINUE" && response.data.data) {
            return response.data.data; // 거래 내역 데이터 반환
        } else if (response.data.status === "100 CONTINUE" && !response.data.data.length) {
            return [];  // 거래 내역이 없을 경우 빈 배열 반환
        } else {
            throw new Error(response.data.message || "Failed to fetch transaction history");
        }
    } catch (error) {
        console.error("API 호출 오류:", error);
        throw error;
    }
};

export default fetchGameTransactionHistory;
