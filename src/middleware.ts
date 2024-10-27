// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('Refresh-Token'); // 토큰을 쿠키에서 확인
  const isLoggedIn = !!token;

  console.log(token);

  // 비로그인 상태에서 보호된 페이지에 접근 시 로그인 페이지로 리다이렉트
  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/protected')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 로그인 상태일 경우 원하는 페이지로 계속 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 지정 (예: 보호된 페이지들)
export const config = {
  matcher: ['/protected/:path*'], // 원하는 경로에 맞춰 수정 가능
};
