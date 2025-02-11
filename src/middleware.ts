import {getToken} from 'next-auth/jwt';
import {NextResponse} from 'next/server';

export async function middleware(req) {
    // console.log(process.env.NEXTAUTH_SECRET);
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    console.log('hellooooooooooooooooooo', token);
    // Ensure token is valid
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (token.exp && token.exp < currentTime) {
        console.log("Token has expired!");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect based on authentication state
    // const isOnDashboard = req.nextUrl.pathname.startsWith('/');
    // if (isOnDashboard && !token) {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }
    //
    // if (!isOnDashboard && token) {
    //     return NextResponse.redirect(new URL('/sidebar', req.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!login).*)'], // Matches all paths except "/login"
};
