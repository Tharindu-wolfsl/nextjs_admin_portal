import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import User from '../models/User';
import bcrypt from 'bcrypt';
import axios from "axios";

async function getUser(email){
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers: {POST,GET},auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                // return parsedCredentials;
                if (!parsedCredentials.success) {
                    console.error('Validation failed:', parsedCredentials.error);
                    return null;
                }
                console.log('Validation passed:', parsedCredentials.data);

                const { email, password } = parsedCredentials.data;

                const user = await getUser(email);
                // let newUser=null;

                if (!user) {
                    console.error(`User not found for email: ${email}`);
                    return null;
                    // try{
                    //     const salt = await bcrypt.genSalt(10);
                    //     const hashedPassword = await bcrypt.hash(password, salt);
                    //
                    //     const newUser =new User({
                    //         name,
                    //         email,
                    //         password: hashedPassword
                    //     });
                    //     console.log('New user created successfully:', newUser.data);
                    //     return newUser.data;
                    // }catch (error) {
                    //     console.error('Error creating new user:', error);
                    //     return null;
                    // }
                }
                console.log('User fetched successfully:', user);

                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) {
                    console.error('Password mismatch for user:', user.email);
                    return null;
                }
                console.log('Authentication successful for user:', user.email);
                return user;
                // if (parsedCredentials.success) {
                //     const { email, password } = parsedCredentials.data;
                //     const user = await getUser(email);
                //     if (!user) return null;
                //     const passwordsMatch = await bcrypt.compare(password, user.password);
                //
                //     if (passwordsMatch) return user;
                //     console.log('Authentication successful for user:', user.email);
                //     // console.log('4egf4eg');
                // }
                // console.log('Invalid credentials');

            },
        }),
    ],
});
