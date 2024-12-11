import NextAuth from "next-auth";
import { authConfig } from "../(auth)/auth.config";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { NextURL } from "next/dist/server/web/next-url";

const JWT_SECRET = process.env.JWT_SECRET;

export default NextAuth(authConfig).auth;

export function middleware(req) {
    const encryptedToken = req.cookies.get("authToken")?.value || "";
    const { pathname, origin } = req.nextUrl;
    const loginUrl = new NextURL("/login", origin);

    if (!encryptedToken) {
        console.log("No token found, redirecting to login...");
        return NextResponse.redirect(loginUrl);
    }

    try {
        const decodedToken = jwt.verify(encryptedToken, JWT_SECRET);
        console.log("Decoded Token:", decodedToken);

        if (decodedToken.exp * 1000 < Date.now()) {
            console.log("Token has expired");
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();

    } catch (err) {
        console.error("Token decoding error:", err);

        if (err.name === "JsonWebTokenError") {
            console.log("Invalid or expired token");
            return NextResponse.redirect(loginUrl);
        }

        return new Response(
            JSON.stringify({ message: "Token is invalid or expired" }),
            {
                status: 401,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
export const config = {
    matcher: ['/api/admin/login'],
};
