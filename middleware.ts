import {NextResponse, type NextRequest} from 'next/server';

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const pathname = request.nextUrl.pathname;

  const token = cookies.get('token');
  const username = cookies.get('username');

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  NextResponse.next({ headers });

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /about
    if (token?.value !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
 
  if (request.nextUrl.pathname.startsWith('/brand')) {
    // This logic is only applied to /dashboard
    if (token?.value !== 'brand') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // if(token?.value === 'admin') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  // if(token?.value === 'brand') {
  //   // const url = `/brand/${username}`
  //   return NextResponse.redirect(new URL(`/brand/${username?.value}`, request.url))
  // }
  // if (!cookies.has('token') && pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}


