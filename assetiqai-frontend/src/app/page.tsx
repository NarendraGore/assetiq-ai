import AppLayout from "../components/layout/AppLayout";

export default function HomePage() {
  return (
    <AppLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome to AssetIQAI</h2>
      <p className="text-gray-600 dark:text-gray-300">
        This is your dashboard. Use the sidebar to navigate through modules.
      </p>
    </AppLayout>
  );
}
