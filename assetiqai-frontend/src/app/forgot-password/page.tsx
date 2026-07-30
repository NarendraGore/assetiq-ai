import ForgotPasswordForm from "@/src/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-6 rounded-lg shadow bg-card">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
