import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CheckCircle, XCircle, Clock, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

type BOAStatus = "pending" | "approved" | "rejected";

interface BOARequest {
  id: string;
  eventName: string;
  eventDateFrom: string;
  eventDateTo: string;
  organizingDept: string;
  teacherInCharge: string;
  numTheoryLectures: number;
  numPracticalLectures: number;
  studentName: string;
  branch: string;
  semester: string;
  rollNo: string;
  section: string;
  classInCharge: string;
  submissionDate: string;
  status: BOAStatus;
  approvedBy?: string;
  approvalDate?: string;
  remarks?: string;
}

const sampleRequests: BOARequest[] = [
  {
    id: "BOA001",
    eventName: "National Coding Championship 2024",
    eventDateFrom: "2024-10-10",
    eventDateTo: "2024-10-12",
    organizingDept: "CSE Department",
    teacherInCharge: "Dr. Sharma",
    numTheoryLectures: 2,
    numPracticalLectures: 1,
    studentName: "Amit Kumar",
    branch: "Computer Science",
    semester: "6th",
    rollNo: "21CS001",
    section: "A",
    classInCharge: "Prof. Gupta",
    submissionDate: "2024-10-12",
    status: "pending",
  },
  {
    id: "BOA002",
    eventName: "Tech Symposium 2024",
    eventDateFrom: "2024-10-08",
    eventDateTo: "2024-10-08",
    organizingDept: "ECE Department",
    teacherInCharge: "Dr. Patel",
    numTheoryLectures: 1,
    numPracticalLectures: 1,
    studentName: "Priya Sharma",
    branch: "Computer Science",
    semester: "6th",
    rollNo: "21CS002",
    section: "A",
    classInCharge: "Prof. Gupta",
    submissionDate: "2024-10-09",
    status: "approved",
    approvedBy: "Prof. Gupta",
    approvalDate: "2024-10-10",
  },
  {
    id: "BOA003",
    eventName: "Sports Meet",
    eventDateFrom: "2024-10-05",
    eventDateTo: "2024-10-07",
    organizingDept: "Sports Department",
    teacherInCharge: "Mr. Singh",
    numTheoryLectures: 3,
    numPracticalLectures: 1,
    studentName: "Rahul Verma",
    branch: "Computer Science",
    semester: "6th",
    rollNo: "21CS003",
    section: "B",
    classInCharge: "Dr. Kumar",
    submissionDate: "2024-10-06",
    status: "rejected",
    approvedBy: "Dr. Kumar",
    approvalDate: "2024-10-07",
    remarks: "Submitted after deadline",
  },
];

