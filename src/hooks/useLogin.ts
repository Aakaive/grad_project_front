// useLogin.ts
import { useState } from 'react';
import { loginApi } from '@/api/loginApi';

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await loginApi(email, password);

      if(accessToken) {
        localStorage.setItem('accessToken', accessToken);
        
      }
      if(refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }


      console.log('Access Token (after saving):', localStorage.getItem('accessToken')); // 로그 추가
      
      setError(null); // 로그인 성공 시 오류 제거
      return true;
    } catch (err) {
        if(err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occureed');
        }
        return false;
    }
  };

  return { login, error };
};
