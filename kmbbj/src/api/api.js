import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 모든 요청에 대해 withCredentials: true 설정
});

// 응답 인터셉터 설정
api.interceptors.response.use(
  response => {
    // 응답에서 Refresh-Token 헤더를 읽어 로컬 스토리지에 저장
    const refreshToken = response.headers['refresh-token'];
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;