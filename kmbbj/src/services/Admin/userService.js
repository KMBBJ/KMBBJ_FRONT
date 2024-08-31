// src/services/Admin/userService.js
import api from '../../api/api';


// 유저 리스트 함수
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

// 유저 정지 메서드 
export const suspendUser = async (id, suspendDate) => {
  try {
    const formattedDate = new Date(suspendDate).toISOString();
    console.log('Sending endDate:', formattedDate);
    const response = await api.post(`/admin/suspend/${id}`, { endDate: formattedDate });
    return response.data;
  } catch (error) {
    console.error('Error suspending user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 유저 정지 해제 메서드 0
export const unsuspendUser = async (id) => {
  try {
    const response = await api.post(`/admin/unsuspend/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error unsuspending user:', error);
    throw error;
  }
};

// 사용자 보상 지급 요청 0
export const rewardUser = async (id, amount) => {
  try {
    const response = await api.post(`/admin/rewards/${id}`, { amount }); // changeType 제거
    return response.data;
  } catch (error) {
    console.error('Error rewarding user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 사용자 상세 정보 가져오기 0
export const fetchUserDetails = async (id) => {
  try {
    if (!id) throw new Error('User ID is required');

    const response = await api.get(`/admin/${id}`);

    // response.data만 반환하도록 수정
    if (response.data) {
      console.log('User details fetched:', response.data);
      return response.data; // userInfo 객체를 반환
    } else {
      throw new Error('Invalid response structure for fetchUserDetails');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};



// 자산 및 거래 내역을 가져오는 함수

export const fetchUserBalanceAndTransactions = async (userId, page = 0, size = 10) => {
  try {
    const response = await api.get(`/admin/balance/${userId}`, {
      params: { page, size }
    });

    if (response && response.data && response.data.data) {
      console.log('Balance and transactions fetched:', response.data.data);
      return response.data.data; // 데이터를 제대로 반환하기 위해 .data를 추가
    } else {
      throw new Error('Invalid response structure for fetchUserBalanceAndTransactions');
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.statusText}`);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
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


// 공지사항 저장 
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


const userService = {
  fetchUsers,
  fetchUserDetails,
  suspendUser,
  unsuspendUser,
  rewardUser, 
  fetchUserBalanceAndTransactions,
  fetchAdminAnnouncementsAndUserInfo,
  fetchAdminAnnouncements,
  addAnnouncement,
};

export default userService;
