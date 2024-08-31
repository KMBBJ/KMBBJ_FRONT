import React, { useEffect, useState } from 'react';
import '../../assets/styles/Admin/Announcement.css';
import { fetchAdminAnnouncements, addAnnouncement } from '../../services/Admin/userService';
import AddAnnouncementModal from './AddAnnouncementModal';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await fetchAdminAnnouncements();
        if (Array.isArray(data)) {
          const latestAnnouncements = data.slice(0, 5);
          setAnnouncements(latestAnnouncements);
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error loading announcements:', error);
      }
    };

    loadAnnouncements();
  }, []);

  const handleSaveAnnouncement = async (announcement) => {
    try {
      await addAnnouncement(announcement);
      const updatedAnnouncements = await fetchAdminAnnouncements();
      setAnnouncements(Array.isArray(updatedAnnouncements) ? updatedAnnouncements.slice(0, 5) : []);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  return (
    <div className="asset-card">
      <h2>공지사항</h2>
      <div>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <li key={index} style={{ marginBottom: '10px', marginTop: '20px' }}>
                <strong>{announcement.title}</strong> - {announcement.content.length > 20 ? `${announcement.content.slice(0, 20)}...` : announcement.content}
              </li>
            ))
          ) : (
            <li>공지사항이 없습니다.</li>
          )}
        </ul>
        <button type="button" onClick={() => setIsModalOpen(true)}>공지 추가</button>
        <AddAnnouncementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAnnouncement}
        />
      </div>
    </div>
  );
};

export default Announcement;
