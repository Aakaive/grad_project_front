// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasRefreshToken = request.cookies.has('Refresh-Token');

  if (!hasRefreshToken && request.nextUrl.pathname.startsWith('/protected')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 로그인 상태일 경우 원하는 페이지로 계속 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 지정
export const config = {
  matcher: ['/protected/:path*'], // 필요한 보호 경로에 맞춰 수정 가능
};
