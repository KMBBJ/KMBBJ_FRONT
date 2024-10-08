import api from '../../api/api';
import axios from 'axios';

// 로컬 스토리지에서 refreshToken을 가져옵니다.
const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// 로그인 요청을 처리하는 함수입니다.
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    // 토큰에서 사용자 ID 추출
    const userId = response.data.data;

    // 사용자 ID를 로컬 스토리지에 저장
    localStorage.setItem('userId', userId);

    return response.data;
  } catch (error) {
    console.error('Login error:', error); // 디버그용 로그
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// 회원가입 요청을 처리하는 함수입니다.
export const join = async (email, password, passwordCheck) => {
  try {
    const response = await api.post('/auth/join', { email, password, password_check: passwordCheck });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// 로그아웃 요청을 처리하는 함수입니다.
export const logout = async () => {
  try {
    await api.delete('/auth/logout');
    localStorage.clear();
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

// 토큰 재발급 요청을 처리하는 함수입니다.
export const refreshTokens = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post('/token/refresh', {}, {
      headers: {
        'Refresh-Token': refreshToken
      }
    });
    // 액세스 토큰과 새로운 리프레시 토큰을 헤더에서 가져옴
    const accessToken = response.headers['access-token'];
    const newRefreshToken = response.headers['refresh-token'];
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', newRefreshToken);

    const userId = response.data.data;
    localStorage.setItem('userId', userId);

    return response.data;
  } catch (error) {
    localStorage.clear();
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
};

// Axios 인터셉터를 사용하여 자동으로 토큰을 재발급합니다.
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshTokens();
        return api(originalRequest);
      } catch (err) {
        // 토큰 재발급 실패 시 로컬 스토리지와 쿠키에서 토큰 정보를 삭제합니다.

        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);