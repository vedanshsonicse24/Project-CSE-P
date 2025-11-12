-- BOA Dual Approval System - Database Schema Update
-- This script adds columns for dual approval (HOD and Class In-charge)

-- First, check if columns exist and add them if they don't
ALTER TABLE boa_requests 
ADD COLUMN IF NOT EXISTS hod_approval_status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
ADD COLUMN IF NOT EXISTS class_incharge_approval_status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
ADD COLUMN IF NOT EXISTS hod_approved_by VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS class_incharge_approved_by VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS hod_approval_date DATETIME DEFAULT NULL,
ADD COLUMN IF NOT EXISTS class_incharge_approval_date DATETIME DEFAULT NULL,
ADD COLUMN IF NOT EXISTS hod_remarks TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS class_incharge_remarks TEXT DEFAULT NULL;

-- Update existing records to set default approval statuses
UPDATE boa_requests 
SET 
    hod_approval_status = 'Pending',
    class_incharge_approval_status = 'Pending'
WHERE 
    hod_approval_status IS NULL 
    OR class_incharge_approval_status IS NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_boa_student_id ON boa_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_boa_status ON boa_requests(status);
CREATE INDEX IF NOT EXISTS idx_boa_hod_status ON boa_requests(hod_approval_status);
CREATE INDEX IF NOT EXISTS idx_boa_class_incharge_status ON boa_requests(class_incharge_approval_status);

-- Display current schema
SHOW COLUMNS FROM boa_requests;
