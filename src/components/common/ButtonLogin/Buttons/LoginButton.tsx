import React from "react";
import { useRouter } from 'next/navigation';
import '@/styles/btn-login.css';

const LoginButton: React.FC = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    }

    return (
        <button onClick={handleLoginClick} className="btn-login">
            로그인
        </button>
    );
};

export default LoginButton;