import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { useAuth } from '../../hooks/Auth/AuthContext';
import '../../assets/styles/Auth/AuthForm.css';

const LoginPage = () => {
  const { handleLogin, modalMessage, isModalOpen, setIsModalOpen } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleConfirmClick = () => {
    if (modalMessage === '로그인에 성공하였습니다.') {
      navigate('/'); // 성공 시 메인 페이지로 이동
    } else {
      setIsModalOpen(false); // 실패 시 모달 닫기
    }
  };

  return (
    <div className="auth-container">
      <h2>로그인</h2>
      <form onSubmit={onSubmit} className="auth-form">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="auth-button">로그인</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="알림">
        <p>{modalMessage}</p>
        <button onClick={handleConfirmClick} className="modal-action-button" style={{ display: 'none' }}>확인</button>
      </Modal>
    </div>
  );
};

export default LoginPage;