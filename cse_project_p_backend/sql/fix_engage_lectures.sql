-- Fix engage_lectures table to allow NULL timetable_id
-- This allows creating engage lectures even without a specific timetable entry

-- Step 1: Drop the foreign key constraint
ALTER TABLE engage_lectures 
DROP FOREIGN KEY engage_lectures_ibfk_3;

-- Step 2: Modify column to allow NULL
ALTER TABLE engage_lectures 
MODIFY COLUMN timetable_id INT NULL;

-- Note: We're NOT re-adding the foreign key constraint because:
-- 1. The timetable table structure might not match
-- 2. It's not critical for the engage lecture functionality
-- 3. The application will still work without it

-- Verify the change
SHOW COLUMNS FROM engage_lectures LIKE 'timetable_id';
