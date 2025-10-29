import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Building,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function FacultyInfoPage() {
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      designation: "Professor & Head of Department",
      department: "Computer Science & Engineering",
      specialization: "Artificial Intelligence, Machine Learning",
      qualification: "Ph.D. in Computer Science",
      experience: "15 years",
      email: "rajesh.kumar@ssipmt.edu",
      phone: "+91 98765 43210",
      office: "CSE Block, Room 301",
      image: "RK",
      courses: ["Data Structures", "AI & ML", "Research Methodology"],
      achievements: ["Best Faculty Award 2024", "Published 45+ Research Papers"],
      officeHours: "Mon-Fri: 10:00 AM - 4:00 PM",
    },
    {
      id: 2,
      name: "Prof. Priya Sharma",
      designation: "Associate Professor",
      department: "Computer Science & Engineering",
      specialization: "Software Engineering, Database Systems",
      qualification: "Ph.D. in Software Engineering",
      experience: "12 years",
      email: "priya.sharma@ssipmt.edu",
      phone: "+91 98765 43211",
      office: "CSE Block, Room 205",
      image: "PS",
      courses: ["Software Engineering", "Database Management", "Web Technologies"],
      achievements: ["Excellence in Teaching Award 2023", "Industry Collaboration Expert"],
      officeHours: "Mon-Fri: 9:00 AM - 3:00 PM",
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      specialization: "Cybersecurity, Network Security",
      qualification: "Ph.D. in Cybersecurity",
      experience: "8 years",
      email: "amit.patel@ssipmt.edu",
      phone: "+91 98765 43212",
      office: "CSE Block, Room 102",
      image: "AP",
      courses: ["Computer Networks", "Cybersecurity", "Ethical Hacking"],
      achievements: ["Cybersecurity Research Excellence", "Student Mentor of the Year 2023"],
      officeHours: "Tue-Sat: 11:00 AM - 5:00 PM",
    },
    {
      id: 4,
      name: "Prof. Sneha Gupta",
      designation: "Associate Professor",
      department: "Computer Science & Engineering",
      specialization: "Data Science, Big Data Analytics",
      qualification: "Ph.D. in Data Science",
      experience: "10 years",
      email: "sneha.gupta@ssipmt.edu",
      phone: "+91 98765 43213",
      office: "CSE Block, Room 208",
      image: "SG",
      courses: ["Data Science", "Big Data", "Python Programming"],
      achievements: ["Data Analytics Innovation Award", "Research Grant Winner 2024"],
      officeHours: "Mon-Fri: 10:00 AM - 4:00 PM",
    },
  ];

  const departmentStats = [
    { title: "Total Faculty", value: "25+", icon: Users },
    { title: "Ph.D. Holders", value: "18", icon: GraduationCap },
    { title: "Research Papers", value: "200+", icon: BookOpen },
    { title: "Years of Excellence", value: "20+", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-black">Faculty Information</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto text-black">
            Meet our distinguished faculty members who are dedicated to excellence in education, 
            research, and innovation in Computer Science & Engineering
          </p>
        </div>
      </div>

      {/* Department Stats */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Members */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Faculty Members</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our faculty brings together expertise from academia and industry to provide 
              world-class education and cutting-edge research opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {facultyMembers.map((faculty) => (
              <Card key={faculty.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-start gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xl font-bold">
                        {faculty.image}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{faculty.name}</CardTitle>
                      <Badge variant="outline" className="mb-2 text-blue-700 border-blue-200">
                        {faculty.designation}
                      </Badge>
                      <p className="text-gray-600 text-sm">{faculty.department}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {/* Contact Information */}
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>{faculty.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span>{faculty.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-red-600" />
                        <span>{faculty.office}</span>
                      </div>
                    </div>

                    {/* Academic Details */}
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Qualification</h4>
                        <p className="text-xs text-gray-600">{faculty.qualification}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Specialization</h4>
                        <p className="text-xs text-gray-600">{faculty.specialization}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Experience</h4>
                        <p className="text-xs text-gray-600">{faculty.experience}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Courses Teaching</h4>
                        <div className="flex flex-wrap gap-1">
                          {faculty.courses.slice(0, 2).map((course, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                          {faculty.courses.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{faculty.courses.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* View Profile Button Only */}
                    <div className="pt-2">
                      <Button size="sm" variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Faculty Table */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Directory</CardTitle>
                <p className="text-gray-600">Complete faculty information in tabular format</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead>Qualification</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Office</TableHead>
                        <TableHead>Courses</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {facultyMembers.map((faculty) => (
                        <TableRow key={faculty.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-bold">
                                  {faculty.image}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{faculty.name}</p>
                                <p className="text-xs text-gray-500">{faculty.department}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {faculty.designation}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{faculty.qualification}</TableCell>
                          <TableCell className="text-sm max-w-xs">
                            <p className="truncate">{faculty.specialization}</p>
                          </TableCell>
                          <TableCell className="text-sm">{faculty.experience}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-xs">
                                <Mail className="h-3 w-3 text-blue-600" />
                                <span className="truncate max-w-xs">{faculty.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <Phone className="h-3 w-3 text-green-600" />
                                <span>{faculty.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-red-600" />
                              <span>{faculty.office}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {faculty.courses.slice(0, 2).map((course, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {course}
                                </Badge>
                              ))}
                              {faculty.courses.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{faculty.courses.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-6 w-6 text-blue-600" />
                  Department Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Vision</h4>
                    <p className="text-gray-600 text-sm">
                      To be a globally recognized department that produces skilled computer science 
                      professionals and contributes to technological advancement through innovative research.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Mission</h4>
                    <p className="text-gray-600 text-sm">
                      To provide quality education, foster research culture, and develop industry-ready 
                      professionals who can contribute to society through technology innovation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                  Research Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2 mb-2">Artificial Intelligence</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Machine Learning</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Data Science</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Cybersecurity</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Software Engineering</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Computer Networks</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Database Systems</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Web Technologies</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Mobile Computing</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Cloud Computing</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}