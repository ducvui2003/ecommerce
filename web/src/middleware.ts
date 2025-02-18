import { ACCESS_TOKEN } from '@/constraint/variable';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/user/info'];
const authPaths = ['/login', '/register'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  // Chưa đăng nhập
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Đã đăng nhập
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/user/info'],
};
