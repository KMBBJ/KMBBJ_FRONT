import api from "../../api/api"; // API 호출을 위한 모듈

const fetchTotalAssets = async () => {
    try {
        // 로컬 스토리지에서 사용자 ID를 가져옴
        const userId = localStorage.getItem("userId");
        if (!userId) {
            throw new Error("User ID not found in local storage");
        }

        const response = await api.post("/assets/user/total", { // 가정된 API 엔드포인트
            userId: parseInt(userId), // userId를 정수형으로 변환
        });

        if (response.data.status === "100 CONTINUE" && response.data.data) {
            return response.data.data; // 총 보유 자산 데이터 반환
        } else if (response.data.status === "100 CONTINUE" && !response.data.data.length) {
            return [];  // 데이터가 없을 경우 빈 배열 반환
        } else {
            throw new Error(response.data.message || "Failed to fetch total assets");
        }
    } catch (error) {
        console.error("API 호출 오류:", error);
        throw error;
    }
};

export default fetchTotalAssets;
