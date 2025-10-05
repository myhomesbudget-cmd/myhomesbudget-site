import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = url.hostname;
  const canonical = 'www.myhomesbudget.com'; // ✅ imposta qui il dominio canonico

  // Redirect da HTTP a HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // Redirect da dominio senza www → con www
  if (host === 'myhomesbudget.com') {
    url.hostname = canonical;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
