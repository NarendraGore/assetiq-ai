"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {useAuth} from "../features/auth/hooks/useAuth";

export default function LoginForm() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
