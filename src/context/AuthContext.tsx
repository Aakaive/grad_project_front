"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '@/api/authApi'; // API 요청 함수

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
  setIsLoggedIn: (value: boolean) => void; 
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  checkAuthStatus: async () => {},
  setIsLoggedIn: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  const checkAuthStatus = async () => {
    const authenticated = await authApi();
    setIsLoggedIn(authenticated);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <div>{error}</div>; // 에러 발생 시 표시할 내용
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, checkAuthStatus, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
