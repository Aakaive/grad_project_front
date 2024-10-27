// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = () => {
        const token = localStorage.getItem('accessToken');

        setIsLoggedIn(!!token);
    };

    checkLoggedIn();

    const intervalId = setInterval(checkLoggedIn, 1000);

    return () => clearInterval(intervalId);
    
  }, []);

  return { isLoggedIn };
};


export default useAuth;