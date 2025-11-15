import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useUserStore } from "../../store/AuthStrore";

export default function NotFound() {
  const {user}=useUserStore();
    const role=user?.role;
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="text-center p-6">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page not found
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          You’re wandering where you shouldn’t.  
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to={role=="admin"?"/admin/dashboard":"/"}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          {role=="admin"?"Dashboard":"Home"}
        </Link>

        <div className="mt-6 text-gray-400 text-sm">
          If you think this is a mistake, fix your damn URL.
        </div>
      </div>
    </div>
  );
}
