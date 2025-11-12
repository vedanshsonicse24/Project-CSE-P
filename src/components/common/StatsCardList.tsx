import { useState, useEffect } from "react";
import { Users, GraduationCap, BookOpen, Building2, Loader2 } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { API_ENDPOINTS } from "../../server";
import { toast } from "sonner";

// Icon mapping for stats
const iconMap: Record<string, any> = {
  "user-graduate": Users,
  "chalkboard-teacher": GraduationCap,
  "book-open": BookOpen,
  "building-columns": Building2,
};

interface StatsData {
  title: string;
  value: number;
  icon: string;
  bgColor: string;
  iconColor: string;
}

/**
 * StatsCardList Component
 * Fetches all statistics from the backend and displays them in a grid
 * 
 * Usage:
 * <StatsCardList />
 * 
 * This component automatically fetches data from the PHP backend
 */
export function StatsCardList() {
  const [stats, setStats] = useState<StatsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.statsCard);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === "success" && Array.isArray(result.data)) {
        setStats(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch statistics");
      }
    } catch (err) {
      console.error("❌ Error fetching statistics:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load statistics";
      setError(errorMessage);
      toast.error("Failed to load statistics", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center h-32"
          >
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">Failed to load statistics</p>
        <p className="text-sm text-red-500 mt-2">{error}</p>
        <button
          onClick={fetchAllStats}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon] || Users;
        return (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={IconComponent}
            bgColor={`bg-${stat.bgColor}-50`}
            iconColor={`text-${stat.bgColor}-600`}
          />
        );
      })}
    </div>
  );
}
