"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {register} from "../features/auth/api/auth.api";

export default function RegisterForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto">
      <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange} />
      <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange} />
      <Input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
      <Input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={onChange} />
      <Input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={onChange} />
      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}