export function BOAManagement() {
  const [requests, setRequests] = useState<BOARequest[]>(sampleRequests);
  const [selectedRequest, setSelectedRequest] = useState<BOARequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remarks, setRemarks] = useState<string>("");
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState<boolean>(false);
  const [photoRequest, setPhotoRequest] = useState<BOARequest | null>(null);

  const pendingRequests = requests.filter((r: BOARequest) => r.status === "pending");
  const approvedRequests = requests.filter((r: BOARequest) => r.status === "approved");
  const rejectedRequests = requests.filter((r: BOARequest) => r.status === "rejected");

  const getStatusBadge = (status: BOAStatus) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600 text-white">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-600 text-white">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-400 text-black">Pending</Badge>;
    }
  };

  const getEventPhotos = (_request: BOARequest) => {
    return [
      "https://via.placeholder.com/400x250?text=Event+Photo+1",
      "https://via.placeholder.com/400x250?text=Event+Photo+2",
    ];
  };

  const handleViewPhotos = (request: BOARequest) => {
    setPhotoRequest(request);
    setIsPhotoDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "approved",
              approvedBy: "Current User",
              approvalDate: new Date().toISOString().split("T")[0],
              remarks: remarks || undefined,
            }
          : req
      )
    );
    toast.success("BOA request approved successfully");
    setIsDialogOpen(false);
    setSelectedRequest(null);
    setRemarks("");
  };

  const handleReject = (id: string) => {
    if (!remarks) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "rejected",
              approvedBy: "Current User",
              approvalDate: new Date().toISOString().split("T")[0],
              remarks,
            }
          : req
      )
    );
    toast.success("BOA request rejected");
    setIsDialogOpen(false);
    setSelectedRequest(null);
    setRemarks("");
  };

  const viewDetails = (request: BOARequest) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const renderRequestsTable = (requestsList: BOARequest[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Roll No.</TableHead>
          <TableHead>Event Name</TableHead>
          <TableHead>Event Date</TableHead>
          <TableHead>Lectures</TableHead>
          <TableHead>Event In-Charge</TableHead>
          <TableHead>Class In-Charge</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>View Photos</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requestsList.length === 0 ? (
          <TableRow>
            <TableCell colSpan={11} className="text-center text-gray-500">
              No requests found
            </TableCell>
          </TableRow>
        ) : (
          requestsList.map((request: BOARequest) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.studentName}</TableCell>
              <TableCell>{request.rollNo}</TableCell>
              <TableCell>{request.eventName}</TableCell>
              <TableCell>
                {new Date(request.eventDateFrom).toLocaleDateString()} - {new Date(request.eventDateTo).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {request.numTheoryLectures + request.numPracticalLectures} (T:{request.numTheoryLectures} P:{request.numPracticalLectures})
              </TableCell>
              <TableCell>{request.teacherInCharge}</TableCell>
              <TableCell>{request.classInCharge}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell>
                <button
                  className="bg-emerald-500 text-white rounded px-3 py-1 hover:scale-105 shadow-md transition-transform duration-200"
                  onClick={() => handleViewPhotos(request)}
                >
                  View Photos
                </button>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => viewDetails(request)} className="gap-1">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" style={{ color: "#1e3a8a" }} />
            BOA Request Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved ({approvedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="gap-2">
                <XCircle className="h-4 w-4" />
                Rejected ({rejectedRequests.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-6">
              {renderRequestsTable(pendingRequests)}
            </TabsContent>
            <TabsContent value="approved" className="mt-6">
              {renderRequestsTable(approvedRequests)}
            </TabsContent>
            <TabsContent value="rejected" className="mt-6">
              {renderRequestsTable(rejectedRequests)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="bg-white rounded-lg p-6 shadow-xl transition-all max-w-xl">
          <DialogHeader>
            <DialogTitle>Event Photos - {photoRequest?.eventName}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {photoRequest &&
              getEventPhotos(photoRequest).map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Event Photo ${idx + 1}`}
                  className="rounded-lg shadow-md max-w-xs max-h-60 border transition-transform duration-200 hover:scale-105"
                  style={{ cursor: "zoom-in" }}
                />
              ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPhotoDialogOpen(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>BOA Request Details - {selectedRequest?.id}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="border-l-4 pl-3 text-black font-semibold" style={{ borderColor: "#1e3a8a" }}>
                  Event Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Event Name</p>
                    <p>{selectedRequest.eventName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Event Date From</p>
                    <p>{new Date(selectedRequest.eventDateFrom).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Event Date To</p>
                    <p>{new Date(selectedRequest.eventDateTo).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Organizing Department</p>
                    <p>{selectedRequest.organizingDept}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Teacher In-charge</p>
                    <p>{selectedRequest.teacherInCharge}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Theory Lectures to be Benefited</p>
                    <p>{selectedRequest.numTheoryLectures}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Practical Lectures to be Benefited</p>
                    <p>{selectedRequest.numPracticalLectures}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="border-l-4 pl-3 text-black font-semibold" style={{ borderColor: "#1e3a8a" }}>
                  Student Details
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Student Name</p>
                    <p>{selectedRequest.studentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Roll No.</p>
                    <p>{selectedRequest.rollNo}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Branch</p>
                    <p>{selectedRequest.branch}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Semester</p>
                    <p>{selectedRequest.semester}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Section</p>
                    <p>{selectedRequest.section}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="border-l-4 pl-3 text-black font-semibold" style={{ borderColor: "#1e3a8a" }}>
                  Approval Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Class In-charge</p>
                    <p>{selectedRequest.classInCharge}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Submission Date</p>
                    <p>{new Date(selectedRequest.submissionDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p>{getStatusBadge(selectedRequest.status)}</p>
                  </div>
                  {selectedRequest.approvedBy && (
                    <div>
                      <p className="text-gray-600">Approved/Rejected By</p>
                      <p>{selectedRequest.approvedBy}</p>
                    </div>
                  )}
                  {selectedRequest.approvalDate && (
                    <div>
                      <p className="text-gray-600">Action Date</p>
                      <p>{new Date(selectedRequest.approvalDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {selectedRequest.remarks && (
                    <div className="col-span-2">
                      <p className="text-gray-600">Remarks</p>
                      <p>{selectedRequest.remarks}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedRequest.status === "pending" && (
                <div className="space-y-2">
                  <label className="text-sm">Remarks (Optional for approval, Required for rejection)</label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Enter remarks..."
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {selectedRequest?.status === "pending" && (
              <div className="flex gap-2 w-full">
                <Button onClick={() => selectedRequest && handleReject(selectedRequest.id)} variant="destructive" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={() => selectedRequest && handleApprove(selectedRequest.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}
            {selectedRequest?.status !== "pending" && (
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
