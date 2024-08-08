import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, join, logout, refreshTokens } from '../../services/Auth/authService';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

  // 컴포넌트가 마운트될 때 사용자 초기화
  useEffect(() => {
    const initializeUser = async () => {
      // 로컬 스토리지에서 리프레시 토큰을 가져옴
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // 리프레시 토큰이 있을 경우 토큰 재발급 시도
          await refreshTokens();
          setUser({ id: localStorage.getItem('userId') }); // 사용자 상태 설정
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false); // 로딩 상태 해제
    };

    initializeUser();
  }, []);

  // 로그인 함수
  const handleLogin = async (email, password) => {
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // 회원가입 함수
  const handleJoin = async (email, password, passwordCheck) => {
    try {
      await join(email, password, passwordCheck);
      setModalMessage('회원가입에 성공하셨습니다.'); // 모달 메시지 설정
      setIsModalOpen(true); // 모달 열기
      setTimeout(() => {
        setIsModalOpen(false); // 모달 닫기
        navigate('/auth/login'); // 로그인 페이지로 이동
      }, 3000); // 3초 후 모달 닫기
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // 로그아웃 시 사용자 상태 초기화
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isModalOpen,
        modalMessage,
        handleLogin,
        handleJoin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하는 커스텀 훅
export const useAuth = () => useContext(AuthContext);