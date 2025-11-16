import FloatingSupportButton from "../components/FloatingSupportButton.jsx";
import UserNavbar from "../components/layout/UserNavbar.jsx";
import { Footer } from "./footer.jsx";

export default function UserLayout({ children }) {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      <UserNavbar />

      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>

<FloatingSupportButton/>
    </div>
  );
}
