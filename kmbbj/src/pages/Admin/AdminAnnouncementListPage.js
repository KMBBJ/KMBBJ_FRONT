import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/Admin/userService'; // userService 임포트
import '../../assets/styles/Admin/AdminAnnouncementListPage.css';

const AdminAnnouncementListPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  // API 호출 함수
  const fetchAdminAnnouncements = async (query = '', page = 0, size = 10) => {
    try {
      const response = await userService.fetchAdminAnnouncements(); // userService를 통한 API 호출
      const alarms = response || [];
      const filteredAnnouncements = alarms.filter(announcement =>
        announcement.title.toLowerCase().includes(query.toLowerCase()) ||
        announcement.content.toLowerCase().includes(query.toLowerCase())
      );
      setAnnouncements(filteredAnnouncements);
      setTotalPages(Math.ceil(filteredAnnouncements.length / size));
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const loadAnnouncements = useCallback(() => {
    fetchAdminAnnouncements(searchQuery, page, size);
  }, [searchQuery, page, size]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleRowClick = (announcementId) => {
    navigate(`/admin/announcements/${announcementId}`);
  };

  return (
    <div className="announcement-list-container">
      <div className="search-form">
        <input 
          type="text"
          placeholder="Search by title or content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="announcement-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {announcements.length > 0 ? (
            announcements.slice(page * size, (page + 1) * size).map((announcement, index) => (
              <tr 
                key={index} 
                onClick={() => handleRowClick(index)} // ID가 없는 경우 index 사용
                className="announcement-row"
              >
                <td>{announcement.title}</td>
                <td className="content-column">{announcement.content}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No announcements found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 0}
        >
          Previous
        </button>
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminAnnouncementListPage;
