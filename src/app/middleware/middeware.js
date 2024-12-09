// import NextAuth from 'next-auth';
// import { authConfig } from '@/app/(auth)/auth.config';
//
// export default NextAuth(authConfig).auth;
//
// export const config = {
//     // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };
import NextAuth from "next-auth";
import {authConfig} from "../(auth)/auth.config";
import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default NextAuth(authConfig).auth;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export function middleware(req) {
    const encryptedToken = req.cookies.get("authToken")?.value || "";
    console.log("Encrypted Token:", encryptedToken);

    const { pathname, origin } = req.nextUrl;
    let setIsTokenExpired = "false";

    try {
        const decodedToken = jwt.verify(encryptedToken, JWT_SECRET);
        if(decodedToken.exp * 1000 < Date.now()) {
            setIsTokenExpired="true";
            console.log('token has expired');
        } else {
            setIsTokenExpired="false";
            console.log('token has not expired');

        }
        // Verify the token
        // const isTokenValid=tokenValidity(encryptedToken)
        // console.log("Decoded Token:", decodedToken);
        console.log(setIsTokenExpired);

        return new Response(JSON.stringify({ message: "Token is valid" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Token decoding error:", err);
        return new Response(JSON.stringify({ message: "Token is invalid or expired" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
    // const decodedToken = jwt.verify(encryptedToken, JWT_SECRET);
    // return decodedToken;
    // console.log("Token is valid:", decoded);
    // Decrypt the token
    // const decryptedToken = CryptoJS.AES.decrypt(
    //     encryptedToken,
    //     process.env.JWT_SECRET || ""
    // ).toString(CryptoJS.enc.Utf8);
    // console.log(decryptedToken);

    // const isTokenValid = decodeToken(decryptedToken);
    //
    // if (!isTokenValid) {
    //     if (pathname !== "/login") {
    //         return NextResponse.redirect(`${origin}/login`);
    //     }
    // } else {
    //     if (pathname === "/login") {
    //         return NextResponse.redirect(`${origin}/admin/users`);
    //     }
    // }
    //
    // // Allow request to continue if no redirection is needed
    return NextResponse.next();
}



