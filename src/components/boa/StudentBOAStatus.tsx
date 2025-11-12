import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Calendar,
  User,
  Building
} from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "../../server";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface BOARequest {
  id: string;
  eventName: string;
  eventDateFrom: string;
  eventDateTo: string;
  organizingDept: string;
  teacherInCharge: string;
  numTheoryLectures: number;
  numPracticalLectures: number;
  branch: string;
  semester: string;
  section: string;
  classInCharge: string;
  submissionDate: string;
  status: string; // Overall status
  hodApprovalStatus: string;
  classInchargeApprovalStatus: string;
  hodApprovedBy?: string;
  classInchargeApprovedBy?: string;
  hodApprovalDate?: string;
  classInchargeApprovalDate?: string;
  hodRemarks?: string;
  classInchargeRemarks?: string;
  eventPhotos: string[];
  submittedAt: string;
}

interface StudentBOAStatusProps {
  rollNo: string;
}

export function StudentBOAStatus({ rollNo }: StudentBOAStatusProps) {
  const [boaRequests, setBoaRequests] = useState<BOARequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<BOARequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    fetchBOARequests();
  }, [rollNo]);

  const fetchBOARequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.boa.studentRequests}?rollNo=${rollNo}`);
      const result = await response.json();

      if (result.status === 'success') {
        setBoaRequests(result.data);
      } else {
        toast.error("Failed to fetch BOA requests", {
          description: result.message
        });
      }
    } catch (error) {
      console.error('Error fetching BOA requests:', error);
      toast.error("Failed to fetch BOA requests");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const getApprovalStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const handleViewDetails = (request: BOARequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            My BOA Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {boaRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No BOA requests submitted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {boaRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{request.eventName}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(request.eventDateFrom).toLocaleDateString()} - {new Date(request.eventDateTo).toLocaleDateString()}
                      </p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  {/* Approval Status */}
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      {getApprovalStatusIcon(request.hodApprovalStatus)}
                      <div>
                        <p className="font-medium">HOD Approval</p>
                        <p className="text-xs text-gray-600">{request.hodApprovalStatus}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {getApprovalStatusIcon(request.classInchargeApprovalStatus)}
                      <div>
                        <p className="font-medium">Class In-charge</p>
                        <p className="text-xs text-gray-600">{request.classInchargeApprovalStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(request.submittedAt).toLocaleString()}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(request)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>BOA Request Details</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              {/* Overall Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Overall Status:</span>
                {getStatusBadge(selectedRequest.status)}
              </div>

              {/* Event Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Event Details
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Event Name:</p>
                    <p className="font-medium">{selectedRequest.eventName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Organizing Dept:</p>
                    <p className="font-medium">{selectedRequest.organizingDept}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date From:</p>
                    <p className="font-medium">{new Date(selectedRequest.eventDateFrom).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date To:</p>
                    <p className="font-medium">{new Date(selectedRequest.eventDateTo).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Teacher In-charge:</p>
                    <p className="font-medium">{selectedRequest.teacherInCharge}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Lectures Benefitted:</p>
                    <p className="font-medium">
                      Theory: {selectedRequest.numTheoryLectures}, Practical: {selectedRequest.numPracticalLectures}
                    </p>
                  </div>
                </div>
              </div>

              {/* Approval Status Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Approval Status
                </h3>
                
                {/* HOD Approval */}
                <div className="border rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">HOD Approval</span>
                    {getApprovalStatusIcon(selectedRequest.hodApprovalStatus)}
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Status:</span> {selectedRequest.hodApprovalStatus}</p>
                    {selectedRequest.hodApprovedBy && (
                      <p><span className="text-gray-600">Approved By:</span> {selectedRequest.hodApprovedBy}</p>
                    )}
                    {selectedRequest.hodApprovalDate && (
                      <p><span className="text-gray-600">Date:</span> {new Date(selectedRequest.hodApprovalDate).toLocaleString()}</p>
                    )}
                    {selectedRequest.hodRemarks && (
                      <div>
                        <p className="text-gray-600">Remarks:</p>
                        <p className="italic bg-gray-50 p-2 rounded mt-1">{selectedRequest.hodRemarks}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Class In-charge Approval */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Class In-charge Approval</span>
                    {getApprovalStatusIcon(selectedRequest.classInchargeApprovalStatus)}
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Status:</span> {selectedRequest.classInchargeApprovalStatus}</p>
                    <p><span className="text-gray-600">Class In-charge:</span> {selectedRequest.classInCharge}</p>
                    {selectedRequest.classInchargeApprovedBy && (
                      <p><span className="text-gray-600">Approved By:</span> {selectedRequest.classInchargeApprovedBy}</p>
                    )}
                    {selectedRequest.classInchargeApprovalDate && (
                      <p><span className="text-gray-600">Date:</span> {new Date(selectedRequest.classInchargeApprovalDate).toLocaleString()}</p>
                    )}
                    {selectedRequest.classInchargeRemarks && (
                      <div>
                        <p className="text-gray-600">Remarks:</p>
                        <p className="italic bg-gray-50 p-2 rounded mt-1">{selectedRequest.classInchargeRemarks}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Event Photos */}
              {selectedRequest.eventPhotos.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Event Photos</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedRequest.eventPhotos.map((photo, index) => (
                      <img
                        key={index}
                        src={`http://localhost/cse_portal_backend/${photo}`}
                        alt={`Event photo ${index + 1}`}
                        className="rounded-lg object-cover h-24 w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
