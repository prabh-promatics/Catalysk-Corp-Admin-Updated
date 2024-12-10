import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the protected paths
const protectedPaths = ['/'];

export function middleware(req: NextRequest) {
  // Get the user's authentication status (e.g., from cookies or headers)
  const isAuthenticated = req.cookies.get('authToken') ? true : false;
console.log("Cookie is--", req.cookies.get('authToken'));
  // Check if the requested path is protected
  const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtected && !isAuthenticated) {
    // Redirect unauthenticated users to the login page
    const loginUrl = new URL('/authentication/sign-in', req.url);
   // loginUrl.searchParams.set('redirect', req.nextUrl.pathname); // Optional: Redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if authenticated or not protected
  return NextResponse.next();
}

export const config = {
  // Apply middleware only to specific paths
  matcher: ['/'],
};