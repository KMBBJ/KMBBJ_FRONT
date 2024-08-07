import React, { useState } from 'react';
import { useAuth } from '../../hooks/Auth/AuthContext';
import '../../assets/styles/Auth/AuthForm.css';

const Login = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>로그인</h2>
      <form onSubmit={onSubmit} className="auth-form">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="auth-button">로그인</button>
      </form>
      <a href="#" className="forgot-password">비밀번호 찾기</a>
    </div>
  );
};

export default Login;