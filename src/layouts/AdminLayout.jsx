
import AdminSidebar from "../components/layout/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#050505] py-5 px-2">

      {/* Sidebar */}
      <AdminSidebar
      />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {children}
      </main>
      </div>
    
  );
}
