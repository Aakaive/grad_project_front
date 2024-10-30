// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasRefreshToken = request.cookies.has('Refresh-Token');

  if (!hasRefreshToken && request.nextUrl.pathname.startsWith('/protected')) {
    const loginUrl = new URL('/login', request.url);
    // 사용자가 접근하려던 URL로 돌아가도록 `redirect` 매개변수 추가
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 지정
export const config = {
  matcher: ['/protected/:path*'],
};
