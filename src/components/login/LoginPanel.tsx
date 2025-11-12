import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { motion } from "motion/react";
import { API_ENDPOINTS } from "../../server";

interface LoginPanelProps {
  selectedRole: string;
  onLogin: (role: string, username: string) => void;
}

export function LoginPanel({ selectedRole, onLogin }: LoginPanelProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.loginModule.panel, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role: selectedRole.toLowerCase()
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        // Store token and user data
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('userData', JSON.stringify(result.data.user));
        localStorage.setItem('userRole', selectedRole.toLowerCase());
        
        toast.success(result.message || `Successfully logged in as ${selectedRole}`);
        
        // Call onLogin callback
        onLogin(selectedRole.toLowerCase().replace(" ", ""), username);
      } else {
        toast.error(result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="login-panel-centered"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="login-panel-header-centered"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="login-panel-title-centered">
          AS {selectedRole.toUpperCase()}
        </h2>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="login-panel-form-centered"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div 
          className="form-group-centered"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Label htmlFor="username" className="form-label-centered">ID / EMAIL</Label>
          <Input
            id="username"
            type="text"
            placeholder="superadmin@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input-centered"
            required
          />
        </motion.div>

        <motion.div 
          className="form-group-centered"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Label htmlFor="password" className="form-label-centered">PASSWORD</Label>
          <div className="password-input-wrapper">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input-centered password-input"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-centered"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Button
            type="submit"
            className="login-button-centered"
            disabled={isLoading}
          >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              SIGNING IN...
            </>
          ) : (
            <>
              → SIGN IN
            </>
          )}
          </Button>
        </motion.div>
      </motion.form>

      <motion.div 
        className="login-panel-footer-centered"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
      </motion.div>
    </motion.div>
  );
}
