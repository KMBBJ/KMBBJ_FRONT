import { useState, useEffect } from 'react';
import { login, join, logout, refreshTokens, setAccessToken, clearAccessToken } from '../../services/Auth/authService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        await refreshTokens();
        setUser({ id: localStorage.getItem('userId') });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleJoin = async (email, password, passwordCheck) => {
    try {
      const userData = await join(email, password, passwordCheck);
      setUser(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleJoin,
    handleLogout,
  };
};

export default useAuth;