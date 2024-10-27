import React from "react";
import { logout } from "@/api/logoutApi";
import '@/styles/btn-login.css';

const LogoutButton: React.FC = () => {
    return (
        <button onClick={logout} className="btn-login">
            로그아웃
        </button>
    );
};

export default LogoutButton;