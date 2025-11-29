import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

const typeConfig = {
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    titleColor: "text-red-900",
    messageColor: "text-red-700",
    iconColor: "text-red-600",
    badge: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    titleColor: "text-emerald-900",
    messageColor: "text-emerald-700",
    iconColor: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-800",
    icon: CheckCircle,
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    titleColor: "text-amber-900",
    messageColor: "text-amber-700",
    iconColor: "text-amber-600",
    badge: "bg-amber-100 text-amber-800",
    icon: AlertTriangle,
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    titleColor: "text-blue-900",
    messageColor: "text-blue-700",
    iconColor: "text-blue-600",
    badge: "bg-blue-100 text-blue-800",
    icon: Info,
  },
};

export default function AnnouncementCard({ announcement }) {
  const config = typeConfig[announcement.type] || typeConfig.info;
  const Icon = config.icon;
  return (
    <div
      className={`overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${config.bg} ${config.border}`}
    >
      <div className="p-10 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <Icon className={`h-6 w-6 ${config.iconColor}`} />
            <h3 className={`text-lg font-semibold ${config.titleColor}`}>
              {announcement.title}
            </h3>
          </div>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${config.badge}`}>
            {announcement.type.charAt(0).toUpperCase() +
              announcement.type.slice(1)}
          </span>
        </div>

        <p className={`mt-3 ${config.messageColor}`}>
          {announcement.message}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {new Date(announcement.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>

         
        </div>
      </div>
    </div>
  );
}
