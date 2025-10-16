import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Download,
  X,
  Search,
  User,
  FileDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "sonner@2.0.3";

interface Faculty {
  id: string;
  fullName: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  qualification: string;
  specialization: string;
  joinDate: string;
  phdStatus?: string;
  officeLocation: string;
  officeHours: string;
  mentorFor: string;
  totalMentees: number;
  yearsOfExperience: number;
  researchInterest: string;
}

interface FacultyDetailsProps {
  onBack: () => void;
}

const mockFaculties: Faculty[] = [
  {
    id: "FAC001",
    fullName: "Dr. Rajesh Kumar",
    designation: "Professor",
    department: "Computer Science & Engineering",
    email: "rajesh.kumar@ssipmt.edu",
    phone: "+91 98765 43210",
    dateOfBirth: "1975-05-15",
    gender: "Male",
    qualification: "Ph.D. in Computer Science",
    specialization: "Machine Learning, AI",
    joinDate: "2010-07-01",
    phdStatus: "Completed",
    officeLocation: "Room 301, CSE Block",
    officeHours: "10:00 AM - 12:00 PM",
    mentorFor: "Third Year CSE",
    totalMentees: 45,
    yearsOfExperience: 15,
    researchInterest: "Deep Learning, Neural Networks",
  },
  {
    id: "FAC002",
    fullName: "Prof. Priya Sharma",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    email: "priya.sharma@ssipmt.edu",
    phone: "+91 98765 43211",
    dateOfBirth: "1980-08-20",
    gender: "Female",
    qualification: "M.Tech, Ph.D. (Pursuing)",
    specialization: "Data Science, Analytics",
    joinDate: "2012-08-15",
    phdStatus: "Pursuing",
    officeLocation: "Room 302, CSE Block",
    officeHours: "2:00 PM - 4:00 PM",
    mentorFor: "Second Year CSE",
    totalMentees: 50,
    yearsOfExperience: 12,
    researchInterest: "Big Data, Data Mining",
  },
  {
    id: "FAC003",
    fullName: "Mr. Amit Patel",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    email: "amit.patel@ssipmt.edu",
    phone: "+91 98765 43212",
    dateOfBirth: "1985-11-10",
    gender: "Male",
    qualification: "M.Tech in CSE",
    specialization: "Web Development, Cloud Computing",
    joinDate: "2015-06-01",
    officeLocation: "Room 303, CSE Block",
    officeHours: "11:00 AM - 1:00 PM",
    mentorFor: "First Year CSE",
    totalMentees: 55,
    yearsOfExperience: 8,
    researchInterest: "Cloud Architecture, Microservices",
  },
  {
    id: "FAC004",
    fullName: "Ms. Sneha Reddy",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering",
    email: "sneha.reddy@ssipmt.edu",
    phone: "+91 98765 43213",
    dateOfBirth: "1988-03-25",
    gender: "Female",
    qualification: "M.Tech in CSE",
    specialization: "Cybersecurity, Network Security",
    joinDate: "2016-07-20",
    officeLocation: "Room 304, CSE Block",
    officeHours: "3:00 PM - 5:00 PM",
    mentorFor: "Fourth Year CSE",
    totalMentees: 40,
    yearsOfExperience: 7,
    researchInterest: "Ethical Hacking, Cryptography",
  },
  {
    id: "FAC005",
    fullName: "Mr. Vikram Singh",
    designation: "Lab Assistant",
    department: "Computer Science & Engineering",
    email: "vikram.singh@ssipmt.edu",
    phone: "+91 98765 43214",
    dateOfBirth: "1990-12-05",
    gender: "Male",
    qualification: "B.Tech in CSE",
    specialization: "Lab Management, Hardware",
    joinDate: "2018-01-10",
    officeLocation: "Lab 1, CSE Block",
    officeHours: "9:00 AM - 5:00 PM",
    mentorFor: "Lab Sessions",
    totalMentees: 30,
    yearsOfExperience: 5,
    researchInterest: "IoT, Embedded Systems",
  },
];

