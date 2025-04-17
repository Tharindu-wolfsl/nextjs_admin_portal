import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return NextResponse.json({status: 200, json: request.json})
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/admin/users/abc',
}