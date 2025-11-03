import { useEffect, useRef } from "react"
import gsap from "gsap"
import { FacultyCard } from "./FacultyCard"

interface FacultyMember {
  name: string
  role: string
  img: string
}

interface FacultyCarousel3DProps {
  facultyData: FacultyMember[]
}

export function FacultyCarousel3D({ facultyData }: FacultyCarousel3DProps) {
  const ringRef = useRef<HTMLDivElement>(null)
  const xPosRef = useRef(0)
  const autoRotateRef = useRef<number | null>(null)

  useEffect(() => {
    if (!ringRef.current) return
    const ring = ringRef.current
    const cards = ring.querySelectorAll(".carousel-card")

    // ✨ Exact original timeline initialization
    gsap.timeline()
      .set(ring, { rotationY: 180, cursor: "grab" })
      .set(cards, {
        rotateY: (i: number) => i * -36,
        transformOrigin: '50% 50% 500px',
        z: -500,
        backfaceVisibility: "hidden",
      })
      .from(cards, {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: "expo"
      })
      .add(() => {
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(cards, {
              opacity: (i, t) => (t === card ? 1 : 0.5),
              ease: "power3"
            })
          })
          card.addEventListener("mouseleave", () => {
            gsap.to(cards, { opacity: 1, ease: "power2.inOut" })
          })
        })
      }, '-=0.5')

    // Drag handlers - exact original logic
    const dragStart = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      xPosRef.current = Math.round(clientX)
      gsap.set(ring, { cursor: "grabbing" })
      window.addEventListener("mousemove", drag)
      window.addEventListener("touchmove", drag)
      stopAutoRotate()
    }

    const drag = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      
      gsap.to(ring, {
        rotationY: '-=' + ((Math.round(clientX) - xPosRef.current) % 360)
      })
      
      xPosRef.current = Math.round(clientX)
    }

    const dragEnd = () => {
      window.removeEventListener("mousemove", drag)
      window.removeEventListener("touchmove", drag)
      gsap.set(ring, { cursor: "grab" })
      setTimeout(() => startAutoRotate(), 2000)
    }

    window.addEventListener("mousedown", dragStart)
    window.addEventListener("touchstart", dragStart)
    window.addEventListener("mouseup", dragEnd)
    window.addEventListener("touchend", dragEnd)

    // Auto-rotation
    const startAutoRotate = () => {
      autoRotateRef.current = window.setInterval(() => {
        gsap.to(ring, {
          rotationY: "-=0.5",
          duration: 0.5,
          ease: "linear",
        })
      }, 30)
    }

    const stopAutoRotate = () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current)
        autoRotateRef.current = null
      }
    }

    startAutoRotate()

    return () => {
      stopAutoRotate()
      window.removeEventListener("mousedown", dragStart)
      window.removeEventListener("touchstart", dragStart)
      window.removeEventListener("mouseup", dragEnd)
      window.removeEventListener("touchend", dragEnd)
      window.removeEventListener("mousemove", drag)
      window.removeEventListener("touchmove", drag)
    }
  }, [])

  return (
    <div className="faculty-stage">
      {/* 🌟 Central Glow Element */}
      <div className="glow-circle"></div>
      
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <div className="ring" ref={ringRef}>
            {facultyData
              .filter(f => f.name !== "Mrs. Keshika Jangde")
              .slice(0, 10)
              .map((f, i) => (
                <div
                  key={i}
                  className={`carousel-card ${f.role === "HOD" ? "hod-card" : ""}`}
                >
                  <FacultyCard
                    name={f.name}
                    title={f.role}
                    department="Computer Science Engineering"
                    image={f.img}
                    isHOD={f.role === "HOD"}
                    index={i}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* 🎨 Instruction Badge */}
        <div className="instruction-badge">
          <span className="badge-text">← Drag or Use Arrow Keys →</span>
        </div>
      </div>

      <style>{`
        /* 🌌 Professional Clean Background */
        .faculty-stage {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
        }

        /* 🌟 Subtle Central Glow */
        .glow-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
          filter: blur(60px);
          opacity: 0.5;
          z-index: 0;
        }

        /* 📦 Carousel Container - Elevated & Centered */
        .carousel-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          transform: translateY(-30px);
        }

        /* 🔮 Carousel Wrapper with Subtle Shadow */
        .carousel-wrapper {
          perspective: 2000px;
          width: 300px;
          height: 400px;
          max-height: 80vh;
          position: relative;
        }

        .carousel-wrapper::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 140%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(148, 163, 184, 0.06) 0%, transparent 60%);
          box-shadow: 0 0 60px rgba(100, 116, 139, 0.1);
          z-index: -1;
        }

        .ring {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* 🔹 Professional Glass-Morphism Cards */
        .carousel-card {
          width: 300px;
          height: 400px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -150px;
          margin-top: -200px;
          transform-style: preserve-3d;
          will-change: transform;
          transition: opacity 0.3s ease-out;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08),
                      0 4px 12px rgba(0, 0, 0, 0.04);
        }

        /* ✨ Hover Reveal Effect */
        .carousel-card:hover {
          z-index: 10 !important;
        }

        /* 👑 HOD Professional Highlight */
        .hod-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%);
          border: 2px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 12px 48px rgba(59, 130, 246, 0.12),
                      0 4px 16px rgba(59, 130, 246, 0.08);
          position: relative;
        }

        .hod-card::after {
          content: "👑";
          position: absolute;
          top: -25px;
          right: -25px;
          font-size: 32px;
          z-index: 100;
          filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3));
        }

        /* 🎯 Professional Instruction Badge */
        .instruction-badge {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 30px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          z-index: 100;
        }

        .badge-text {
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* 📱 Responsive Design for Tablets */
        @media(max-width: 1024px) {
          .carousel-wrapper { 
            width: 280px; 
            height: 380px;
          }
          .carousel-card { 
            width: 280px; 
            height: 380px;
            margin-left: -140px;
            margin-top: -190px;
          }
          .carousel-container {
            transform: translateY(-20px);
          }
        }

        /* 📱 Responsive Design for Mobile */
        @media(max-width: 768px) {
          .carousel-container {
            transform: translateY(-10px);
            gap: 30px;
          }
          .carousel-wrapper { 
            width: 240px; 
            height: 340px; 
            perspective: 1800px;
          }
          .carousel-card { 
            width: 240px; 
            height: 340px;
            margin-left: -120px;
            margin-top: -170px;
          }
          .instruction-badge {
            padding: 10px 20px;
          }
          .badge-text {
            font-size: 12px;
          }
          .hod-card::after {
            font-size: 24px;
            top: -20px;
            right: -20px;
          }
          .glow-circle {
            width: 400px;
            height: 400px;
            opacity: 0.4;
          }
        }

        /* 📏 Scale Down on Very Short Screens */
        @media(max-height: 700px) {
          .carousel-container {
            transform: scale(0.85) translateY(-40px);
          }
          .instruction-badge {
            padding: 8px 16px;
          }
          .glow-circle {
            width: 450px;
            height: 450px;
            opacity: 0.4;
          }
        }

        /* 📏 Extra Small Mobile Devices */
        @media(max-width: 480px) {
          .carousel-wrapper { 
            width: 200px; 
            height: 280px;
            perspective: 1600px;
          }
          .carousel-card { 
            width: 200px; 
            height: 280px;
            margin-left: -100px;
            margin-top: -140px;
          }
          .instruction-badge {
            padding: 8px 16px;
          }
          .badge-text {
            font-size: 11px;
          }
          .hod-card::after {
            font-size: 20px;
            top: -18px;
            right: -18px;
          }
          .glow-circle {
            width: 300px;
            height: 300px;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}

