// src/components/Admin/AdminList.js
import React, { useEffect, useState } from 'react';
import { fetchAdmins } from '../../services/Admin/userService';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const data = await fetchAdmins(page);
        setAdmins(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error loading admins:', error);
      }
    };

    loadAdmins();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="admin-list">
      <h3>Admin Users</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nickname</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.email}</td>
              <td>{admin.nickname}</td>
              <td>{admin.authority === 'ROLE_ADMIN' ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default AdminList;