export function FacultyDetails({ onBack }: FacultyDetailsProps) {
  const [faculties, setFaculties] = useState<Faculty[]>(mockFaculties);
  const [filteredFaculties, setFilteredFaculties] = useState<Faculty[]>(mockFaculties);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("all");
  const [editedFaculty, setEditedFaculty] = useState<Faculty | null>(null);

  // Filter and search logic
  useEffect(() => {
    let result = faculties;

    // Apply designation filter
    if (filterDesignation !== "all") {
      result = result.filter((f) => f.designation === filterDesignation);
    }

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (f) =>
          f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFaculties(result);
  }, [searchQuery, filterDesignation, faculties]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  const handleViewProfile = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setEditedFaculty({ ...faculty });
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
    setEditedFaculty(null);
    setIsEditMode(false);
  };

  const handleSave = () => {
    if (editedFaculty && selectedFaculty) {
      // Update faculty in the list
      setFaculties((prev) =>
        prev.map((f) => (f.id === selectedFaculty.id ? editedFaculty : f))
      );
      setSelectedFaculty(editedFaculty);
      setIsEditMode(false);
      toast.success("Faculty details updated successfully!");
    }
  };

  const handleCancel = () => {
    setEditedFaculty(selectedFaculty);
    setIsEditMode(false);
  };

  const handleExportCSV = () => {
    const headers = [
      "Faculty ID",
      "Full Name",
      "Designation",
      "Department",
      "Email",
      "Phone",
      "Qualification",
      "Specialization",
    ];
    const rows = filteredFaculties.map((f) => [
      f.id,
      f.fullName,
      f.designation,
      f.department,
      f.email,
      f.phone,
      f.qualification,
      f.specialization,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "faculty_details.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Faculty data exported successfully!");
  };

  const handleExportFaculty = (faculty: Faculty) => {
    const data = Object.entries(faculty)
      .map(([key, value]) => `${key},${value}`)
      .join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + data;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${faculty.id}_details.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${faculty.fullName}'s data exported successfully!`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const updateField = (field: keyof Faculty, value: any) => {
    if (editedFaculty) {
      setEditedFaculty({ ...editedFaculty, [field]: value });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f6f7fb",
        fontFamily: '"Segoe UI", Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-40 shadow-md"
        style={{
          backgroundColor: "#ff7b00",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl border-b shadow-2xl" style={{ background: 'linear-gradient(135deg, rgba(255, 123, 0, 0.2) 0%, rgba(251, 146, 60, 0.25) 50%, rgba(255, 123, 0, 0.15) 100%)', borderColor: 'rgba(255, 123, 0, 0.3)', boxShadow: '0 8px 32px 0 rgba(255, 123, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1
              className="text-2xl"
              style={{ color: "#ffffff", fontWeight: "bold" }}
            >
              Faculty Details
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={handleExportCSV}
              className="text-white hover:bg-white/20"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-6">
        <div
          className="rounded-lg shadow-lg p-6"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Select value={filterDesignation} onValueChange={setFilterDesignation}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Faculties</SelectItem>
                <SelectItem value="Professor">Professors</SelectItem>
                <SelectItem value="Associate Professor">
                  Associate Professors
                </SelectItem>
                <SelectItem value="Assistant Professor">
                  Assistant Professors
                </SelectItem>
                <SelectItem value="Lab Assistant">Lab Assistants</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-64">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                style={{ color: "#666" }}
              />
              <Input
                placeholder="Search by name or id"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button
              onClick={handleExportCSV}
              className="text-white shadow-md"
              style={{ backgroundColor: "#ff7b00" }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>

          {/* Faculty Table */}
          <div className="rounded-lg overflow-hidden border">
            <Table>
              <TableHeader style={{ backgroundColor: "#ffede0" }}>
                <TableRow style={{ borderBottom: "2px solid #ff7b00" }}>
                  <TableHead className="text-white" style={{ color: "#333" }}>
                    Faculty ID
                  </TableHead>
                  <TableHead className="text-white" style={{ color: "#333" }}>
                    Photo
                  </TableHead>
                  <TableHead className="text-white" style={{ color: "#333" }}>
                    Full Name
                  </TableHead>
                  <TableHead className="text-white" style={{ color: "#333" }}>
                    Designation
                  </TableHead>
                  <TableHead className="text-white" style={{ color: "#333" }}>
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculties.map((faculty) => (
                  <TableRow
                    key={faculty.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <TableCell style={{ color: "#333" }}>{faculty.id}</TableCell>
                    <TableCell>
                      <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#d1d5db",
                          color: "#666",
                        }}
                      >
                        <span className="text-sm">
                          {getInitials(faculty.fullName)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell style={{ color: "#333" }}>
                      {faculty.fullName}
                    </TableCell>
                    <TableCell style={{ color: "#666" }}>
                      {faculty.designation}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleViewProfile(faculty)}
                        className="text-white shadow-md"
                        style={{ backgroundColor: "#ff7b00" }}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredFaculties.length === 0 && (
            <div className="text-center py-12" style={{ color: "#666" }}>
              No faculty members found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedFaculty && editedFaculty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleCloseModal}
        >
          <div
            className="rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200"
            style={{ backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                backgroundColor: "#ff7b00",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            >
              <h2 className="text-xl" style={{ color: "#ffffff", fontWeight: "bold" }}>
                Faculty Details
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="edit-toggle" className="text-white text-sm">
                    Edit
                  </Label>
                  <Switch
                    id="edit-toggle"
                    checked={isEditMode}
                    onCheckedChange={setIsEditMode}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportFaculty(selectedFaculty)}
                  className="text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
                {/* Left Panel (40%) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Photo Section */}
                  <div className="flex flex-col items-center">
                    <div
                      className="flex items-center justify-center rounded-full mb-4"
                      style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "#d1d5db",
                        color: "#666",
                        fontSize: "32px",
                      }}
                    >
                      {getInitials(editedFaculty.fullName)}
                    </div>
                  </div>

                  {/* Academic Position */}
                  <div
                    className="rounded-lg p-4 shadow-sm"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3
                      className="mb-3"
                      style={{ color: "#333", fontWeight: "600" }}
                    >
                      Academic Position
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Department
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.department}
                            onChange={(e) =>
                              updateField("department", e.target.value)
                            }
                            className="mt-1"
                            style={{ borderColor: "#ff7b00" }}
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.department}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Designation
                        </Label>
                        {isEditMode ? (
                          <Select
                            value={editedFaculty.designation}
                            onValueChange={(value) =>
                              updateField("designation", value)
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Professor">Professor</SelectItem>
                              <SelectItem value="Associate Professor">
                                Associate Professor
                              </SelectItem>
                              <SelectItem value="Assistant Professor">
                                Assistant Professor
                              </SelectItem>
                              <SelectItem value="Lab Assistant">
                                Lab Assistant
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.designation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mentoring Details */}
                  <div
                    className="rounded-lg p-4 shadow-sm"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 style={{ color: "#333", fontWeight: "600" }}>
                        Mentoring Details
                      </h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExportFaculty(selectedFaculty)}
                        style={{ borderColor: "#10b981", color: "#10b981" }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Mentor For
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.mentorFor}
                            onChange={(e) =>
                              updateField("mentorFor", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.mentorFor}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Total Mentees
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="number"
                            value={editedFaculty.totalMentees}
                            onChange={(e) =>
                              updateField("totalMentees", parseInt(e.target.value))
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.totalMentees}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div
                    className="rounded-lg p-4 shadow-sm"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3
                      className="mb-3"
                      style={{ color: "#333", fontWeight: "600" }}
                    >
                      Additional Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Years of Experience
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="number"
                            value={editedFaculty.yearsOfExperience}
                            onChange={(e) =>
                              updateField(
                                "yearsOfExperience",
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.yearsOfExperience} years
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Research Interest
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.researchInterest}
                            onChange={(e) =>
                              updateField("researchInterest", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.researchInterest}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel (60%) */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Personal Information */}
                  <div
                    className="rounded-lg p-4 shadow-sm"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3
                      className="mb-3"
                      style={{ color: "#333", fontWeight: "600" }}
                    >
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Full Name
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.fullName}
                            onChange={(e) =>
                              updateField("fullName", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.fullName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Date of Birth
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="date"
                            value={editedFaculty.dateOfBirth}
                            onChange={(e) =>
                              updateField("dateOfBirth", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {new Date(
                              editedFaculty.dateOfBirth
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Gender
                        </Label>
                        {isEditMode ? (
                          <Select
                            value={editedFaculty.gender}
                            onValueChange={(value) => updateField("gender", value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.gender}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Academic Details */}
                  <div
                    className="rounded-lg p-4 shadow-sm"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3
                      className="mb-3"
                      style={{ color: "#333", fontWeight: "600" }}
                    >
                      Academic Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Qualification
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.qualification}
                            onChange={(e) =>
                              updateField("qualification", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.qualification}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Specialization
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.specialization}
                            onChange={(e) =>
                              updateField("specialization", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.specialization}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Join Date
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="date"
                            value={editedFaculty.joinDate}
                            onChange={(e) =>
                              updateField("joinDate", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {new Date(editedFaculty.joinDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {editedFaculty.phdStatus && (
                        <div>
                          <Label style={{ color: "#666", fontSize: "12px" }}>
                            Ph.D. Status
                          </Label>
                          {isEditMode ? (
                            <Input
                              value={editedFaculty.phdStatus}
                              onChange={(e) =>
                                updateField("phdStatus", e.target.value)
                              }
                              className="mt-1"
                            />
                          ) : (
                            <p style={{ color: "#333", marginTop: "4px" }}>
                              {editedFaculty.phdStatus}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div
                    className="rounded-lg p-4 shadow-sm"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <h3
                      className="mb-3"
                      style={{ color: "#333", fontWeight: "600" }}
                    >
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Email
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="email"
                            value={editedFaculty.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Phone
                        </Label>
                        {isEditMode ? (
                          <Input
                            type="tel"
                            value={editedFaculty.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Office Location
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.officeLocation}
                            onChange={(e) =>
                              updateField("officeLocation", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.officeLocation}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label style={{ color: "#666", fontSize: "12px" }}>
                          Office Hours
                        </Label>
                        {isEditMode ? (
                          <Input
                            value={editedFaculty.officeHours}
                            onChange={(e) =>
                              updateField("officeHours", e.target.value)
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p style={{ color: "#333", marginTop: "4px" }}>
                            {editedFaculty.officeHours}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3">
                    {isEditMode ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          style={{ color: "#666", borderColor: "#d1d5db" }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="text-white"
                          style={{ backgroundColor: "#ff7b00" }}
                        >
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleExportFaculty(selectedFaculty)}
                        style={{
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
