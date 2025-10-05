import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  // forza www su qualsiasi richiesta al dominio apex
  if (host === 'myhomesbudget.com') {
    url.hostname = 'www.myhomesbudget.com';
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  // forza https su www (edge gestisce anche http→https)
  if (host === 'www.myhomesbudget.com' && url.protocol === 'http:') {
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// esclude asset statici
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
