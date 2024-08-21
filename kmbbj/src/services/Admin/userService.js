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
    
    const response = await api.get(`/admin/user/${id}`);
    
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

// 관리자 공지사항 가져오기
export const fetchAdminAnnouncements = async () => {
  try {
    const response = await api.get('/admin');
    
    if (response.data && response.data.data && response.data.data.alarms) {
      return response.data.data.alarms;
    } else {
      throw new Error('Invalid response structure for fetchAdminAnnouncements');
    }
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

// 관리자 공지사항 및 로그인된 사용자 정보 가져오기
export const fetchAdminAnnouncementsAndUserInfo = async () => {
  try {
    const response = await api.get('/admin');
    
    if (response.data && response.data.data) {
      return {
        alarms: response.data.data.alarms,
        userInfo: response.data.data.userInfo
      };
    } else {
      throw new Error('Invalid response structure for fetchAdminAnnouncementsAndUserInfo');
    }
  } catch (error) {
    console.error('Error fetching announcements and user info:', error);
    throw error;
  }
};

export const addAnnouncement = async (announcement) => {
  try {
    if (!announcement || typeof announcement !== 'object' || !announcement.title || !announcement.content) {
      throw new Error('Invalid announcement data');
    }

    const response = await api.post('/admin/add', announcement);

    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response structure for addAnnouncement');
    }
  } catch (error) {
    // 응답 상태에 따른 에러 메시지 출력
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

// 기본 export 추가
const userService = {
  fetchUsers,
  fetchUserDetails,
  fetchAdminAnnouncements,
  fetchAdminAnnouncementsAndUserInfo,   
  addAnnouncement
};

export default userService;
