import api from '../../api/api';

// 차트 데이터 가져오기
export const getKlineData = async (symbol, interval) => {
    try {
        const response = await api.get(`/chart/kline/${symbol}/${interval}`);
        return response.data;
    } catch (error) {
        console.error("코인 정보를 불러오는 데 실패했습니다.", error);
        throw error;
    }
};