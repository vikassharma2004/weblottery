import { useNotifications } from "../hooks/auth/AuthMutation";
import { useEffect } from "react";
import {
  Bell,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  Info,
} from "lucide-react";

export default function NotificationDropdown({ onClose }) {
  const { notificationsQuery, markReadMutation } = useNotifications(true);

  const notifications = notificationsQuery.data?.notifications || [];

  useEffect(() => {
    if (notifications.length > 0) {
      markReadMutation.mutate();
    }
  }, [notifications.length]);

  const getNotificationStyle = (type) => {
    switch (type) {
      case "withdraw":
        return {
          icon: <ArrowUpCircle className="w-5 h-5 text-red-500" />,
          bg: "bg-red-50",
          border: "border-red-200",
        };

      case "payment":
        return {
          icon: <ArrowDownCircle className="w-5 h-5 text-emerald-600" />,
          bg: "bg-emerald-50",
          border: "border-emerald-200",
        };

      case "ticket":
        return {
          icon: <Users className="w-5 h-5 text-purple-600" />,
          bg: "bg-purple-50",
          border: "border-purple-200",
        };

      case "referral":
        return {
          icon: <Users className="w-5 h-5 text-amber-500" />,
          bg: "bg-amber-50",
          border: "border-amber-200",
        };

      case "report":
        return {
          icon: <Info className="w-5 h-5 text-blue-600" />,
          bg: "bg-blue-50",
          border: "border-blue-200",
        };

      case "other":
      default:
        return {
          icon: <Bell className="w-5 h-5 text-stone-500" />,
          bg: "bg-stone-100",
          border: "border-stone-300",
        };
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl p-4 border border-stone-200 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-stone-800 text-base">Notifications</h3>

        <button onClick={onClose} className="text-stone-500 hover:text-stone-800 text-sm cursor-pointer" >
          ✕
        </button>
      </div>

      {notificationsQuery.isLoading ? (
        <p className="text-stone-500 text-sm">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-stone-500 text-sm text-center py-4">No notifications found</p>
      ) : (
        <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
          {notifications.map((n) => {
            const styles = getNotificationStyle(n.type);

            return (
              <div
                key={n._id}
                className={`flex items-start gap-3 p-3 rounded-lg border 
                  ${n.read ? "bg-white border-stone-200" : `${styles.bg} ${styles.border}`}
                `}
              >
                {styles.icon}

                <div className="flex-1">
                  <p className="text-sm text-stone-800 leading-tight">{n.message}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
