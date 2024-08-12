import api from '../../api/api';

// 사용자 프로필 정보를 가져오는 함수입니다.
export const getUserProfile = async (userId) => {
  try {
    const response = await api.post('/profile/', { userId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
  }
};