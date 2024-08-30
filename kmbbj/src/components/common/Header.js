import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/AuthContext";
import CreateRoomModal from "../../components/Matching/CreateRoomModal"
import "../../assets/styles/common/Header.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

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
                    <button className="no-border-button" onClick={toggleModal}>방 생성하기</button>
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
              {isModalOpen && <CreateRoomModal onClose={closeModal} />}
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
