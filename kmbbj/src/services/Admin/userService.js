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

// 사용자 상세 정보 가져오기
export const fetchUserDetails = async (id) => {
  try {
    if (!id) throw new Error('User ID is required');
    
    const response = await api.get(`/admin/${id}`);
    
    if (response.data && response.data.data) {
      return response.data.data; // 반환 데이터 구조 확인
    } else {
      throw new Error('Invalid response structure for fetchUserDetails');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// 유저 정지 요청
export const suspendUser = async (id, suspendDate) => {
  try {
    // ISO 8601 형식으로 변환
    const formattedDate = new Date(suspendDate).toISOString();
    console.log('Sending endDate:', formattedDate); // endDate를 콘솔에 출력하여 확인
    const response = await api.post(`/admin/suspend/${id}`, { endDate: formattedDate });
    return response.data;
  } catch (error) {
    console.error('Error suspending user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 유저 정지 해제 요청
export const unsuspendUser = async (id) => {
  try {
    const response = await api.post(`/admin/unsuspend/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error unsuspending user:', error);
    throw error;
  }
};


// userService 객체를 정의하고 fetchUsers 함수를 포함시킵니다.
const userService = {
  fetchUsers,
  fetchUserDetails,
  suspendUser,
  unsuspendUser,
};

export default userService;
