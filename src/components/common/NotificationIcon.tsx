import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './NotificationIcon.css';

interface NotificationIconProps {
  onClick?: () => void;
  className?: string;
  hasNotifications?: boolean;
  notificationCount?: number;
}

/**
 * NotificationIcon Component
 * 
 * A reusable, animated notification bell icon with GSAP animations.
 * Features:
 * - Entry animation (slide-in from left with bounce)
 * - Hover animation (scale up)
 * - Optional notification badge
 * - Fully accessible with aria-label
 * 
 * @param onClick - Callback when icon is clicked
 * @param className - Additional CSS classes
 * @param hasNotifications - Show visual indicator for unread notifications
 * @param notificationCount - Number of notifications to display
 */
export const NotificationIcon = ({
  onClick,
  className = '',
  hasNotifications = false,
  notificationCount = 0,
}: NotificationIconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    // Entry animation on mount
    gsap.from(iconRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 0.2,
    });
  }, []);

  const handleMouseEnter = () => {
    if (!bellRef.current) return;

    // Scale up on hover
    gsap.to(bellRef.current, {
      scale: 1.15,
      duration: 0.2,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    if (!bellRef.current) return;

    // Scale back to normal
    gsap.to(bellRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power1.in',
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (bellRef.current) {
      // Brief wiggle animation on click
      gsap.fromTo(
        bellRef.current,
        { rotate: 0 },
        {
          rotate: 360,
          duration: 0.4,
          ease: 'elastic.out(1, 0.3)',
        }
      );
    }

    onClick?.();
  };

  return (
    <div
      ref={iconRef}
      className={`notification-icon-wrapper ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} new)` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as any);
        }
      }}
    >
      <svg
        ref={bellRef}
        className="notification-bell-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>

      {/* Notification Badge */}
      {hasNotifications && (
        <div className="notification-badge">
          {notificationCount > 9 ? '9+' : notificationCount}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
