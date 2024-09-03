// src/components/Admin/AdminSignup.js
import React, { useState } from 'react';
import { join } from '../../services/Admin/userService';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await join(email, password, passwordCheck);
      setSuccess('관리자 회원가입이 완료되었습니다.');
      setEmail('');
      setPassword('');
      setPasswordCheck('');
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="admin-signup">
      <h2>관리자 회원가입</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default AdminSignup;
