"use client";

import { useState } from "react";
import axios, { isAxiosError } from "axios"; // Import isAxiosError here
import { useRouter } from "next/navigation";
import { setToken, setUserId } from "@/utils/auth";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

interface LoginResponse {
    token: string;
    userId: string;
}

interface ErrorResponse {
    message: string;
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const errorToast = (message: string) => toast.error(message);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res: AxiosResponse<LoginResponse> = await axios.post("/api/auth/login", { email, password });
            setToken(res.data.token);
            setUserId(res.data.userId)
            toast.success("Logged in successfully");
            router.push("/tasks/");
        } catch (err) {
            if (isAxiosError(err)) {
                // Check if it's an Axios error and handle it
                const errorResponse = err.response?.data as ErrorResponse;
                if (err.status === 401) {
                    errorToast("Login or password incorrect");
                } else {
                    errorToast(errorResponse.message || "Login failed");
                }
            } else {
                // Handle other types of errors
                errorToast("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
            <form onSubmit={handleLogin} className="mt-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </form>
        </div>
    );
}