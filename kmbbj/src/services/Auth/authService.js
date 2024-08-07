import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const setAuthHeaders = (accessToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

const removeAuthHeaders = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const getUserId = () => {
  return localStorage.getItem('userId');
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    const { accessToken, refreshToken, userId } = response.data;
    document.cookie = `Access-Token=${accessToken}; path=/`;
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
    setAuthHeaders(accessToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed');
  }
};

export const join = async (email, password, passwordCheck) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/join`, { email, password, password_check: passwordCheck });
    const { accessToken, refreshToken, userId } = response.data;
    document.cookie = `Access-Token=${accessToken}; path=/`;
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
    setAuthHeaders(accessToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed');
  }
};

export const logout = async () => {
  try {
    await axios.delete(`${API_BASE_URL}/auth/logout`);
    document.cookie = 'Access-Token=; Max-Age=0; path=/';
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    removeAuthHeaders();
    return true;
  } catch (error) {
    throw new Error(error.response.data.message || 'Logout failed');
  }
};

export const refreshTokens = async () => {
  try {
    const refreshToken = getRefreshToken();
    const response = await axios.post(`${API_BASE_URL}/token/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    document.cookie = `Access-Token=${accessToken}; path=/`;
    localStorage.setItem('refreshToken', newRefreshToken);
    setAuthHeaders(accessToken);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Token refresh failed');
  }
};

// Axios 인터셉터를 사용하여 자동으로 토큰을 재발급
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshTokens();
      originalRequest.headers['Authorization'] = axios.defaults.headers.common['Authorization'];
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const setAccessToken = setAuthHeaders;
export const clearAccessToken = removeAuthHeaders;