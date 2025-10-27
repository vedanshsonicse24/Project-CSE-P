import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface FacultyCardProps {
  name: string;
  title: string;
  department?: string;
  image: string;
  isHOD?: boolean;
  index?: number;
}

// Animated default avatar using inline SVG + motion
function AnimatedAvatar({ size = 96 }: { size?: number }) {
  const radius = size / 2;
  const stroke = Math.max(4, size * 0.06);
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Head */}
      <motion.circle 
        cx={radius} 
        cy={radius * 0.55} 
        r={size * 0.18} 
        fill="#9CA3AF"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      {/* Shoulders */}
      <motion.path
        d={`M ${radius - size * 0.3} ${radius + size * 0.2}
            C ${radius - size * 0.15} ${radius}, ${radius + size * 0.15} ${radius}, ${radius + size * 0.3} ${radius + size * 0.2}
            L ${radius + size * 0.3} ${size}
            L ${radius - size * 0.3} ${size} Z`}
        fill="#A3A3A3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      />
    </motion.svg>
  );
}

export function FacultyCard({ name, title, department, image, isHOD = false, index = 0 }: FacultyCardProps) {
  return (
    <motion.div
      className={`
        flex-none bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center
        transition-all duration-300 hover:shadow-xl hover:border-gray-200
        ${isHOD ? 'w-72' : 'w-64'}
      `}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: isHOD 
          ? '0 10px 25px rgba(217, 119, 6, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)'
          : '0 10px 25px rgba(30, 58, 138, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Faculty Image Container */}
      <div className={`
        mx-auto rounded-full mb-6 overflow-hidden p-1 relative
        ${isHOD 
          ? 'w-36 h-36 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600' 
          : 'w-32 h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'
        }
      `}>
        {/* Inner white circle for image */}
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={`${name} - ${title}`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        
        {/* HOD Crown Badge */}
        {isHOD && (
          <motion.div 
            className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
        )}
      </div>
      
      {/* Faculty Information */}
      <div className="space-y-3">
        {/* Faculty Name */}
        <motion.h3 
          className={`font-bold leading-tight ${
            isHOD ? 'text-xl text-amber-700' : 'text-lg text-gray-800'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {name}
        </motion.h3>
        
        {/* Faculty Title/Department */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <p className={`text-sm font-medium ${
            isHOD ? 'text-amber-600' : 'text-blue-600'
          }`}>
            {title}
          </p>
          {department && (
            <p className="text-xs text-gray-500 mt-1">
              {department}
            </p>
          )}
        </motion.div>
        
        {/* Special HOD Badge */}
        {isHOD && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <span className="inline-block bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 text-xs px-4 py-2 rounded-full font-semibold border border-amber-300">
              ⭐ Department Head
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}