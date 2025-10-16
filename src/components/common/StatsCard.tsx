import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  bgColor = "bg-blue-50",
  iconColor = "text-blue-600",
}: StatsCardProps) {
  // Map color classes to inline styles for professional color scheme
  const colorMap: Record<string, { bg: string, icon: string }> = {
    "bg-blue-50": { bg: "rgba(30, 58, 138, 0.1)", icon: "#1e3a8a" },
    "bg-green-50": { bg: "rgba(249, 115, 22, 0.1)", icon: "#f97316" },
    "bg-purple-50": { bg: "rgba(96, 165, 250, 0.1)", icon: "#60a5fa" },
    "bg-orange-50": { bg: "rgba(251, 146, 60, 0.1)", icon: "#fb923c" },
  };
  
  const colors = colorMap[bgColor] || { bg: "rgba(30, 58, 138, 0.1)", icon: "#1e3a8a" };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: '#6b7280' }}>{title}</p>
            <p className="mt-2" style={{ color: '#374151' }}>{value}</p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg }}>
            <Icon className="h-6 w-6" style={{ color: colors.icon }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
