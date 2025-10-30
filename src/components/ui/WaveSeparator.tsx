import React from 'react';

interface WaveSeparatorProps {
  /**
   * The fill color of the wave
   * @default "#ffffff"
   */
  fillColor?: string;
  /**
   * Additional CSS classes to apply to the SVG
   */
  className?: string;
  /**
   * The wave variant - different wave patterns
   * @default "default"
   */
  variant?: 'default' | 'inverted' | 'smooth' | 'sharp';
  /**
   * Predefined color themes for light theme design
   */
  theme?: 'white' | 'light-blue' | 'light-gray' | 'dark' | 'custom';
  /**
   * Add padding for better spacing, especially for dark themes
   */
  withPadding?: boolean;
}

const WaveSeparator: React.FC<WaveSeparatorProps> = ({ 
  fillColor = "#ffffff", 
  className = "w-full h-auto",
  variant = "default",
  theme = "custom",
  withPadding = false
}) => {
  const getThemeColor = () => {
    switch (theme) {
      case 'white':
        return "#ffffff";
      case 'light-blue':
        return "#dbeafe";
      case 'light-gray':
        return "#f9fafb";
      case 'dark':
        return "#1f2937";
      case 'custom':
      default:
        return fillColor;
    }
  };

  const getWavePath = () => {
    switch (variant) {
      case 'inverted':
        return "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,69.3C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z";
      case 'smooth':
        return "M0,96L60,85.3C120,75,240,53,360,48C480,43,600,53,720,69.3C840,85,960,107,1080,112C1200,117,1320,107,1380,101.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z";
      case 'sharp':
        return "M0,64L120,85.3C240,107,480,149,720,149.3C960,149,1200,107,1320,85.3L1440,64L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z";
      default:
        return "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z";
    }
  };

  return (
    <div className={withPadding ? "py-4" : ""}>
      <svg viewBox="0 0 1440 120" className={className}>
        <path 
          fill={getThemeColor()} 
          d={getWavePath()}
        />
      </svg>
    </div>
  );
};

export default WaveSeparator;