import React, { useState } from 'react';
import { useAuth } from '../../hooks/Auth/AuthContext';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import Modal from '../common/Modal';
import '../../assets/styles/Auth/AuthForm.css';

const SignUp = () => {
  const { handleJoin, isModalOpen, modalMessage, handleModalClose } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleJoin(email, password, passwordCheck);
    } catch (error) {
      console.error(error.message);
    }
  };

  // 모달 확인 버튼 클릭 시 호출되는 함수
  const handleConfirmClick = () => {
    if (modalMessage === '회원가입에 성공했습니다.') { // 성공 메시지를 확인
      navigate('/auth/login'); // 성공 시 로그인 페이지로 이동
    } else {
      handleModalClose(); // 실패 시 모달 닫기
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
      <Modal isOpen={isModalOpen} onClose={handleConfirmClick} title="회원가입"> {/* handleConfirmClick를 onClose에 전달 */}
        <p>{modalMessage}</p>
        <button onClick={handleConfirmClick} className="modal-action-button" style={{ display: 'none' }}>확인</button>
      </Modal>
    </div>
  );
};

export default SignUp;