// 로그인 페이지 컴포넌트 내부
"use client";

import React, { useState, useEffect } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldReload, setShouldReload] = useState(false); // 새로고침 상태 추가
  const { login } = useLogin();
  const { setIsLoggedIn } = useAuth(); // 상태 변경 함수 가져오기
  const router = useRouter();

  // 로그인 후 새로고침 로직 추가
  useEffect(() => {
    if (shouldReload) {
      window.location.reload(); // 새로고침
    }
  }, [shouldReload]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccess = await login(email, password);

    if (loginSuccess) {
      setIsLoggedIn(true); // 로그인 상태 업데이트
      router.replace('/'); // 원래 이동하려던 페이지로 이동
      setShouldReload(true); // 새로고침 트리거
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
