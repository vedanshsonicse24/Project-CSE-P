import { useState } from "react";
import { User, Lock, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface LoginPageProps {
  onLogin: (role: "faculty" | "student" | "hod" | "admin", username: string, rememberMe?: boolean) => void;
  onNavigateToHome?: () => void;
  onNavigateToRegister?: (role: "student" | "faculty") => void;
}

const roleData = [
  {
    id: "student",
    title: "Student Portal",
    heading: "Welcome Students",
    description: "Access your courses, grades, assignments, and academic resources. Stay connected with your learning journey.",
    gradient: "linear-gradient(135deg, #800000 0%, #a00000 100%)",
    shapes: [
      { type: "circle", size: 200, x: 10, y: 60, color: "rgba(255, 255, 255, 0.1)" },
      { type: "line", width: 150, x: 20, y: 40, rotation: 45, color: "rgba(160, 0, 0, 0.4)" },
      { type: "line", width: 100, x: 60, y: 70, rotation: -30, color: "rgba(96, 165, 250, 0.3)" },
      { type: "pill", width: 120, x: 70, y: 30, rotation: 20, color: "rgba(96, 165, 250, 0.4)" },
    ]
  },
  {
    id: "faculty",
    title: "Faculty Portal",
    heading: "Welcome Faculty",
    description: "Manage your classes, track student progress, grade assignments, and collaborate with colleagues.",
    gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
    shapes: [
      { type: "circle", size: 180, x: 15, y: 50, color: "rgba(255, 255, 255, 0.1)" },
      { type: "line", width: 120, x: 25, y: 35, rotation: 60, color: "rgba(255, 255, 255, 0.3)" },
      { type: "line", width: 130, x: 65, y: 65, rotation: -45, color: "rgba(96, 165, 250, 0.5)" },
      { type: "pill", width: 140, x: 5, y: 75, rotation: 10, color: "rgba(255, 255, 255, 0.2)" },
    ]
  },
  {
    id: "hod",
    title: "HOD Portal",
    heading: "Welcome HOD",
    description: "Full system access and administrative controls. Oversee department operations, approve requests, manage faculty and students, and make strategic decisions.",
    gradient: "linear-gradient(135deg, #ff7b00 0%, #ff9500 100%)",
    shapes: [
      { type: "circle", size: 220, x: 5, y: 55, color: "rgba(255, 255, 255, 0.1)" },
      { type: "line", width: 140, x: 15, y: 45, rotation: 50, color: "rgba(255, 123, 0, 0.4)" },
      { type: "line", width: 110, x: 70, y: 60, rotation: -35, color: "rgba(249, 115, 22, 0.3)" },
      { type: "pill", width: 160, x: 60, y: 25, rotation: 15, color: "rgba(251, 146, 60, 0.4)" },
    ]
  },
];

export function LoginPage({ onLogin, onNavigateToHome, onNavigateToRegister }: LoginPageProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentRole = roleData[currentRoleIndex];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      let finalRole: "faculty" | "student" | "hod" | "admin" = "student";
      
      if (currentRole.id === "student") {
        finalRole = "student";
        toast.success(`Successfully logged in as ${currentRole.title}`);
      } else if (currentRole.id === "faculty") {
        finalRole = "faculty";
        toast.success(`Successfully logged in as Faculty`);
      } else if (currentRole.id === "hod") {
        finalRole = "hod";
        toast.success(`Successfully logged in as ${currentRole.title}`);
      }
      
      onLogin(finalRole, email, rememberMe);
    }, 1500);
  };

  const renderShape = (shape: any, index: number) => {
    if (shape.type === "circle") {
      return (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.color,
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    }
    
    if (shape.type === "line") {
      return (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${shape.width}px`,
            height: '8px',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.color,
            transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
          }}
        />
      );
    }
    
    if (shape.type === "pill") {
      return (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${shape.width}px`,
            height: '40px',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.color,
            transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
          }}
        />
      );
    }
    
    return null;
  };

  return (
    <div className="split-login-page">
      <Toaster position="top-center" />
      
      {/* Role Selector */}
      <div className="role-selector">
        {roleData.map((role, index) => (
          <button
            key={role.id}
            onClick={() => setCurrentRoleIndex(index)}
            className={`role-selector-btn ${index === currentRoleIndex ? 'active' : ''}`}
          >
            {role.title}
          </button>
        ))}
      </div>

      <div className="split-container">
        {/* Left Side - Gradient Background with Building Image */}
        <div 
          className="split-left relative" 
          style={{ background: currentRole.gradient }}
        >
          {/* Background Image with Opacity */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: "url('/src/assets/building.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.30
            }}
          />
          
          {/* Content Overlay */}
          <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="left-content"
            >
              {/* Decorative Shapes */}
              <div className="shapes-container">
                {currentRole.shapes.map((shape, index) => renderShape(shape, index))}
              </div>

              {/* Content */}
              <div className="welcome-content">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="welcome-title"
                >
                  {currentRole.heading}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="welcome-description"
                >
                  {currentRole.description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="split-right">
          <div className="login-form-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="login-form-title" style={{ color: '#800000' }}>
                {currentRole.title.toUpperCase()}
              </h2>

              <form onSubmit={handleSubmit} className="login-form">
                {/* Email Input */}
                <div className="form-input-group">
                  <div className="input-icon">
                    <User className="icon" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email or Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="split-input"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="form-input-group">
                  <div className="input-icon">
                    <Lock className="icon" />
                  </div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="split-input"
                    required
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="form-footer">
                  <label className="remember-checkbox">
                    <div 
                      className={`custom-checkbox ${rememberMe ? 'checked' : ''}`}
                      onClick={() => setRememberMe(!rememberMe)}
                    >
                      {rememberMe && <Check className="h-3 w-3" />}
                    </div>
                    <span>Remember</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="login-submit-btn"
                  disabled={isLoading}
                  style={{ background: currentRole.gradient }}
                >
                  {isLoading ? "SIGNING IN..." : "LOGIN"}
                </Button>

                {/* Registration Button */}
                {onNavigateToRegister && (currentRole.id === "student" || currentRole.id === "faculty") && (
                  <div className="w-full mt-4">
                    <p className="text-center text-sm text-gray-600 mb-2">Don't have an account?</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => onNavigateToRegister(currentRole.id as "student" | "faculty")}
                      style={{ 
                        borderColor: "#800000",
                        color: "#800000"
                      }}
                    >
                      Register as {currentRole.id === "student" ? "Student" : "Faculty"}
                    </Button>
                  </div>
                )}

                {/* Home Button */}
                {onNavigateToHome && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-4"
                    onClick={onNavigateToHome}
                    style={{ borderColor: '#60a5fa', color: '#800000' }}
                  >
                    Back to Home
                  </Button>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
