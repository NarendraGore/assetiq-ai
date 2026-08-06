import type { ReactNode } from "react";
import { PackageCheck, ShieldCheck, ChartColumnBig } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-muted/40">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)]" />

          <div className="relative flex w-full flex-col justify-between p-16 text-white">
            <div>
              <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <PackageCheck className="h-7 w-7" />
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                ASSETIQ
                <br />
                <span className="text-blue-200">AI</span>
              </h1>

              <p className="mt-6 max-w-md text-lg text-blue-100">
                Intelligent asset and inventory management. Turn your stock into
                actionable insights.
              </p>
            </div>

            <div className="space-y-6">
              <Feature
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Real-Time Inventory Visibility"
                description="Monitor stock levels and movements as they happen"
              />

              <Feature
                icon={<ChartColumnBig className="h-6 w-6" />}
                title="Smart Analytics & Reports"
                description="Track trends and make data-driven decisions"
              />

              <Feature
                icon={<PackageCheck className="h-6 w-6" />}
                title="Streamlined Asset Control"
                description="Manage products, categories, and suppliers in one place"
              />
            </div>
          </div>
        </section>

        { }
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg">{children}</div>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
      <div className="rounded-xl bg-white/20 p-3">{icon}</div>

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm text-blue-100">{description}</p>
      </div>
    </div>
  );
}
