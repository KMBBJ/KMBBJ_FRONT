import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Admin/ProfileEdit.css';

const ProfileEdit = () => {
  const navigate = useNavigate();

  // "user list" 버튼 클릭 시 admin/user_search로 이동하는 함수
  const handleUserListClick = (event) => {
    event.preventDefault(); // 폼 제출 동작을 막음
    navigate('/admin/user_search'); // admin/user_search URL로 이동
  };

  return (
    <div className="profile-edit">
      <h2>설정 </h2>
      <form>
        <input type="text"/>
        <button type="submit">보상</button>  
      </form>

      <form>
        <button type="submit">코인 관리</button>
      </form>

      <form>
        <button type="submit">정지</button>
      </form>

      <form onSubmit={handleUserListClick}> {/* "user list" 버튼 클릭 시 URL 이동 */}
        <button type="submit">user list</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
