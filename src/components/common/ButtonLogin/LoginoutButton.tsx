"use client";

import { useState } from 'react';
import LogoutButton from './Buttons/LogoutButton';
import LoginButton from './Buttons/LoginButton';
import useAuth from '@/hooks/useAuth';

const LoginoutButton: React.FC = () => {
    const { isLoggedIn } = useAuth();

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