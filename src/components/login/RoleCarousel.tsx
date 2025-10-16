import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./Card";

interface Role {
  id: string;
  title: string;
  caption: string;
  image: string;
}

interface RoleCarouselProps {
  roles: Role[];
  currentIndex: number;
  onSelectRole: (index: number) => void;
  onConfirmRole?: () => void;
}

export function RoleCarousel({ roles, currentIndex, onSelectRole, onConfirmRole }: RoleCarouselProps) {
  const handlePrevious = () => {
    onSelectRole(currentIndex === 0 ? roles.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onSelectRole(currentIndex === roles.length - 1 ? 0 : currentIndex + 1);
  };

  const handleCardClick = (index: number) => {
    if (index !== currentIndex) {
      onSelectRole(index);
    }
  };

  const getCardStyle = (index: number) => {
    // Calculate the relative position from the current index
    let position = index - currentIndex;
    
    // Handle circular positioning
    if (position > roles.length / 2) {
      position -= roles.length;
    } else if (position < -roles.length / 2) {
      position += roles.length;
    }
    
    if (position === 0) {
      // Active card - center
      return {
        transform: "translateX(-50%) scale(1) rotateY(0deg)",
        opacity: 1,
        zIndex: 10,
        pointerEvents: "auto" as const,
      };
    } else if (position === 1) {
      // Right card
      return {
        transform: "translateX(50%) scale(0.7) rotateY(-35deg)",
        opacity: 0.3,
        zIndex: 5,
        pointerEvents: "none" as const,
      };
    } else if (position === -1) {
      // Left card
      return {
        transform: "translateX(-150%) scale(0.7) rotateY(35deg)",
        opacity: 0.3,
        zIndex: 5,
        pointerEvents: "none" as const,
      };
    } else {
      // Hidden cards
      return {
        transform: position > 0 
          ? "translateX(150%) scale(0.5) rotateY(-45deg)" 
          : "translateX(-250%) scale(0.5) rotateY(45deg)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <div className="carousel-stage">
      <div className="carousel-3d">
        {roles.map((role, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={role.id}
              className="carousel-card-wrapper"
              style={getCardStyle(index)}
              onClick={() => handleCardClick(index)}
            >
              <Card 
                title={role.title} 
                caption={role.caption} 
                image={role.image}
                isActive={isActive}
                onSelect={onConfirmRole}
              />
            </div>
          );
        })}
      </div>
      
      <div className="carousel-controls">
        <button
          onClick={handlePrevious}
          className="carousel-button carousel-button-prev"
          aria-label="Previous role"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="carousel-button carousel-button-next"
          aria-label="Next role"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
