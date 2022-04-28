import { getToken } from 'next-auth/jwt'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: any, ev: NextFetchEvent) {
  if (req.nextUrl.pathname === '/') {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    })
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/login'
    if (!session) return NextResponse.redirect(loginUrl)
    // If user is authenticated, continue.
  }
}
