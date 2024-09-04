import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/AuthContext";
import CreateRoomModal from "../../components/Matching/CreateRoomModal";
import AdminNotificationModal from "../../components/Admin/AdminNotificationModal"; // 새로 만든 모달 컴포넌트 임포트
import api from "../../api/api";
import "../../assets/styles/common/Header.css";
import logo from "../../assets/images/logo.png";
import EventSourcePolyfill from "eventsource-polyfill";
import { fetchAdminAnnouncementsAndUserInfo } from "../../services/Admin/userService"; // 함수 임포트
import { gameService } from "../../services/Games/gameService";


const Header = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminNotification, setAdminNotification] = useState(null); // 공지사항 상태 추가
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가
  const dropdownRef = useRef(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchStartTime, setMatchStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => setIsModalOpen(false);

  const closeAdminModal = () => setAdminNotification(null); // 공지사항 모달 닫기

  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("Access-Token=")
  );
  const accessToken = accessTokenCookie
    ? accessTokenCookie.split("=")[1]
    : null;

  useEffect(() => {
    if (user) {
      const url = `http://localhost:8080/api/sse/subscribe/${user.id}`;
      const newEventSource = new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 사용자 인증 토큰
        },
      });

      newEventSource.addEventListener("roomNotification", (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          setIsMatching(false);
          setTimeout(() => {
            navigate(`/matching/enter/${data}`); // 자동 리디렉션
          }, 100);
        }
      });

      newEventSource.addEventListener("gameNotification", async (event) => {
        console.log("gameNotification event received");
        console.log("Event data:", event.data);
        
        try {
            const eventData = event.data;
            console.log("Received event data:", eventData);
    
            // 서버에 게임 시작 요청
            const gameId = await gameService.startGame(eventData);
            console.log("Game started with ID:", gameId);
    
            // 강제로 모든 브라우저에 gameId 설정
            localStorage.setItem('gameId', gameId);
            
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID를 로컬 스토리지에서 찾을 수 없습니다.');
            }
    
            const redirectUrl = `/games/status/${gameId}/balance/${userId}`;
            console.log(`Redirect to ${redirectUrl}`);
    
            // 즉시 리다이렉트
            window.location.href = redirectUrl;
        } catch (error) {
            console.error('게임 시작 및 리다이렉션 중 오류 발생:', error);
        }
        
        console.log("Event processing done");
    });
    
    
    
    

      newEventSource.addEventListener("adminNotification", (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          setAdminNotification(data); // 공지사항 데이터를 상태에 저장
        }
      });

      newEventSource.onerror = (error) => {
        console.error("SSE Error:", error);
        newEventSource.close(); // Ensure the connection is closed properly
      };

      return () => {
        newEventSource.close();
      };
    }
  }, [user, navigate, accessToken, isMatching]);

  useEffect(() => {
    console.log("Matching state updated:", isMatching);
  }, [isMatching]); // isMatching 상태 변화 로깅

  useEffect(() => {
    let interval = null;
    if (isMatching && matchStartTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - matchStartTime) / 1000));
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [isMatching, matchStartTime]);

  const startRandomMatching = async () => {
    try {
      const response = await api.post("/matching/start/random");
      if (response.data.status === "OK") {
        setIsMatching(true);
        setMatchStartTime(Date.now());
      } else {
        alert("매칭 시작에 실패했습니다.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.exception
      ) {
        // 백엔드에서 전달된 오류 메시지를 표시
        alert(`${error.response.data.exception.errorMessage}`);
      } else {
        // 기타 네트워크 또는 예상치 못한 오류 메시지 표시
        alert("매칭 시작 중 오류가 발생했습니다.");
      }
      console.error("Failed to random matching:", error);
    }
  };

  const cancelMatching = async () => {
    try {
      const response = await api.post("/matching/cancel");
      if (response.data.status === "OK") {
        setIsMatching(false);
        setMatchStartTime(null);
      } else {
        alert("매칭 취소에 실패했습니다.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.exception
      ) {
        // 백엔드에서 전달된 오류 메시지를 표시
        alert(`${error.response.data.exception.errorMessage}`);
      } else {
        // 기타 네트워크 또는 예상치 못한 오류 메시지 표시
        alert("매칭 취소 중 오류가 발생했습니다.");
      }
      console.error("Failed to cancel match:", error);
    }
  };

  const logout = async () => {
    try {
      await handleLogout();
      navigate("/auth/login"); // 로그아웃 후 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const coin = async () => {
    navigate("/coins/list"); // 코인 리스트로 이동
  };

  const enterGame = () => {
    const gameId = localStorage.getItem('gameId');
    const userId = localStorage.getItem('userId');

    if (gameId && userId) {
      navigate(`/games/status/${gameId}/balance/${userId}`);
    } else {
      alert("게임 ID 또는 사용자 ID가 없습니다.");
    }
  };

  const friends = async () => {
    navigate("/friends/list");
  };

  const information = async () => {
    navigate("/");
  };

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const { alarms, userInfo } = await fetchAdminAnnouncementsAndUserInfo();
        if (userInfo && userInfo.type === "admin") {
          setIsAdmin(true); // 관리자 여부 상태 설정
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    if (user) {
      checkIfAdmin();
    }
  }, [user]);

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
                {/* 공지사항 버튼 추가 */}
                <Link to="/announcements" className="nav-button no-border-button">
                  공지사항
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="nav-button no-border-button">
                    Admin
                  </Link>
                )}
                <button
                  className="nav-button no-border-button"
                  onClick={toggleDropdown}
                >
                  게임 시작
                </button>
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="no-border-button"
                        onClick={toggleModal}
                      >
                        방 생성하기
                      </button>
                    </li>
                    <li>
                      <Link to="/matching/list">방 목록보기</Link>
                    </li>
                    <li>
                      <button
                        className="no-border-button"
                        onClick={startRandomMatching}
                      >
                        랜덤 매칭
                      </button>
                    </li>
                    <li>
                    <button
                        className="no-border-button"
                        onClick={enterGame}
                      >
                        게임 입장
                      </button>
                    </li>
                  </ul>
                )}
              </li>
              {isModalOpen && <CreateRoomModal onClose={closeModal} />}
              {isMatching && (
                <div>
                  <p>매칭 중... ({elapsedTime}초 경과)</p>
                  <button onClick={cancelMatching}>매칭 취소</button>
                </div>
              )}
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
              {/* 공지사항 모달 */}
              {adminNotification && (
                <AdminNotificationModal
                  title={adminNotification.title}
                  content={adminNotification.content}
                  onClose={closeAdminModal}
                />
              )}
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
