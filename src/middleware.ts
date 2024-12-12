import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
// import { NextURL } from "next/dist/server/web/next-url";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export function middleware(req: NextRequest) {
    const encryptedToken = req.cookies.get('authToken')?.value;
    console.log(encryptedToken);
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    const { pathname } = req.nextUrl;
// console.log(' rf4f4',pathname);
    if (!encryptedToken) {
        console.log("No token found, redirecting to login...");
        return NextResponse.redirect(loginUrl);
    }
    if(pathname !== ' /login'){
        try {
            const secret = new TextEncoder().encode(JWT_SECRET);

            // Verify the token and extract its payload
            jwtVerify(encryptedToken, secret).then(({ payload }) => {
                console.log({ payload });

                // Check if the payload has an "exp" field
                if (payload.exp) {
                    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

                    if (payload.exp < currentTime) {
                        console.error("Token has expired");
                        return NextResponse.redirect(loginUrl);
                    } else {
                        console.log("Token is valid");
                        return NextResponse.next();
                    }
                } else {
                    console.error("Token does not have an 'exp' field");
                    return NextResponse.redirect(loginUrl);
                }
            }).catch(err => {
                console.error("Token verification failed:", err);
                // Redirect to login if token verification fails
                return NextResponse.redirect(loginUrl);
            });

        } catch (error) {
            console.error("Token verification error:", error);
            return NextResponse.redirect(loginUrl);
        }

    }


}

export const config = {
    matcher: [
        '/api/admin/login',
    ],
};
