import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/AuthContext';
import '../../assets/styles/common/Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await handleLogout();
      navigate('/auth/login'); // 로그아웃 후 로그인 페이지로 리디렉션
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" /> {/* 로고 이미지 추가 */}
      </div>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/games/start">게임 시작</Link>
              </li>
              <li>
                <Link to="/charts/coin">코인 차트</Link>
              </li>
              <li>
                <Link to="/friends/list">친구 목록</Link>
              </li>
              <li>
                <Link to="/">내 정보</Link>
              </li>
              <li>
                <button className="logout-button" onClick={logout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/auth/login">Sign in</Link>
              </li>
              <li>
                <Link to="/auth/signup" className="signup-button">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
