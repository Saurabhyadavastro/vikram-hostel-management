import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User, Phone, CheckCircle2, ShieldPlus, ArrowRight, AlertCircle, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface RegisterPageProps {
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    selectedRole: 'student' as 'student' | 'admin',
    gender: '' as 'male' | 'female' | '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.selectedRole === 'student' && !formData.gender) {
      toast.error('Please select your gender');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.selectedRole,
        gender: formData.selectedRole === 'student' ? (formData.gender as 'male' | 'female') : undefined,
      });

      if (success) {
        toast.custom((t) => (
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
             <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
             </div>
             <div>
                <p className="font-black text-sm uppercase tracking-widest text-emerald-400">Account Created</p>
                <p className="text-sm font-medium">You can now sign in.</p>
             </div>
          </div>
        ), { duration: 4000 });
        
        setTimeout(() => {
          if (onSwitchToLogin) onSwitchToLogin();
          else onClose();
        }, 1500);
      } else {
        toast.error('Email already exists or registration failed');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-reveal-up custom-scrollbar">
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-10 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400 opacity-20 blur-[50px] pointer-events-none"></div>
            <div className="relative z-10">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users size={32} />
               </div>
               <h2 className="text-3xl font-black text-slate-900 mb-2">Create Account</h2>
               <p className="text-slate-500 font-medium">Join the Vikram University Hostel Portal</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                 <div className="relative group">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                   <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700"
                     placeholder="e.g. John Doe"
                     required
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address *</label>
                 <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700"
                     placeholder="student@svu.ac.in"
                     required
                   />
                 </div>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Role *</label>
                 <select
                   name="selectedRole"
                   value={formData.selectedRole}
                   onChange={handleInputChange}
                   className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700 appearance-none"
                 >
                   <option value="student">Student</option>
                   <option value="admin">Administrator</option>
                 </select>
               </div>

               {formData.selectedRole === 'student' && (
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender *</label>
                   <select
                     name="gender"
                     value={formData.gender}
                     onChange={handleInputChange}
                     className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700 appearance-none"
                     required={formData.selectedRole === 'student'}
                   >
                     <option value="">Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                   </select>
                 </div>
               )}
               {formData.selectedRole === 'admin' && (
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                   <div className="relative group">
                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                     <input
                       type="tel"
                       name="phone"
                       value={formData.phone}
                       onChange={handleInputChange}
                       className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700 font-mono"
                       placeholder="+91 XXXXX XXXXX"
                     />
                   </div>
                 </div>
               )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password *</label>
                 <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                   <input
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     value={formData.password}
                     onChange={handleInputChange}
                     className="w-full pl-12 pr-12 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700"
                     placeholder="••••••••"
                     required
                   />
                   <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                   >
                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                   </button>
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password *</label>
                 <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                   <input
                     type={showConfirmPassword ? 'text' : 'password'}
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleInputChange}
                     className="w-full pl-12 pr-12 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700"
                     placeholder="••••••••"
                     required
                   />
                   <button
                     type="button"
                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                   >
                     {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                   </button>
                 </div>
               </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg shadow-xl shadow-blue-600/20 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                     Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>

            {onSwitchToLogin && (
               <div className="pt-6 border-t border-slate-100 text-center">
                 <p className="text-sm font-medium text-slate-500">
                   Already have an account?{' '}
                   <button 
                     type="button"
                     onClick={onSwitchToLogin}
                     className="text-blue-600 font-bold hover:text-blue-700"
                   >
                     Sign In Here
                   </button>
                 </p>
               </div>
            )}
          </form>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;