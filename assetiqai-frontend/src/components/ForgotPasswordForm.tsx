"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Call backend forgot-password API when available
        console.log("Forgot password request for:", email);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
            <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
    );
}
