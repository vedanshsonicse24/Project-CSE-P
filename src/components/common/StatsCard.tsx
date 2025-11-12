import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { API_ENDPOINTS } from "../../server";
import { Loader2 } from "lucide-react";

interface StatsCardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
  fetchFromAPI?: boolean; // New prop to enable/disable API fetching
}

interface StatsData {
  title: string;
  value: string | number;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  bgColor = "bg-blue-50",
  iconColor = "text-blue-600",
  fetchFromAPI = false,
}: StatsCardProps) {
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetchFromAPI) {
      fetchStatsData();
    }
  }, [fetchFromAPI, title]);

  const fetchStatsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_ENDPOINTS.statsCard}?title=${encodeURIComponent(title)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === "success" && result.data) {
        setStatsData(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch stats data");
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Use API data if available, otherwise use props
  const displayValue = fetchFromAPI && statsData ? statsData.value : value;
  const displayBgColor = fetchFromAPI && statsData ? `bg-${statsData.bgColor}-50` : bgColor;
  const displayIconColor = fetchFromAPI && statsData ? `text-${statsData.bgColor}-600` : iconColor;

  // Map color classes to inline styles for professional color scheme
  const colorMap: Record<string, { bg: string, icon: string }> = {
    "bg-blue-50": { bg: "rgba(30, 58, 138, 0.1)", icon: "#1e3a8a" },
    "bg-green-50": { bg: "rgba(249, 115, 22, 0.1)", icon: "#f97316" },
    "bg-purple-50": { bg: "rgba(96, 165, 250, 0.1)", icon: "#60a5fa" },
    "bg-orange-50": { bg: "rgba(251, 146, 60, 0.1)", icon: "#fb923c" },
  };
  
  const colors = colorMap[displayBgColor] || { bg: "rgba(30, 58, 138, 0.1)", icon: "#1e3a8a" };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#6b7280' }}>{title}</p>
              <p className="mt-2 text-sm text-red-500">Error loading data</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg }}>
              <Icon className="h-6 w-6" style={{ color: colors.icon }} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: '#6b7280' }}>{title}</p>
              <p className="mt-2 text-2xl font-bold" style={{ color: '#374151' }}>
                {displayValue !== undefined ? displayValue : "N/A"}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg }}>
              <Icon className="h-6 w-6" style={{ color: colors.icon }} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
