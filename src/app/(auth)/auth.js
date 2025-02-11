import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getUser(email) {
    try {
        const user = await User.findOne({
            where: {email},
            attributes: {exclude: ['roles']}, // Exclude the role column
        });
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { handlers: { POST, GET }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.error("Validation failed:", parsedCredentials.error);
                    return null;
                }

                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);

                if (!user) {
                    console.error(`User not found for email: ${email}`);
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) {
                    console.error("Password mismatch for user:", user.email);
                    return null;
                }

                // Generate JWT Token
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1m" } // Token expires in 1 hour
                );
console.log('dddddddddddddd',token);
                return { id: user.id, email: user.email, token };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.jwt = user.token; // Attach JWT to token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.token = token.jwt; // Attach JWT to session
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
});
