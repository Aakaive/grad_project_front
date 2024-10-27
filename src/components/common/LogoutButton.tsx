import React from "react";
import { logout } from "@/api/logoutApi";

const LogoutButton: React.FC = () => {
    return (
        <button onClick={logout}>
            로그아웃
        </button>
    );
};

export default LogoutButton;