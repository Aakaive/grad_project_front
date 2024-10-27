// src/app/login/page.tsx
'use client';

import React, { useEffect, useReducer, useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  const router = useRouter();
  const [redirect, setRedirect] = useState<string | null>(null); // 상태로 redirect를 관리

  useEffect(() => {
    // 클라이언트에서만 window를 사용
    const redirectParam = new URLSearchParams(window.location.search).get('redirect');
    setRedirect(redirectParam);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccess = await login(email, password);
    
    if (loginSuccess) {
      if (redirect && typeof redirect === 'string') {
        router.push(redirect);
      } else {
        router.push('/');
      }
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
