import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 bg-muted/30 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}