import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FileText, Download, Trash2, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export interface CV {
  id: string;
  filename: string;
  uploadDate: string;
  fileSize: number;
  fileType: 'pdf' | 'doc' | 'docx';
  downloadUrl: string;
}

interface CVUploadCardProps {
  cvs: CV[];
  onAddCV: (file: File) => void;
  onDeleteCV: (cvId: string) => void;
  maxFiles?: number;
  maxFileSizeMB?: number;
}

export const CVUploadCard: React.FC<CVUploadCardProps> = ({
  cvs,
  onAddCV,
  onDeleteCV,
  maxFiles = 5,
  maxFileSizeMB = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [addedCVIds, setAddedCVIds] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const cvListRef = useRef<HTMLDivElement>(null);

  // Animate card on mount
  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, []);

  // Animate new CV items
  useEffect(() => {
    if (addedCVIds.length > 0 && cvListRef.current) {
      const newItems = cvListRef.current.querySelectorAll('[data-cv-item]:last-child');
      newItems.forEach((item) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: 'power1.out',
        });
      });
      setAddedCVIds([]);
    }
  }, [cvs, addedCVIds]);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const fileSizeMB = file.size / (1024 * 1024);

    if (!allowedExtensions.includes(fileExtension)) {
      return {
        valid: false,
        error: `Invalid file type. Only PDF, DOC, and DOCX files are allowed.`,
      };
    }

    if (fileSizeMB > maxFileSizeMB) {
      return {
        valid: false,
        error: `File size exceeds ${maxFileSizeMB}MB limit. Your file is ${fileSizeMB.toFixed(2)}MB.`,
      };
    }

    if (cvs.length >= maxFiles) {
      return {
        valid: false,
        error: `You can upload a maximum of ${maxFiles} CVs.`,
      };
    }

    return { valid: true };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const validation = validateFile(file);
        if (validation.valid) {
          simulateUpload(file);
        } else {
          toast.error(validation.error);
        }
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUpload = (file: File) => {
    const fileId = `cv-${Date.now()}-${Math.random()}`;
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        
        // Complete the upload
        const newCV: CV = {
          id: fileId,
          filename: file.name,
          uploadDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          fileSize: Math.round(file.size / 1024), // Size in KB
          fileType: (file.name.split('.').pop()?.toLowerCase() as 'pdf' | 'doc' | 'docx') || 'pdf',
          downloadUrl: URL.createObjectURL(file),
        };
        
        onAddCV(file);
        setAddedCVIds([fileId]);
        setUploadProgress((prev) => {
          const updated = { ...prev };
          delete updated[fileId];
          return updated;
        });
        toast.success(`${file.name} uploaded successfully!`);
      } else {
        setUploadProgress((prev) => ({
          ...prev,
          [fileId]: progress,
        }));
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const validation = validateFile(file);
        if (validation.valid) {
          simulateUpload(file);
        } else {
          toast.error(validation.error);
        }
      });
    }
  };

  const handleDownload = (cv: CV) => {
    const link = document.createElement('a');
    link.href = cv.downloadUrl;
    link.download = cv.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${cv.filename}`);
  };

  const handleDelete = (cvId: string) => {
    onDeleteCV(cvId);
    toast.success('CV deleted successfully');
  };

  const formatFileSize = (sizeKB: number): string => {
    if (sizeKB > 1024) {
      return `${(sizeKB / 1024).toFixed(2)} MB`;
    }
    return `${sizeKB} KB`;
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return 'text-red-500';
      case 'doc':
      case 'docx':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardTitle className="text-xl flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              My CVs
            </div>
            <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {cvs.length}/{maxFiles}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:border-purple-400 bg-gray-50 hover:bg-purple-50'
            }`}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload CV file"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Select CV files"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">
                  Drop your CV here or click to select
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PDF, DOC, or DOCX • Max {maxFileSizeMB}MB per file
                </p>
              </div>
            </div>
          </div>

          {/* CV List */}
          {cvs.length > 0 ? (
            <div ref={cvListRef} className="space-y-3">
              <Label className="text-gray-700 font-semibold block">
                Uploaded CVs ({cvs.length})
              </Label>
              {cvs.map((cv) => (
                <motion.div
                  key={cv.id}
                  data-cv-item
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className={`h-5 w-5 flex-shrink-0 ${getFileTypeIcon(cv.fileType)}`} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-700 truncate text-sm">
                        {cv.filename}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {cv.uploadDate} • {formatFileSize(cv.fileSize)}
                      </p>
                    </div>
                  </div>

                  {uploadProgress[cv.id] !== undefined ? (
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                          data-width={Math.round(uploadProgress[cv.id])}
                        />
                      </div>
                      <span className="text-xs font-semibold text-purple-600 w-8 text-right">
                        {Math.round(uploadProgress[cv.id])}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(cv)}
                        aria-label={`Download ${cv.filename}`}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(cv.id)}
                        aria-label={`Delete ${cv.filename}`}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No CVs uploaded yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Upload your CV to make it visible to recruiters and faculty
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex gap-3">
            <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-purple-800">
              <p className="font-semibold">Pro Tips:</p>
              <ul className="mt-2 space-y-1 text-purple-700">
                <li>• Keep your CV updated for the best opportunities</li>
                <li>• Use a clear, professional format (PDF recommended)</li>
                <li>• You can maintain up to {maxFiles} CV versions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CVUploadCard;
