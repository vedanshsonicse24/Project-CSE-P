import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { motion } from "motion/react";

interface CardProps {
  title: string;
  caption: string;
  image: string;
  isActive?: boolean;
  onSelect?: () => void;
}

export function Card({ title, caption, image, isActive, onSelect }: CardProps) {
  return (
    <div className={`carousel-card ${isActive ? 'active-card' : ''}`}>
      <div className="card-image-container">
        <ImageWithFallback
          src={image}
          alt={title}
          className="card-image"
        />
        <div className="card-overlay" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-caption">{caption}</p>
        {isActive && onSelect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={onSelect}
              className="w-full mt-4 text-white"
              style={{ backgroundColor: '#f97316' }}
            >
              Select {title}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
