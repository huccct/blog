import { NextRequest, NextResponse } from 'next/server'

const RESUME_HOST = 'resume.orionchen.me'
const MAIN_SITE = 'https://orionchen.me'

const PASSTHROUGH_PREFIXES = ['/_next', '/api', '/locales', '/static', '/favicon']

export function middleware(req: NextRequest) {
  const host = req.headers.get('host')?.split(':')[0]?.toLowerCase()
  if (host !== RESUME_HOST) return NextResponse.next()

  const { pathname } = req.nextUrl

  // Allow static assets and API routes through
  if (PASSTHROUGH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  // Rewrite root to /resume
  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/resume'
    return NextResponse.rewrite(url)
  }

  // Redirect everything else to the main site
  return NextResponse.redirect(`${MAIN_SITE}${pathname}`)
}
