import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-6 rounded-lg shadow bg-card">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
