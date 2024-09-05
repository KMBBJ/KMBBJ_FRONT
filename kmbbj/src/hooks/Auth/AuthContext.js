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

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true); // 로딩 상태 시작
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('accessToken');
  
      if (accessToken) {
        // Access Token이 존재하고 유효하면 사용자 설정
        setUser({ id: localStorage.getItem('userId') });
      } else if (refreshToken) {
        try {
          await refreshTokens(); // 토큰 재발급 시도
          setUser({ id: localStorage.getItem('userId') });
        } catch (error) {
          console.error('Token refresh failed:', error);
          if (!window.location.pathname.startsWith('/auth/signup')) {
            navigate('/auth/login');
          }
        }
      } else {
        if (!window.location.pathname.startsWith('/auth/signup')) {
          navigate('/auth/login');
        }
      }
  
      setLoading(false); // 로딩 상태 종료
    };
  
    initializeUser();
  }, [navigate]);

// 로그인 함수
const handleLogin = async (email, password) => {
  try {
    console.log('Login attempt with email:', email); // 이메일 정보 출력
    
    const userData = await login(email, password);
    
    console.log('Login successful. User data received:', userData); // 로그인 성공 후 받은 데이터 출력

    setUser(userData); // 로그인 성공 시 사용자 상태 설정
    
    navigate('/'); // 메인 페이지로 이동
  } catch (error) {
    console.error('Login failed. Error:', error.message); // 로그인 실패 시 에러 메시지 출력
    
    alert(error.message || '로그인에 실패하였습니다.'); // 모달 대신 alert로 피드백
  }
};

  // 회원가입 함수
  const handleJoin = async (email, password, passwordCheck) => {
    try {
      await join(email, password, passwordCheck);
      setModalMessage('회원가입에 성공했습니다.'); // 성공 시 메시지 설정
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      setModalMessage('비밀번호를 확인하거나, 이미 존재하는 이메일 입니다.'); // 에러 메시지 설정
      setIsModalOpen(true); // 모달 열기
    } finally {
      setIsModalOpen(true);  // 모달을 항상 열도록 설정
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달을 닫기 위해 isModalOpen을 false로 설정
    setModalMessage(''); // 메시지 초기화
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // 로그아웃 시 사용자 상태 초기화
      navigate('/auth/login'); // 로그아웃 후 로그인 페이지로 리디렉션
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
        setIsModalOpen,
        handleModalClose,
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