"use client";

// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { authApi } from '@/api/authApi';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const checkAuthStatus = async () => {
    setLoading(true);
    const authenticated = await authApi(); // authApi 함수를 통해 인증 상태 확인
    setIsLoggedIn(authenticated);
    setLoading(false); // 상태 확인 후 로딩 종료
  };

  useEffect(() => {
    checkAuthStatus(); // 페이지 첫 로드 시 로그인 상태 확인
  }, []);

  return { isLoggedIn, loading, checkAuthStatus }; // 상태와 상태 확인 함수를 반환
};

export default useAuth;
