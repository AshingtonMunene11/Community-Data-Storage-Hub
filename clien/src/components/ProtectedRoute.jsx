"use client";


import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
    const { user, token } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    if (!token) return <div className="text-center mt-20">Checking authentication...</div>;

    return children;
}

