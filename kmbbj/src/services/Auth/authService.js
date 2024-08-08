import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

// 로컬 스토리지에서 refreshToken을 가져옵니다.
const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// JWT에서 사용자 ID를 추출하는 함수입니다.
const getUserIdFromToken = (token) => {
  const decoded = jwtDecode(token);
  return decoded.userId;  // 토큰 내의 userId 클레임을 반환합니다.
};


// 로그인 요청을 처리하는 함수입니다.
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    // 쿠키에서 액세스 토큰을 가져옴
    const cookies = document.cookie.split('; ');
    const accessTokenCookie = cookies.find(cookie => cookie.startsWith('Access-Token='));
    const accessToken = accessTokenCookie ? accessTokenCookie.split('=')[1] : null;

    if (!accessToken) {
      throw new Error('Access token is not available in cookies.');
    }

    // 토큰에서 사용자 ID 추출
    const userId = getUserIdFromToken(accessToken);

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
    document.cookie = 'Access-Token=; Max-Age=0; path=/';
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
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

    const response = await api.post('/token/refresh', {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    document.cookie = `Access-Token=${accessToken}; path=/`;
    localStorage.setItem('refreshToken', newRefreshToken);

    // 토큰에서 사용자 ID 추출 및 저장
    const userId = getUserIdFromToken(accessToken);
    localStorage.setItem('userId', userId);

    return response.data;
  } catch (error) {
    // 토큰 재발급 실패 시 로컬 스토리지와 쿠키에서 토큰 정보를 삭제합니다.
    document.cookie = 'Access-Token=; Max-Age=0; path=/';
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
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
        document.cookie = 'Access-Token=; Max-Age=0; path=/';
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);