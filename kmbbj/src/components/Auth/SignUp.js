import React, { useState } from 'react';
import { useAuth } from '../../hooks/Auth/AuthContext';
import Modal from '../common/Modal'; // 모달 컴포넌트 임포트
import '../../assets/styles/Auth/AuthForm.css';

const SignUp = () => {
  const { handleJoin, isModalOpen, modalMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleJoin(email, password, passwordCheck);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>회원 가입</h2>
      <form onSubmit={onSubmit} className="auth-form">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Password 확인</label>
        <input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
        <button type="submit" className="auth-button">회원 가입</button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => {}} title="회원가입">
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default SignUp;