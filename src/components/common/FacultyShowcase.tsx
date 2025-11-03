import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { ChevronLeft, ChevronRight, Linkedin, Mail, Award } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FacultyMember {
  id?: number;
  name: string;
  role?: string;
  title?: string;
  department?: string;
  img?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  specialization?: string;
  featured?: boolean;
  tag?: string;
}

interface FacultyShowcaseProps {
  facultyData: FacultyMember[];
  viewMode?: 'carousel' | 'grid';
  showSocial?: boolean;
  onViewProfile?: (faculty: FacultyMember) => void;
}

export function FacultyShowcase({ 
  facultyData, 
  viewMode = 'carousel',
  showSocial = true,
  onViewProfile 
}: FacultyShowcaseProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  // Normalize faculty data to handle different property names
  const normalizedFaculty = facultyData.map((faculty, index) => ({
    id: faculty.id || index,
    name: faculty.name,
    title: faculty.title || faculty.role || 'Faculty Member',
    department: faculty.department || 'Computer Science Engineering',
    image: faculty.image || faculty.img || './assets/default-avatar.png',
    email: faculty.email,
    linkedin: faculty.linkedin,
    specialization: faculty.specialization,
    featured: faculty.featured || faculty.role === 'HOD',
    tag: faculty.tag || (faculty.role === 'HOD' ? 'Department Head' : faculty.featured ? 'Featured' : undefined)
  }));

  if (viewMode === 'grid') {
    return (
      <section className="faculty-showcase-grid">
        <div className="faculty-grid-container">
          {normalizedFaculty.map((faculty, index) => (
            <FacultyCard 
              key={faculty.id} 
              faculty={faculty} 
              index={index}
              showSocial={showSocial}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
        <GridStyles />
      </section>
    );
  }

  return (
    <section className="faculty-showcase">
      {/* Background Elements */}
      <div className="faculty-showcase__background">
        <div className="faculty-glow faculty-glow-1"></div>
        <div className="faculty-glow faculty-glow-2"></div>
      </div>

      <div className="faculty-showcase__container">
        {/* Swiper Carousel */}
        <div className="faculty-showcase__wrapper">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            slidesPerView="auto"
            spaceBetween={30}
            speed={800}
            centeredSlides={true}
            centerInsufficientSlides={true}
            loop={normalizedFaculty.length > 3}
            watchSlidesProgress={true}
            slideToClickedSlide={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
              disabledClass: 'disabled',
            }}
            pagination={{
              el: paginationRef.current,
              type: 'bullets',
              clickable: true,
              bulletClass: 'faculty-pagination__bullet',
              bulletActiveClass: 'active',
            }}
            breakpoints={{
              320: {
                spaceBetween: 15,
              },
              768: {
                spaceBetween: 25,
              },
              1024: {
                spaceBetween: 30,
              },
            }}
            onSlideChange={(swiper) => {
              const slides = swiper.slides;
              slides.forEach((slide, index) => {
                const slideElement = slide as HTMLElement;
                slideElement.style.opacity = '';
                slideElement.style.transform = '';
                
                if (index === swiper.activeIndex) {
                  slideElement.classList.add('faculty-slide-active-glow');
                } else {
                  slideElement.classList.remove('faculty-slide-active-glow');
                }
              });
            }}
            onProgress={(swiper) => {
              swiper.slides.forEach((slide, index) => {
                const slideElement = slide as HTMLElement;
                const slideProgress = (slideElement as any).progress || 0;
                
                if (index !== swiper.activeIndex) {
                  const opacity = Math.max(0.7, 1 - Math.abs(slideProgress) * 0.3);
                  slideElement.style.opacity = opacity.toString();
                } else {
                  slideElement.style.opacity = '1';
                }
              });
            }}
            className="faculty-swiper"
          >
            {normalizedFaculty.map((faculty, index) => (
              <SwiperSlide key={faculty.id} className="faculty-slide">
                <FacultyCard 
                  faculty={faculty} 
                  index={index}
                  showSocial={showSocial}
                  onViewProfile={onViewProfile}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button 
            ref={prevRef} 
            className="faculty-nav faculty-nav--prev"
            aria-label="Previous faculty member"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            ref={nextRef} 
            className="faculty-nav faculty-nav--next"
            aria-label="Next faculty member"
          >
            <ChevronRight size={28} />
          </button>

          {/* Pagination */}
          <div ref={paginationRef} className="faculty-pagination"></div>
        </div>
      </div>

      <CarouselStyles />
    </section>
  );
}

// Individual Faculty Card Component
function FacultyCard({ 
  faculty, 
  index,
  showSocial,
  onViewProfile 
}: { 
  faculty: FacultyMember; 
  index: number;
  showSocial: boolean;
  onViewProfile?: (faculty: FacultyMember) => void;
}) {
  return (
    <div className={`faculty-card ${faculty.featured ? 'faculty-card--featured' : ''}`}>
      {/* Featured Badge */}
      {faculty.tag && (
        <div className="faculty-card__badge">
          {faculty.featured && <Award size={14} />}
          <span>{faculty.tag}</span>
        </div>
      )}

      {/* Profile Image */}
      <div className="faculty-card__image-wrapper">
        <div className={`faculty-card__image-border ${faculty.featured ? 'faculty-card__image-border--featured' : ''}`}>
          <ImageWithFallback
            src={faculty.image}
            alt={`${faculty.name} - ${faculty.title}`}
            className="faculty-card__image"
          />
        </div>
      </div>

      {/* Faculty Information */}
      <div className="faculty-card__content">
        <h3 className="faculty-card__name">{faculty.name}</h3>
        <p className="faculty-card__title">{faculty.title}</p>
        {faculty.department && (
          <p className="faculty-card__department">{faculty.department}</p>
        )}
        {faculty.specialization && (
          <p className="faculty-card__specialization">{faculty.specialization}</p>
        )}

        {/* Social Links */}
        {showSocial && (faculty.email || faculty.linkedin) && (
          <div className="faculty-card__social">
            {faculty.email && (
              <a 
                href={`mailto:${faculty.email}`}
                className="faculty-card__social-link"
                aria-label={`Email ${faculty.name}`}
              >
                <Mail size={18} />
              </a>
            )}
            {faculty.linkedin && (
              <a 
                href={faculty.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="faculty-card__social-link"
                aria-label={`${faculty.name}'s LinkedIn profile`}
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        )}

        {/* View Profile Button */}
        {onViewProfile && (
          <button 
            className="faculty-card__profile-btn"
            onClick={() => onViewProfile(faculty)}
          >
            View Profile
          </button>
        )}
      </div>
    </div>
  );
}

// Carousel Styles Component
function CarouselStyles() {
  return (
    <style>{`
      /* ═══════════════════════════════════════════════════════════
         FACULTY SHOWCASE - CAROUSEL MODE
      ═══════════════════════════════════════════════════════════ */

      .faculty-showcase {
        position: relative;
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 80px 0;
        background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      }

      /* Background Glow Effects */
      .faculty-showcase__background {
        position: absolute;
        inset: 0;
        z-index: 0;
      }

      .faculty-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.12;
        animation: glowFloat 10s ease-in-out infinite;
      }

      .faculty-glow-1 {
        width: 700px;
        height: 700px;
        background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
        top: -15%;
        right: -10%;
        animation-delay: 0s;
      }

      .faculty-glow-2 {
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
        bottom: -10%;
        left: -5%;
        animation-delay: 5s;
      }

      @keyframes glowFloat {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -30px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }

      .faculty-showcase__container {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .faculty-showcase__wrapper {
        position: relative;
        padding: 60px 80px;
      }

      .faculty-swiper {
        overflow: visible !important;
        padding: 40px 0 80px 0;
      }

      .swiper-wrapper {
        align-items: center;
      }

      /* Faculty Slide */
      .faculty-slide {
        width: 380px !important;
        height: auto;
        transition: opacity 0.8s ease;
      }

      .faculty-slide.faculty-slide-active-glow .faculty-card {
        transform: translateY(-10px) scale(1.02);
      }

      /* Faculty Card */
      .faculty-card {
        background: linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 100%
        );
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 40px 30px;
        text-align: center;
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 
          0 20px 60px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.05);
        position: relative;
        overflow: hidden;
      }

      /* Active Card Glow */
      .faculty-slide.swiper-slide-active .faculty-card,
      .faculty-slide.faculty-slide-active-glow .faculty-card {
        background: linear-gradient(
          145deg,
          rgba(59, 130, 246, 0.15) 0%,
          rgba(255, 255, 255, 0.08) 100%
        );
        border-color: rgba(59, 130, 246, 0.5);
        box-shadow: 
          0 0 50px rgba(59, 130, 246, 0.3),
          0 0 100px rgba(59, 130, 246, 0.15),
          0 25px 70px rgba(0, 0, 0, 0.4);
      }

      /* Glow Ring for Active Card */
      .faculty-slide.swiper-slide-active .faculty-card::before,
      .faculty-slide.faculty-slide-active-glow .faculty-card::before {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 24px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6, #3b82f6);
        z-index: -1;
        opacity: 0.4;
        animation: glowRotate 4s linear infinite;
      }

      @keyframes glowRotate {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }

      .faculty-card:hover {
        transform: translateY(-8px);
        border-color: rgba(59, 130, 246, 0.4);
      }

      /* Featured Card Styling */
      .faculty-card--featured {
        background: linear-gradient(
          145deg,
          rgba(251, 191, 36, 0.12) 0%,
          rgba(255, 255, 255, 0.08) 100%
        );
        border-color: rgba(251, 191, 36, 0.3);
      }

      /* Badge */
      .faculty-card__badge {
        position: absolute;
        top: 16px;
        right: 16px;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 4px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        z-index: 2;
      }

      .faculty-card--featured .faculty-card__badge {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
      }

      /* Image Wrapper */
      .faculty-card__image-wrapper {
        margin-bottom: 24px;
        display: flex;
        justify-content: center;
      }

      .faculty-card__image-border {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        padding: 4px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
        transition: all 0.4s ease;
      }

      .faculty-card__image-border--featured {
        background: linear-gradient(135deg, #f59e0b, #dc2626);
        box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
      }

      .faculty-card:hover .faculty-card__image-border {
        transform: scale(1.05);
        box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
      }

      .faculty-card__image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid rgba(15, 23, 42, 0.8);
      }

      /* Content */
      .faculty-card__content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .faculty-card__name {
        font-size: 1.5rem;
        font-weight: 700;
        color: #f8fafc;
        margin: 0;
        line-height: 1.3;
      }

      .faculty-card__title {
        font-size: 1rem;
        font-weight: 600;
        color: #3b82f6;
        margin: 0;
      }

      .faculty-card--featured .faculty-card__title {
        color: #fbbf24;
      }

      .faculty-card__department {
        font-size: 0.875rem;
        color: #94a3b8;
        margin: 0;
      }

      .faculty-card__specialization {
        font-size: 0.813rem;
        color: #64748b;
        font-style: italic;
        margin: 4px 0 0 0;
      }

      /* Social Links */
      .faculty-card__social {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 16px;
      }

      .faculty-card__social-link {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #60a5fa;
        transition: all 0.3s ease;
        text-decoration: none;
      }

      .faculty-card__social-link:hover {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      /* Profile Button */
      .faculty-card__profile-btn {
        margin-top: 20px;
        padding: 12px 28px;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 0.938rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      .faculty-card__profile-btn:hover {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
      }

      /* Navigation Buttons */
      .faculty-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      .faculty-nav:hover:not(.disabled) {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.5);
        transform: translateY(-50%) scale(1.1);
      }

      .faculty-nav.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .faculty-nav--prev {
        left: 0;
      }

      .faculty-nav--next {
        right: 0;
      }

      /* Pagination */
      .faculty-pagination {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 40px;
      }

      .faculty-pagination__bullet {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }

      .faculty-pagination__bullet:hover {
        background: rgba(255, 255, 255, 0.5);
        transform: scale(1.2);
      }

      .faculty-pagination__bullet.active {
        background: #3b82f6;
        width: 32px;
        border-radius: 6px;
        border-color: rgba(59, 130, 246, 0.3);
        box-shadow: 0 0 16px rgba(59, 130, 246, 0.5);
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .faculty-showcase__wrapper {
          padding: 40px 60px;
        }

        .faculty-slide {
          width: 340px !important;
        }

        .faculty-nav {
          width: 50px;
          height: 50px;
        }
      }

      @media (max-width: 768px) {
        .faculty-showcase {
          padding: 60px 0;
        }

        .faculty-showcase__wrapper {
          padding: 30px 15px;
        }

        .faculty-slide {
          width: 300px !important;
        }

        .faculty-card {
          padding: 30px 20px;
        }

        .faculty-card__image-border {
          width: 140px;
          height: 140px;
        }

        .faculty-nav {
          width: 44px;
          height: 44px;
        }

        .faculty-nav--prev {
          left: -5px;
        }

        .faculty-nav--next {
          right: -5px;
        }
      }

      @media (max-width: 480px) {
        .faculty-slide {
          width: 260px !important;
        }

        .faculty-card {
          padding: 25px 18px;
        }

        .faculty-card__image-border {
          width: 120px;
          height: 120px;
        }

        .faculty-card__name {
          font-size: 1.25rem;
        }

        .faculty-nav {
          width: 40px;
          height: 40px;
        }
      }
    `}</style>
  );
}

// Grid Styles Component
function GridStyles() {
  return (
    <style>{`
      /* ═══════════════════════════════════════════════════════════
         FACULTY SHOWCASE - GRID MODE
      ═══════════════════════════════════════════════════════════ */

      .faculty-showcase-grid {
        width: 100%;
        padding: 60px 20px;
        background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
      }

      .faculty-grid-container {
        max-width: 1400px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 32px;
      }

      .faculty-showcase-grid .faculty-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
      }

      .faculty-showcase-grid .faculty-card:nth-child(1) { animation-delay: 0.1s; }
      .faculty-showcase-grid .faculty-card:nth-child(2) { animation-delay: 0.2s; }
      .faculty-showcase-grid .faculty-card:nth-child(3) { animation-delay: 0.3s; }
      .faculty-showcase-grid .faculty-card:nth-child(4) { animation-delay: 0.4s; }
      .faculty-showcase-grid .faculty-card:nth-child(5) { animation-delay: 0.5s; }
      .faculty-showcase-grid .faculty-card:nth-child(6) { animation-delay: 0.6s; }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .faculty-grid-container {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
      }

      @media (max-width: 480px) {
        .faculty-grid-container {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }
    `}</style>
  );
}
