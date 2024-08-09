import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/Auth/AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  // 로딩 중일 때 로딩 표시를 보여줍니다
  if (loading) {
    return <div>Loading...</div>; // 또는 로딩 스피너를 사용할 수 있습니다
  }

  // user가 존재하지 않으면 로그인 페이지로 리디렉션
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  // user가 존재하면 자식 컴포넌트를 렌더링
  return <Outlet />;
};

export default PrivateRoute;