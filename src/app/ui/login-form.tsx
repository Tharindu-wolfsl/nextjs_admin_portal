'use client';
import { useActionState } from 'react';
import { authenticate } from '../lib/action';

export default function LoginForm() {
    const [errorMessage, formAction, successMessage] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-4 text-center text-2xl font-semibold text-gray-900">
                    Welcome Back 👋
                </h1>
                <p className="mb-6 text-center text-gray-600">
                    Please log in to access your account.
                </p>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            minLength={6}
                        />
                    </div>
                    <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                        Log in
                    </button>

                    <div
                        className="flex h-8 items-center justify-center text-sm"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {successMessage && <p className="text-green-600">{successMessage}</p>}
                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}
