import { access } from "fs";

// 토큰 검증
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error("Access token not found");
    }

    const isTokenExpired = () => {
        return true;
    };

    if (isTokenExpired()) {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshResponse = await fetch('http://localhost:8080/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (refreshResponse.ok) {
            const { newAccessToken } = await refreshResponse.json();
            accessToken = newAccessToken;

            if (!accessToken) {
                throw new Error("Access token not found");
            }

            localStorage.setItem('accessToken', accessToken);
        } else {
            // 리프레시 토큰이 만료된 경우 처리 (로그아웃 등)
        }
    }

    // 최종 API 호출
    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return res;
};


// 로그인 요청 및 토큰 저장
export const loginApi = async (email: string, password: string) => {
  const response = await fetch('http://localhost:8080/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const authHeader = response.headers.get('Authorization');
  const accessToken = authHeader ? authHeader.replace('Bearer ', '') : null;

  console.log('Auth Header:', authHeader);
  console.log('Access Token (before saving):', accessToken);

  if(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  const refreshToken = response.headers.get('Set-Cookie');
  if(refreshToken) {
    document.cookie = refreshToken;
  }

  return { accessToken, refreshToken }; // accessToken, refreshToken 포함
};


// 도서 정보 요청
export const fetchBooks = async () => {
    return await fetchWithAuth('localhost:8080/api/books');
};