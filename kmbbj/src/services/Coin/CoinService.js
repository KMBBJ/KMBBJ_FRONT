import api from '../../api/api';

// 코인 상세 정보 가져오기
export const getCoinDetail = async (symbol) => {
    try {
        const response = await api.get(`/coin/detail/${symbol}`);
        return response.data;
    } catch (error) {
        console.error("코인 정보를 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

// 모든 코인 데이터 업데이트
export const updateAllCoinsData = async () => {
    try {
        const response = await api.post('/coin/updateAll');
        return response.data;
    } catch (error) {
        console.error("코인 데이터를 업데이트하는 데 실패했습니다.", error);
        throw error;
    }
};

// 새로운 코인 등록
export const addCoin = async (symbol, coinName) => {
    const params = {
        symbol: symbol, 
        coinName: coinName
    }
    try {
        const response = await api.put('/coin/add', {}, { params });
        return response.data;
    } catch (error) {
        console.error("코인 등록에 실패했습니다.", error);
        throw error;
    }
};

// 코인 리스트 가져오기 (페이지네이션)
export const getCoinListPage = async (page, size, sortField, sortOrder, searchQuery) => {
    const params = {
        pageNo: page,
        size: size,
        orderBy: sortField,
        sort: sortOrder,
        searchQuery: searchQuery
    };

    try {
        const response = await api.get('/coin/listPage', { params });
        return response.data;
    } catch (error) {
        console.error("코인 리스트를 가져오는 데 실패했습니다.", error);
        throw error;
    }
};

// 코인 리스트 가져오기
export const getCoinList = async () => {
    try {
        const response = await api.get('/coin/list');
        return response.data;
    } catch (error) {
        console.error("코인 리스트를 가져오는 데 실패했습니다.", error);
        throw error;
    }
};

// 코인 삭제
export const deleteCoin = async (symbol) => {
    try {
        const response = await api.put(`/coin/delete/${symbol}`);
        return response.data;
    } catch (error) {
        console.error("코인 삭제에 실패했습니다.", error);
        throw error;
    }
};

// 코인 상세 정보 업데이트
export const updateCoinStatus = async (symbol, status) => {
    const params = {
        status: status
    }
    try {
        const response = await api.put('/coin/update/' + symbol, {}, { params });
        return response.data;
    } catch (error) {
        console.error("코인 상세 정보를 업데이트하는 데 실패했습니다.", error);
        throw error;
    }
};