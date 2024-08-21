// src/contexts/AnnouncementContext.js
import React, { createContext, useContext, useState } from 'react';

const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [announcement, setAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAnnouncementModal = (newAnnouncement) => {
    setAnnouncement(newAnnouncement);
    setIsModalOpen(true);
  };

  const closeAnnouncementModal = () => {
    setIsModalOpen(false);
    setAnnouncement(null);
  };

  return (
    <AnnouncementContext.Provider value={{ announcement, isModalOpen, openAnnouncementModal, closeAnnouncementModal }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
