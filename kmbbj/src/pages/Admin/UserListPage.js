import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../services/Admin/userService';
import '../../assets/styles/Admin/UserListPage.css';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const navigate = useNavigate();

    const loadUsers = useCallback(async (email = '') => {
        try {
            const data = await fetchUsers(page, size, email);
            setUsers(data.userList || []);
        } catch (error) {
            console.error('유저 목록을 가져오는 중 오류 발생:', error);
        }
    }, [page, size]);

    useEffect(() => {
        loadUsers(searchEmail);
    }, [page, searchEmail, loadUsers]); // 'loadUsers' 추가

    const handlePageChange = (newPage) => {
        if (newPage >= 0) {
            setPage(newPage);
        }
    };

    const handleNicknameClick = (userId) => {
        navigate(`/admin/${userId}`);
    };

    return (
        <div className="user-list-container">
            <div className="search-form">
                <input 
                    type="text"
                    placeholder="name / email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>닉네임</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1 + page * size}</td>
                                <td>
                                    <button
                                        onClick={() => handleNicknameClick(user.id)}
                                        className="nickname-link"
                                    >
                                        {user.nickname}
                                    </button>
                                </td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found</td>
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
                    disabled={users.length < size}
                >
                    Next
                </button>
                <button 
                    onClick={() => navigate('/admin')}
                >
                    Back to Admin
                </button>
            </div>
        </div>
    );
};

export default UserListPage;
