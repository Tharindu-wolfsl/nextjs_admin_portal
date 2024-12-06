'use server';

// @ts-ignore
import { signIn } from "../(auth)/auth";
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState,
    formData,
) {
    try {
        await signIn('credentials', formData);
        return 'Successfully signed in.';

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}