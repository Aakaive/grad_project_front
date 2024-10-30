"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';
import { useAuth } from '@/context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogin();
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccess = await login(email, password);

    if (loginSuccess) {
      setIsLoggedIn(true);
      router.replace(redirectUrl);
      
      // 페이지 이동 후 새로고침
      setTimeout(() => {
        window.location.reload();
      }, 100); // 짧은 딜레이로 새로고침 트리거
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
