import React from 'react';

interface WaveSeparatorProps {
  theme?: 'white' | 'blue' | 'gray';
  variant?: 'default' | 'subtle' | 'bold';
}

const WaveSeparator: React.FC<WaveSeparatorProps> = ({ 
  theme = 'white', 
  variant = 'default' 
}) => {
  const getColors = () => {
    switch (theme) {
      case 'blue':
        return {
          primary: '#1e3a8a',
          secondary: '#3b82f6',
        };
      case 'gray':
        return {
          primary: '#374151',
          secondary: '#6b7280',
        };
      case 'white':
      default:
        return {
          primary: '#ffffff',
          secondary: '#f3f4f6',
        };
    }
  };

  const getOpacity = () => {
    switch (variant) {
      case 'subtle':
        return 0.3;
      case 'bold':
        return 1;
      case 'default':
      default:
        return 0.6;
    }
  };

  const colors = getColors();
  const opacity = getOpacity();

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '80px' }}>
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        <defs>
          <linearGradient id={`grad-${theme}-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: colors.primary, stopOpacity: opacity }} />
            <stop offset="50%" style={{ stopColor: colors.secondary, stopOpacity: opacity * 0.8 }} />
            <stop offset="100%" style={{ stopColor: colors.primary, stopOpacity: opacity }} />
          </linearGradient>
        </defs>
        <path
          d="M0,48 C150,80 350,0 600,48 C850,96 1050,16 1200,48 L1200,120 L0,120 Z"
          fill={`url(#grad-${theme}-${variant})`}
        />
        <path
          d="M0,72 C200,96 400,48 600,72 C800,96 1000,48 1200,72 L1200,120 L0,120 Z"
          fill={colors.primary}
          style={{ opacity: opacity * 0.5 }}
        />
      </svg>
    </div>
  );
};

export default WaveSeparator;
