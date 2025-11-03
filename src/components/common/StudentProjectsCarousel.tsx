import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectData {
  id: number;
  title: string;
  description: string;
  contributors: string;
  duration: string;
  backgroundImage: string;
  projectLink: string;
  tag?: string;
}

interface StudentProjectsCarouselProps {
  projects: ProjectData[];
}

export function StudentProjectsCarousel({ projects }: StudentProjectsCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  // Dynamically duplicate project cards for smoother scrolling experience
  // Creates 3 copies of each project to ensure seamless carousel flow
  const duplicatedProjects = [...projects, ...projects, ...projects];

  // Use the projects with their original tags (no auto-generation needed now)
  const enhancedProjects = duplicatedProjects;

  return (
    <section className="emotions-slider">
      {/* Dark radial gradient background with spotlight effects */}
      <div className="emotions-slider__background">
        <div className="spotlight spotlight-1"></div>
        <div className="spotlight spotlight-2"></div>
        <div className="spotlight spotlight-3"></div>
      </div>

      <div className="emotions-slider__container">
        {/* Section Title */}
        <div className="emotions-slider__header">
          <h2 className="emotions-slider__title">Student Projects</h2>
          <p className="emotions-slider__subtitle">
            Discover innovative projects created by our talented students
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="emotions-slider__wrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView="auto"
            spaceBetween={20}
            speed={600}
            centeredSlides={true}
            centerInsufficientSlides={true}
            initialSlide={Math.floor(enhancedProjects.length / 2)}
            loop={true}
            loopAddBlankSlides={false}
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
              bulletClass: 'slider-pagination__item',
              bulletActiveClass: 'active',
            }}
            breakpoints={{
              768: {
                spaceBetween: 40,
              },
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                swiper.params.pagination.el = paginationRef.current;
              }
            }}
            onSlideChange={(swiper) => {
              // Update active slide styling dynamically
              const slides = swiper.slides;
              slides.forEach((slide, index) => {
                const slideElement = slide as HTMLElement;
                // Remove inline styles that might interfere
                slideElement.style.opacity = '';
                slideElement.style.transform = '';
                
                // Add custom active class
                if (index === swiper.activeIndex) {
                  slideElement.classList.add('swiper-slide-active-custom');
                } else {
                  slideElement.classList.remove('swiper-slide-active-custom');
                }
              });
            }}
            onProgress={(swiper) => {
              // Apply smooth opacity and scale transitions based on slide progress
              // Only for non-active slides to maintain centered active slide
              swiper.slides.forEach((slide, index) => {
                const slideElement = slide as HTMLElement;
                const slideProgress = (slideElement as any).progress || 0;
                
                // Don't apply to active slide - let CSS handle it
                if (index !== swiper.activeIndex) {
                  const opacity = Math.max(0.6, 1 - Math.abs(slideProgress) * 0.4);
                  const scale = Math.max(0.9, 1 - Math.abs(slideProgress) * 0.1);
                  slideElement.style.opacity = opacity.toString();
                  slideElement.style.transform = `scale(${scale})`;
                } else {
                  // Ensure active slide has full opacity and scale
                  slideElement.style.opacity = '1';
                  slideElement.style.transform = 'scale(1)';
                }
              });
            }}
            className="emotions-swiper"
          >
            {enhancedProjects.map((project, index) => (
              <SwiperSlide key={`${project.id}-${index}`} className="emotions-slide">
                <div className="project-card">
                  {/* Project Image */}
                  <div 
                    className="project-card__image"
                    style={{
                      backgroundImage: `url(${project.backgroundImage})`,
                    }}
                  >
                    {project.tag && (
                      <span className="project-card__tag">{project.tag}</span>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="project-card__content">
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__description">{project.description}</p>
                    
                    <div className="project-card__meta">
                      <span className="project-card__meta-item">
                        👥 {project.contributors}
                      </span>
                      <span className="project-card__meta-item">
                        ⏱️ {project.duration}
                      </span>
                    </div>

                    <a 
                      href={project.projectLink} 
                      className="project-card__link"
                      onClick={(e) => {
                        if (project.projectLink === '#') {
                          e.preventDefault();
                        }
                      }}
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button 
            ref={prevRef} 
            className="slider-nav__item slider-nav__item_prev"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            ref={nextRef} 
            className="slider-nav__item slider-nav__item_next"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination */}
          <div ref={paginationRef} className="slider-pagination"></div>
        </div>
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════
           EMOTIONS SLIDER - ABSTRACT ART SHOWCASE DESIGN
        ═══════════════════════════════════════════════════════════ */

        .emotions-slider {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 80px 0;
        }

        /* Dark Radial Gradient Background with Spotlight Effects */
        .emotions-slider__background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at center,
            #1a1a2e 0%,
            #16213e 50%,
            #0f0f1e 100%
          );
          z-index: 0;
        }

        .spotlight {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          animation: pulse 8s ease-in-out infinite;
        }

        .spotlight-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
          top: -10%;
          left: 10%;
          animation-delay: 0s;
        }

        .spotlight-2 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
          bottom: -15%;
          right: 5%;
          animation-delay: 2s;
        }

        .spotlight-3 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #ec4899 0%, transparent 70%);
          top: 40%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 4s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }

        .emotions-slider__container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header Section */
        .emotions-slider__header {
          text-align: center;
          margin-bottom: 60px;
        }

        .emotions-slider__title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .emotions-slider__subtitle {
          font-size: 1.125rem;
          color: #94a3b8;
          font-weight: 400;
        }

        /* Swiper Wrapper */
        .emotions-slider__wrapper {
          position: relative;
          padding: 40px 0;
        }

        .emotions-swiper {
          overflow: visible !important;
          padding: 20px 0 60px 0;
        }

        /* Center slides properly */
        .swiper-wrapper {
          display: flex;
          align-items: center;
        }

        /* Slide Styling with Active Glow */
        .emotions-slide {
          width: 380px !important;
          height: auto;
          transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0.6;
        }

        /* Active slide - centered with glowing blue effect */
        .emotions-slide.swiper-slide-active,
        .emotions-slide.swiper-slide-active-custom {
          opacity: 1 !important;
          transform: scale(1) !important;
          z-index: 10;
        }

        /* Ensure proper centering */
        .swiper-slide-active {
          z-index: 10;
        }

        /* Project Card Design */
        .project-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Glowing blue background for active slide */
        .emotions-slide.swiper-slide-active .project-card,
        .emotions-slide.swiper-slide-active-custom .project-card {
          background: linear-gradient(
            135deg,
            rgba(30, 41, 59, 0.8) 0%,
            rgba(37, 99, 235, 0.2) 50%,
            rgba(30, 41, 59, 0.8) 100%
          );
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 
            0 0 40px rgba(59, 130, 246, 0.4),
            0 0 80px rgba(59, 130, 246, 0.2),
            0 25px 80px rgba(0, 0, 0, 0.3);
          transform: translateY(0);
        }

        /* Add glow ring around active card */
        .emotions-slide.swiper-slide-active .project-card::before,
        .emotions-slide.swiper-slide-active-custom .project-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            #3b82f6 0%,
            #60a5fa 50%,
            #3b82f6 100%
          );
          z-index: -1;
          opacity: 0.6;
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; filter: blur(8px); }
          50% { opacity: 0.7; filter: blur(12px); }
        }

        /* Inactive cards styling */
        .emotions-slide:not(.swiper-slide-active) .project-card {
          opacity: 0.7;
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.6);
        }

        /* Override hover on active slide */
        .emotions-slide.swiper-slide-active .project-card:hover,
        .emotions-slide.swiper-slide-active-custom .project-card:hover {
          transform: translateY(-5px);
        }

        .project-card__image {
          width: 100%;
          height: 240px;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
        }

        .project-card__image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(15, 23, 42, 0.8) 100%
          );
        }

        .project-card__tag {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(59, 130, 246, 0.9);
          backdrop-filter: blur(10px);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .project-card__content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .project-card__title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0;
          line-height: 1.3;
        }

        .project-card__description {
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }

        .project-card__meta {
          display: flex;
          gap: 16px;
          margin-top: 8px;
        }

        .project-card__meta-item {
          font-size: 0.875rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .project-card__link {
          display: inline-block;
          margin-top: 12px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .project-card__link:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }

        /* Navigation Buttons */
        .slider-nav__item {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .slider-nav__item:hover:not(.disabled) {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.6);
          transform: translateY(-50%) scale(1.1);
        }

        .slider-nav__item.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .slider-nav__item_prev {
          left: 20px;
        }

        .slider-nav__item_next {
          right: 20px;
        }

        /* Pagination Bullets */
        .slider-pagination {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .slider-pagination__item {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(148, 163, 184, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .slider-pagination__item:hover {
          background: rgba(148, 163, 184, 0.5);
          transform: scale(1.2);
        }

        .slider-pagination__item.active {
          background: #3b82f6;
          width: 32px;
          border-radius: 6px;
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .emotions-slider {
            padding: 60px 0;
          }

          .emotions-slider__header {
            margin-bottom: 40px;
          }

          .emotions-slide {
            width: 300px !important;
          }

          .slider-nav__item {
            width: 44px;
            height: 44px;
          }

          .slider-nav__item_prev {
            left: 10px;
          }

          .slider-nav__item_next {
            right: 10px;
          }

          .project-card__image {
            height: 200px;
          }

          .project-card__content {
            padding: 20px;
          }

          .project-card__title {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .emotions-slide {
            width: 260px !important;
          }

          .slider-nav__item {
            width: 40px;
            height: 40px;
          }

          .project-card__image {
            height: 180px;
          }
        }
      `}</style>
    </section>
  );
}
