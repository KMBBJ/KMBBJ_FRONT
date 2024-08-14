import api from '../../api/api';

// 사용자 검색 기능 
export const fetchUsers = async (page, size, email = '') => {
  try {
    const params = { page, size };
    if (email) params.email = email;
    const response = await api.get('/admin/user_search', { params });
    
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response structure for fetchUsers');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// userService 객체를 정의하고 fetchUsers 함수를 포함시킵니다.
const userService = {
  fetchUsers,
};

export default userService;
