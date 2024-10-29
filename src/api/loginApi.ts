// // 로그인 요청 및 토큰 저장
// export const loginApi = async (email: string, password: string) => {
//     const response = await fetch('http://localhost:8080/auth/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//       credentials: 'include',
//     });
  
//     if (!response.ok) {
//       throw new Error('Login failed');
//     }
  
//     const authHeader = response.headers.get('Authorization');
//     const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;
  
//     console.log('Auth Header:', authHeader);
//     console.log('Access Token (before saving):', accessToken);
  
//     if(accessToken) {
//       localStorage.setItem('accessToken', accessToken);
//     }
  
//     const refreshToken = response.headers.get('Set-Cookie');
//     if(refreshToken) {
//       document.cookie = refreshToken;
//     }
  
//     return { accessToken, refreshToken }; // accessToken, refreshToken 포함
//   };
  
  // src/api/auth.js

export async function loginApi(email: string, password: string) {
  const response = await fetch('http://localhost:8080/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // 쿠키 자동 전송을 위해 설정
  });

  if (!response.ok) {
    throw new Error('Failed to log in');
  }
  return await response.json();
}
