import { useState, useEffect } from "react";
import { FacultyCard } from "./FacultyCard";
import { API_ENDPOINTS } from "../../server";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FacultyData {
  id: string;
  name: string;
  title: string;
  department?: string;
  image: string;
  isHOD: boolean;
}

/**
 * FacultyCardList Component
 * Fetches all faculty from the backend and displays them in a scrollable carousel
 * 
 * Usage:
 * <FacultyCardList />
 * 
 * This component automatically fetches data from the PHP backend
 */
export function FacultyCardList() {
  const [faculty, setFaculty] = useState<FacultyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllFaculty();
  }, []);

  const fetchAllFaculty = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.facultyCard);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === "success" && Array.isArray(result.data)) {
        setFaculty(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch faculty data");
      }
    } catch (err) {
      console.error("❌ Error fetching faculty:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load faculty";
      setError(errorMessage);
      toast.error("Failed to load faculty", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto">
        <p className="text-red-600 font-medium">Failed to load faculty</p>
        <p className="text-sm text-red-500 mt-2">{error}</p>
        <button
          onClick={fetchAllFaculty}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (faculty.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">No faculty members found</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
        {faculty.map((member, index) => (
          <FacultyCard
            key={member.id}
            name={member.name}
            title={member.title}
            department={member.department}
            image={member.image}
            isHOD={member.isHOD}
            index={index}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      {faculty.length > 3 && (
        <div className="text-center mt-4 text-sm text-gray-500">
          ← Scroll to view more →
        </div>
      )}
    </div>
  );
}
