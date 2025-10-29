import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar, FileText, User, Building, GraduationCap } from "lucide-react";
import { toast } from "sonner";

export function BOASubmissionForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    organizingDept: "",
    teacherInCharge: "",
    studentName: "",
    branch: "",
    semester: "",
    rollNo: "",
    section: "",
    date: "",
    numLectures: "",
    classInCharge: "",
    submissionDate: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      "eventName", "eventDate", "organizingDept", "teacherInCharge",
      "studentName", "branch", "semester", "rollNo", "section",
      "date", "numLectures", "classInCharge", "submissionDate"
    ];

    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Submit the form
    toast.success("BOA request submitted successfully! Pending approval from Class In-charge.");
    
    // Reset form
    setFormData({
      eventName: "",
      eventDate: "",
      organizingDept: "",
      teacherInCharge: "",
      studentName: "",
      branch: "",
      semester: "",
      rollNo: "",
      section: "",
      date: "",
      numLectures: "",
      classInCharge: "",
      submissionDate: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center" style={{ backgroundColor: '#1e3a8a' }}>
          <CardTitle className="text-white space-y-1">
            <div className="text-2xl">Shri Shankaracharya Institute</div>
            <div className="text-sm opacity-90">of Professional Management & Technology</div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <h3 className="text-center mb-6" style={{ color: '#1e3a8a' }}>
            Benefit of Attendance (BOA) - Single Entry Form
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 pl-3" style={{ borderColor: '#1e3a8a' }}>
                <FileText className="h-5 w-5" style={{ color: '#1e3a8a' }} />
                <h4 style={{ color: '#1e3a8a' }}>Event Details</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    value={formData.eventName}
                    onChange={(e) => handleChange("eventName", e.target.value)}
                    placeholder="Enter event name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Date of Event *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleChange("eventDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizingDept">Organizing Department *</Label>
                  <Input
                    id="organizingDept"
                    value={formData.organizingDept}
                    onChange={(e) => handleChange("organizingDept", e.target.value)}
                    placeholder="e.g., CSE Department"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="teacherInCharge">Teacher In-charge *</Label>
                  <Input
                    id="teacherInCharge"
                    value={formData.teacherInCharge}
                    onChange={(e) => handleChange("teacherInCharge", e.target.value)}
                    placeholder="Enter teacher name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Student Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 pl-3" style={{ borderColor: '#1e3a8a' }}>
                <User className="h-5 w-5" style={{ color: '#1e3a8a' }} />
                <h4 style={{ color: '#1e3a8a' }}>Student Details</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="studentName">Name of Student *</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => handleChange("studentName", e.target.value)}
                    placeholder="Enter student name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch *</Label>
                  <Input
                    id="branch"
                    value={formData.branch}
                    onChange={(e) => handleChange("branch", e.target.value)}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester *</Label>
                  <Input
                    id="semester"
                    value={formData.semester}
                    onChange={(e) => handleChange("semester", e.target.value)}
                    placeholder="e.g., 6th"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNo">Class Roll No. *</Label>
                  <Input
                    id="rollNo"
                    value={formData.rollNo}
                    onChange={(e) => handleChange("rollNo", e.target.value)}
                    placeholder="e.g., 21CS001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section *</Label>
                  <Input
                    id="section"
                    value={formData.section}
                    onChange={(e) => handleChange("section", e.target.value)}
                    placeholder="e.g., A"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numLectures">No. of Lectures to be Benefitted *</Label>
                  <Input
                    id="numLectures"
                    type="number"
                    min="1"
                    value={formData.numLectures}
                    onChange={(e) => handleChange("numLectures", e.target.value)}
                    placeholder="Enter number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Approval Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 pl-3" style={{ borderColor: '#1e3a8a' }}>
                <GraduationCap className="h-5 w-5" style={{ color: '#1e3a8a' }} />
                <h4 style={{ color: '#1e3a8a' }}>Approval Section</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classInCharge">Name of Class In-charge *</Label>
                  <Input
                    id="classInCharge"
                    value={formData.classInCharge}
                    onChange={(e) => handleChange("classInCharge", e.target.value)}
                    placeholder="Enter class in-charge name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submissionDate">Date of Submission *</Label>
                  <Input
                    id="submissionDate"
                    type="date"
                    value={formData.submissionDate}
                    onChange={(e) => handleChange("submissionDate", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white"
              style={{ backgroundColor: '#10B981' }}
            >
              Submit BOA Request
            </Button>

            {/* Note */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-sm text-yellow-800">
                <strong>NOTE:</strong> Approval for BOA must be taken within two days of event.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
