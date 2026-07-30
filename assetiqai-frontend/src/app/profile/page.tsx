"use client";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { useAuth } from "@/features/auth/context/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {user ? (
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </ProtectedLayout>
  );
}
