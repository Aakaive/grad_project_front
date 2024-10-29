// // useLogin.ts
// import { useState } from 'react';
// import { loginApi } from '@/api/loginApi';

// export const useLogin = () => {
//   const [error, setError] = useState<string | null>(null);

//   const login = async (email: string, password: string) => {
//     try {
//       const { accessToken, refreshToken } = await loginApi(email, password);

//       if(accessToken) {
//         localStorage.setItem('accessToken', accessToken);
        
//       }
//       if(refreshToken) {
//         localStorage.setItem('refreshToken', refreshToken);
//       }


//       console.log('Access Token (after saving):', localStorage.getItem('accessToken')); // 로그 추가
      
//       setError(null); // 로그인 성공 시 오류 제거
//       return true;
//     } catch (err) {
//         if(err instanceof Error) {
//             setError(err.message);
//         } else {
//             setError('An unknown error occureed');
//         }
//         return false;
//     }
//   };

//   return { login, error };
// };

// src/hooks/useLogin.ts
import { useState } from 'react';
import { loginApi } from '@/api/loginApi';
import { useAuth } from '@/context/AuthContext';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkAuthStatus } = useAuth();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi(email, password);
      setIsLoading(false);
      if (response.success) {
        await checkAuthStatus(); // 로그인 성공 후 인증 상태 재확인
      }
      return response; // 로그인 성공 시 데이터를 반환
      
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      return null;
    }
  };

  return { login, isLoading, error };
}
