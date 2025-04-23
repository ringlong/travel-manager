import Sidebar from "@/components/sidebar";
import { Breadcrumb } from "@/components/breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="p-6 border-b bg-white">
          <Breadcrumb />
        </div>
        <div className="p-6 flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
