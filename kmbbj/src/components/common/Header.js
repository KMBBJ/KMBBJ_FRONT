import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/AuthContext";
import "../../assets/styles/common/Header.css";
import logo from "../../assets/images/logo.png";
import EventSourcePolyfill from 'eventsource-polyfill';

const Header = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // const closeDropdown = (e) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //     setShowDropdown(false);
  //   }
  // };

  const cookies = document.cookie.split('; ');
    const accessTokenCookie = cookies.find(cookie => cookie.startsWith('Access-Token='));
    const accessToken = accessTokenCookie ? accessTokenCookie.split('=')[1] : null;

  useEffect(() => {
    if (user) {
      const url = `http://localhost:8080/api/sse/subscribe/${user.id}`;
      const newEventSource = new EventSourcePolyfill(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,  // 사용자 인증 토큰
        }
      });
  
      newEventSource.addEventListener("roomNotification", (event) => {
        console.log("Event received:", event);
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);
        if (data) {
          setIsMatching(false);
          console.log(isMatching);
          setTimeout(() => {
            navigate(`/matching/enter/${data}`);  // 자동 리디렉션
          }, 100);
          console.log("done");
        }
      });
  
      newEventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        // Handle errors or connection issues here
        newEventSource.close(); // Ensure the connection is closed properly
      };
  
      return () => {
        newEventSource.close();
      };
    }
  }, [user, navigate, accessToken]);

  useEffect(() => {
    console.log("Matching state updated:", isMatching);
  }, [isMatching]);  // isMatching 상태 변화 로깅

  const logout = async () => {
    try {
      await handleLogout();
      navigate("/auth/login"); // 로그아웃 후 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const coin = async () => {
    navigate("/charts/list"); // 코인 리스트로 이동
  };

  const friends = async () => {
    navigate("/friends/list");
  };

  const information = async () => {
    navigate("/");
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
              <li ref={dropdownRef} className="nav-item">
                <button
                  className="nav-button no-border-button"
                  onClick={toggleDropdown}
                >
                  게임 시작
                </button>
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/matching/create">방 생성하기</Link>
                    </li>
                    <li>
                      <Link to="/matching/list">방 목록보기</Link>
                    </li>
                    <li>
                      <Link to="/matching/random">랜덤 매칭</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button className="nav-button no-border-button" onClick={coin}>
                  코인 목록
                </button>
              </li>
              <li>
                <button
                  className="nav-button no-border-button"
                  onClick={friends}
                >
                  친구 목록
                </button>
              </li>
              <li>
                <button
                  className="nav-button no-border-button"
                  onClick={information}
                >
                  내 정보
                </button>
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
                <Link to="/auth/signup" className="signup-button">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
