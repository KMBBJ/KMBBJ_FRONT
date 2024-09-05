import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 모든 요청에 대해 withCredentials: true 설정
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // localStorage에서 Access-Token 가져오기
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Access-Token을 헤더에 추가
      config.headers['Access-Token'] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  response => {
    // 응답에서 Refresh-Token 헤더를 읽어 로컬 스토리지에 저장
    const refreshToken = response.headers['refresh-token'];
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    const accessToken = response.headers['access-token'];
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;