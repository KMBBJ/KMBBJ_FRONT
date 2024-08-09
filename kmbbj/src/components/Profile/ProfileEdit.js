import React, { useState } from 'react';
import '../../assets/styles/Profile/ProfileEdit.css';

const ProfileEdit = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordCheckChange = (e) => setPasswordCheck(e.target.value);

  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    // 닉네임 변경 로직
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 변경 로직
  };

  return (
    <div className="profile-edit">
      <h2>정보 변경</h2>
      <form onSubmit={handleNicknameSubmit}>
        <label>별명</label>
        <input type="text" value={nickname} onChange={handleNicknameChange} />
        <button type="submit">별명 변경</button>
      </form>
      <form onSubmit={handlePasswordSubmit}>
        <label>password</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <label>password 확인</label>
        <input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} />
        <button type="submit">정보 변경</button>
      </form>
    </div>
  );
};

export default ProfileEdit;