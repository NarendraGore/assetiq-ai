import LoginForm from "@/src/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-6 rounded-lg shadow bg-card">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
