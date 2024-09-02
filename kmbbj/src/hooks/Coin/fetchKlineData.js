import { getKlineData } from '../../services/Charts/ChartService';

export const fetchKlineData = async (symbol) => {
    try {
        // 5분 간격의 Kline 데이터 가져오기
        const klineData5m = await getKlineData(symbol, '5m');

        // 1일 간격의 Kline 데이터 가져오기 (MA와 Bollinger Bands 데이터 포함)
        const klineData1d = await getKlineData(symbol, '1d');

        return { klineData5m, klineData1d };
    } catch (error) {
        console.error('Kline 데이터를 가져오는 중 오류가 발생했습니다:', error);
        throw error;
    }
};