import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { cn } from '../ui/utils';

interface SwipeableAttendanceRowProps {
  studentId: string;
  studentName: string;
  rollNumber: string;
  initialStatus: 'present' | 'absent' | 'unmarked';
  onStatusChange: (studentId: string, status: 'present' | 'absent') => Promise<void>;
  disabled?: boolean;
}

const SwipeableAttendanceRow: React.FC<SwipeableAttendanceRowProps> = React.memo(({
  studentId,
  studentName,
  rollNumber,
  initialStatus,
  onStatusChange,
  disabled = false
}) => {
  const [status, setStatus] = useState<'present' | 'absent' | 'unmarked'>(initialStatus);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'present' | 'absent' | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const SWIPE_THRESHOLD = 80;
  const MAX_SWIPE = 150;

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const triggerHaptic = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isUpdating) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsSwiping(true);
  }, [disabled, isUpdating]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping || disabled || isUpdating) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Ignore vertical scrolls
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      setIsSwiping(false);
      setSwipeOffset(0);
      return;
    }

    // Prevent vertical scroll during horizontal swipe
    e.preventDefault();

    // Limit swipe offset
    const limitedOffset = Math.max(-MAX_SWIPE, Math.min(MAX_SWIPE, deltaX));
    setSwipeOffset(limitedOffset);
  }, [isSwiping, disabled, isUpdating]);

  const handleTouchEnd = useCallback(async () => {
    if (!isSwiping || disabled || isUpdating) return;

    setIsSwiping(false);

    let newStatus: 'present' | 'absent' | null = null;

    // Swipe LEFT for PRESENT
    if (swipeOffset < -SWIPE_THRESHOLD) {
      newStatus = 'present';
    }
    // Swipe RIGHT for ABSENT
    else if (swipeOffset > SWIPE_THRESHOLD) {
      newStatus = 'absent';
    }

    // Reset offset
    setSwipeOffset(0);

    if (newStatus && newStatus !== status) {
      try {
        setIsUpdating(true);
        triggerHaptic();
        
        // Show visual feedback
        setFeedbackType(newStatus);
        setShowFeedback(true);

        // Call API
        await onStatusChange(studentId, newStatus);
        
        // Update status
        setStatus(newStatus);

        // Clear feedback after animation
        feedbackTimeoutRef.current = setTimeout(() => {
          setShowFeedback(false);
          setFeedbackType(null);
        }, 600);

      } catch (error) {
        console.error('Failed to update attendance:', error);
        // Reset on error
        setShowFeedback(false);
        setFeedbackType(null);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [isSwiping, swipeOffset, status, studentId, onStatusChange, disabled, isUpdating, triggerHaptic]);

  const handleButtonClick = useCallback(async (newStatus: 'present' | 'absent') => {
    if (disabled || isUpdating || status === newStatus) return;

    try {
      setIsUpdating(true);
      triggerHaptic();
      
      setFeedbackType(newStatus);
      setShowFeedback(true);

      await onStatusChange(studentId, newStatus);
      setStatus(newStatus);

      feedbackTimeoutRef.current = setTimeout(() => {
        setShowFeedback(false);
        setFeedbackType(null);
      }, 600);

    } catch (error) {
      console.error('Failed to update attendance:', error);
      setShowFeedback(false);
      setFeedbackType(null);
    } finally {
      setIsUpdating(false);
    }
  }, [disabled, isUpdating, status, studentId, onStatusChange, triggerHaptic]);

  const getStatusBadge = () => {
    if (status === 'present') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white dark:from-green-600 dark:to-green-700">
          <Check className="h-3 w-3" />
          Present
        </span>
      );
    }
    if (status === 'absent') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white dark:from-red-600 dark:to-red-700">
          <X className="h-3 w-3" />
          Absent
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
        Unmarked
      </span>
    );
  };

  const swipeOpacity = Math.min(Math.abs(swipeOffset) / SWIPE_THRESHOLD, 1);

  return (
    <div
      ref={rowRef}
      className={cn(
        "swipeable-row relative overflow-hidden rounded-lg border-2 mb-3 transition-all duration-200",
        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        showFeedback && feedbackType === 'present' && "swipe-feedback-present",
        showFeedback && feedbackType === 'absent' && "swipe-feedback-absent",
        disabled && "opacity-50 cursor-not-allowed",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: 'pan-y',
      }}
    >
      {/* Background Indicators */}
      <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
        {/* Left: PRESENT (Green Check) */}
        <div 
          className={cn(
            "flex items-center gap-2 transition-all duration-150",
            swipeOffset < -SWIPE_THRESHOLD ? "swipe-icon-appear" : "opacity-0"
          )}
          style={{
            opacity: swipeOffset < 0 ? swipeOpacity : 0,
          }}
        >
          <div className="bg-green-500 dark:bg-green-600 rounded-full p-2">
            <Check className="h-6 w-6 text-white" />
          </div>
          <span className="text-green-600 dark:text-green-400 font-bold text-lg">Present</span>
        </div>

        {/* Right: ABSENT (Red X) */}
        <div 
          className={cn(
            "flex items-center gap-2 transition-all duration-150",
            swipeOffset > SWIPE_THRESHOLD ? "swipe-icon-appear" : "opacity-0"
          )}
          style={{
            opacity: swipeOffset > 0 ? swipeOpacity : 0,
          }}
        >
          <span className="text-red-600 dark:text-red-400 font-bold text-lg">Absent</span>
          <div className="bg-red-500 dark:bg-red-600 rounded-full p-2">
            <X className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center z-10">
          <Loader2 className="h-6 w-6 text-blue-500 attendance-spinner" />
        </div>
      )}

      {/* Content */}
      <div
        className="relative z-0 p-4 transition-transform duration-200"
        style={{
          transform: `translateX(${swipeOffset}px)`,
          backgroundColor: swipeOffset < -SWIPE_THRESHOLD 
            ? `rgba(16, 185, 129, ${swipeOpacity * 0.1})` 
            : swipeOffset > SWIPE_THRESHOLD 
            ? `rgba(239, 68, 68, ${swipeOpacity * 0.1})` 
            : 'transparent',
        }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Student Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
              {studentName}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {rollNumber}
            </p>
          </div>

          {/* Status Badge (Mobile) */}
          <div className="md:hidden">
            {getStatusBadge()}
          </div>

          {/* Desktop Buttons + Status */}
          <div className="hidden md:flex items-center gap-3">
            {getStatusBadge()}
            
            <div className="flex gap-2">
              <button
                onClick={() => handleButtonClick('present')}
                disabled={disabled || isUpdating || status === 'present'}
                className={cn(
                  "attendance-button p-2 rounded-lg transition-all duration-200",
                  "hover:bg-green-100 dark:hover:bg-green-900/30",
                  "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                  "active:scale-95",
                  status === 'present' && "bg-green-100 dark:bg-green-900/30",
                  (disabled || isUpdating) && "opacity-50 cursor-not-allowed"
                )}
                aria-label={`Mark ${studentName} as present`}
                title="Mark Present"
              >
                <Check className={cn(
                  "h-5 w-5",
                  status === 'present' ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                )} />
              </button>

              <button
                onClick={() => handleButtonClick('absent')}
                disabled={disabled || isUpdating || status === 'absent'}
                className={cn(
                  "attendance-button p-2 rounded-lg transition-all duration-200",
                  "hover:bg-red-100 dark:hover:bg-red-900/30",
                  "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
                  "active:scale-95",
                  status === 'absent' && "bg-red-100 dark:bg-red-900/30",
                  (disabled || isUpdating) && "opacity-50 cursor-not-allowed"
                )}
                aria-label={`Mark ${studentName} as absent`}
                title="Mark Absent"
              >
                <X className={cn(
                  "h-5 w-5",
                  status === 'absent' ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SwipeableAttendanceRow.displayName = 'SwipeableAttendanceRow';

export default SwipeableAttendanceRow;
