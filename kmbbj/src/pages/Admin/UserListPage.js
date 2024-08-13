import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../services/Admin/userService';
import '../../assets/styles/Admin/UserListPage.css';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        loadUsers(searchEmail);
    }, [page]);

    useEffect(() => {
        setPage(0);
        loadUsers(searchEmail);
    }, [searchEmail]);

    const loadUsers = async (email = '') => {
        try {
            const data = await fetchUsers(page, size, email);
            setUsers(data.userList || []);
        } catch (error) {
            console.error('유저 목록을 가져오는 중 오류 발생:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0) {
            setPage(newPage);
        }
    };

    const handleNicknameClick = (userId) => {
        navigate(`/admin/user/${userId}`);
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
                        <th>번호</th> {/* 번호를 의미하는 열 */}
                        <th>닉네임</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user.id}>
                                {/* 페이지 번호와 페이지당 유저 수를 기준으로 가상의 번호를 생성 */}
                                <td>{index + 1 + page * size}</td>
                                <td>
                                    <a 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNicknameClick(user.id);
                                        }}
                                        className="nickname-link"
                                    >
                                        {user.nickname}
                                    </a>
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
            </div>
        </div>
    );
};

export default UserListPage;
