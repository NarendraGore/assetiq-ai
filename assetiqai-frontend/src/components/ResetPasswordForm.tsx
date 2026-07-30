"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
export default function ResetPasswordForm() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call backend reset-password API when available
    console.log("Reset password:", form);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      <Input name="password" type="password" placeholder="New Password" value={form.password} onChange={onChange} />
      <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={onChange} />
      <Button type="submit" className="w-full">Reset Password</Button>
    </form>
  );
}
