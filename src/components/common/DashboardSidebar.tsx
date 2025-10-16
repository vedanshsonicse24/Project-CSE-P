import { LucideIcon } from "lucide-react";
import { cn } from "../ui/utils";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  id: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
}

export function DashboardSidebar({
  items,
  activeItem,
  onItemClick,
}: DashboardSidebarProps) {
  return (
    <aside className="w-full border-b p-4" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
      <nav className="flex items-center gap-2 overflow-x-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
              )}
              style={isActive 
                ? { backgroundColor: 'rgba(30, 58, 138, 0.1)', color: '#1e3a8a' }
                : { color: '#374151' }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="h-5 w-5" style={{ color: isActive ? '#1e3a8a' : '#60a5fa' }} />
              <span className="font-[Purple_Purse]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
