import { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt', // Use JWT for session management
    },
    callbacks: {
        async jwt({ token, user }) {
            // When user signs in, store their information in the JWT token
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            // Attach user info to the session object from the JWT token
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,  // This is where you define the secret
    providers: [],  // Empty providers array, since you're not using any external auth provider
};

export default authConfig;
