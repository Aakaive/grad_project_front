"use client";

import { useEffect, useState } from 'react';
import LogoutButton from './Buttons/LogoutButton';
import LoginButton from './Buttons/LoginButton';
import useAuth from '@/hooks/useAuth';

const LoginoutButton: React.FC = () => {
    const { isLoggedIn, loading, checkAuthStatus } = useAuth();
    useEffect(() => {
        checkAuthStatus();
    }, [isLoggedIn]);

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중일 때 표시할 내용
      }

    return (
        <div>
            {isLoggedIn ? (
                <LogoutButton />
            ) : (
                <LoginButton />
            )}
        </div>

    );
}

export default LoginoutButton;