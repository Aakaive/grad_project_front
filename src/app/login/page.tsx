// LoginPage.tsx
'use client';

import React, { useReducer, useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  const router = useRouter();
  const redirect = new URLSearchParams(window.location.search).get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccess = await login(email, password);
    // 로그인 성공 후 리다이렉트 등 추가 로직 작성

    if (loginSuccess) {
      if(redirect && typeof redirect === 'string') {
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
