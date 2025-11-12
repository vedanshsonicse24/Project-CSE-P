/**
 * FacultyInfoPage with Backend Integration Example
 * Shows faculty list from database with filtering capabilities
 */

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Search, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { API_ENDPOINTS } from "../../server";
import type { FacultyMember, FacultyListResponse } from "../../types/pages";

export function FacultyInfoPageIntegrated() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [filteredFaculty, setFilteredFaculty] = useState<FacultyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedCount, setDisplayedCount] = useState(12);

  // ============================================
  // FETCH DATA FROM BACKEND
  // ============================================
  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all faculty members from CSE department
      const url = `${API_ENDPOINTS.pages.faculty}&department=Computer Science`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: FacultyListResponse = await response.json();

      if (result.status === 'success') {
        setFaculty(result.data);
        setFilteredFaculty(result.data);
        toast.success(`Loaded ${result.data.length} faculty members`);
      } else {
        throw new Error(result.message || 'Failed to fetch faculty');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to load faculty', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // FILTER & SEARCH LOGIC
  // ============================================
  useEffect(() => {
    let filtered = [...faculty];

    // Filter by designation
    if (activeTab !== 'All') {
      filtered = filtered.filter(f => f.designation === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.specialization.toLowerCase().includes(query) ||
        f.qualification.toLowerCase().includes(query)
      );
    }

    setFilteredFaculty(filtered);
  }, [activeTab, searchQuery, faculty]);

  // ============================================
  // LOADING STATE
  // ============================================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-gray-600">Loading faculty information...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-600 font-semibold mb-2">Error Loading Faculty</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
          <Button onClick={fetchFaculty} className="gap-2">
            <Loader2 className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // ============================================
  // UNIQUE DESIGNATIONS FOR FILTER TABS
  // ============================================
  const uniqueDesignations = ['All', ...Array.from(new Set(faculty.map(f => f.designation)))];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Faculty Information
          </h1>
          <p className="text-lg text-gray-600">
            Meet our distinguished faculty members
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name, specialization, or qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full text-lg"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {uniqueDesignations.map((designation) => (
            <Button
              key={designation}
              variant={activeTab === designation ? 'default' : 'outline'}
              onClick={() => setActiveTab(designation)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              {designation}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-center text-gray-600 mb-8">
          Showing {Math.min(displayedCount, filteredFaculty.length)} of {filteredFaculty.length} faculty members
        </p>

        {/* Faculty Grid */}
        {filteredFaculty.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredFaculty.slice(0, displayedCount).map((member) => (
                <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    {/* Faculty Photo */}
                    <div className="mb-4 flex justify-center">
                      <div className="relative">
                        <img
                          src={member.photo || '/placeholder-faculty.jpg'}
                          alt={member.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                          onError={(e) => {
                            // Fallback to default avatar if image fails to load
                            (e.target as HTMLImageElement).src = '/placeholder-faculty.jpg';
                          }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                          {member.experience} yrs
                        </div>
                      </div>
                    </div>

                    {/* Faculty Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h3>
                      
                      <p className="text-sm text-blue-600 font-semibold mb-2">
                        {member.designation}
                      </p>

                      <p className="text-xs text-gray-500 mb-2">
                        {member.qualification}
                      </p>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-700 font-medium">
                          {member.specialization}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {displayedCount < filteredFaculty.length && (
              <div className="text-center">
                <Button
                  onClick={() => setDisplayedCount(prev => prev + 12)}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  Load More Faculty
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                    +{Math.min(12, filteredFaculty.length - displayedCount)}
                  </span>
                </Button>
              </div>
            )}
          </>
        ) : (
          // No Results Found
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Faculty Found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? `No faculty members match "${searchQuery}"`
                : `No ${activeTab === 'All' ? 'faculty members' : activeTab + 's'} found`
              }
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setActiveTab('All');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
