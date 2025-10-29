import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`bg-white border-b border-gray-200 ${className}`}
      style={{
        position: 'fixed',
        top: '84px',
        left: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isClickable = item.onClick || item.path;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                )}
                
                {index === 0 && (
                  <Home className="w-4 h-4 text-gray-500 mr-2" />
                )}

                {isClickable && !isLast ? (
                  <button
                    onClick={item.onClick}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={`${
                      isLast
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

// Helper function to generate breadcrumb items based on route
export function getBreadcrumbItems(
  currentPage: string,
  userRole?: string,
  dashboardSection?: string,
  onNavigateToHome?: () => void,
  onNavigateToDashboard?: () => void
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: "Home",
      onClick: onNavigateToHome,
    },
  ];

  if (currentPage === "home") {
    return items;
  }

  if (currentPage === "login") {
    items.push({ label: "Login" });
    return items;
  }

  if (currentPage === "faculty-info") {
    items.push({ label: "Faculty Information" });
    return items;
  }

  if (currentPage === "news-events") {
    items.push({ label: "News & Events" });
    return items;
  }

  if (currentPage === "alumni") {
    items.push({ label: "Alumni" });
    return items;
  }

  if (currentPage === "dashboard" && userRole) {
    const roleLabels: Record<string, string> = {
      faculty: "Faculty Dashboard",
      student: "Student Dashboard",
      hod: "HOD Dashboard",
      admin: "Admin Dashboard",
    };

    items.push({
      label: roleLabels[userRole] || "Dashboard",
      onClick: onNavigateToDashboard,
    });

    if (dashboardSection && dashboardSection !== "dashboard") {
      // Capitalize and format section name
      const sectionLabel = dashboardSection
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      items.push({ label: sectionLabel });
    }

    return items;
  }

  if (currentPage === "student-profile") {
    items.push({
      label: "Student Dashboard",
      onClick: onNavigateToDashboard,
    });
    items.push({ label: "Profile" });
    return items;
  }

  if (currentPage === "faculty-profile") {
    items.push({
      label: "Faculty Dashboard",
      onClick: onNavigateToDashboard,
    });
    items.push({ label: "Profile" });
    return items;
  }

  return items;
}
