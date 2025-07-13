import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface LoginPageProps {
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const demoCredentials = {
    admin: { email: 'admin@vikramuniv.ac.in', password: 'password' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Login successful!');
        onClose();
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const fillDemoCredentials = () => {
    const credentials = demoCredentials.admin;
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-600 text-sm">Sign in to administrator account</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-10"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pl-10 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="text-blue-500 mt-0.5" size={16} />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Demo Credentials</h4>
                  <p className="text-xs text-blue-700 mt-1 mb-3">
                    Click below to auto-fill admin credentials for testing:
                  </p>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials()}
                      className="block w-full text-left px-3 py-2 text-xs bg-white rounded border hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium">Admin:</span>
                      <span className="text-gray-600 ml-2">
                        {demoCredentials.admin.email}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    Password: <code className="bg-white px-1 rounded">password</code>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need an admin account?{' '}
              {onSwitchToRegister ? (
                <button 
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Register Admin
                </button>
              ) : (
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                Contact Admin
              </button>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 