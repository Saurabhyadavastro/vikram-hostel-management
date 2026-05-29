import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
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
        toast.custom((t) => (
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
             <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
             </div>
             <div>
                <p className="font-black text-sm uppercase tracking-widest text-emerald-400">Access Granted</p>
                <p className="text-sm font-medium">Welcome to the portal.</p>
             </div>
          </div>
        ), { duration: 3000 });
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-reveal-up">
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-10 md:p-12">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
               <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Sign In</h2>
            <p className="text-slate-500 font-medium">Access your student or admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-slate-700"
                  placeholder="student@vikramuniv.ac.in"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg shadow-xl shadow-blue-600/20 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                     Secure Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>

            <div className="mt-8 bg-amber-50 rounded-[1.5rem] p-6 border border-amber-100/50">
              <div className="flex gap-4">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Demo Credentials</h4>
                  <p className="text-xs text-amber-700/80 font-medium mb-4 leading-relaxed">
                    Use the provided test credentials to access the admin dashboard features.
                  </p>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-amber-100 hover:border-amber-300 transition-colors group/demo"
                  >
                    <div className="text-left">
                       <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Admin Account</span>
                       <span className="text-sm font-bold text-slate-700">{demoCredentials.admin.email}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover/demo:bg-amber-500 group-hover/demo:text-white transition-colors">
                       <ArrowRight size={14} />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {onSwitchToRegister && (
               <div className="pt-6 border-t border-slate-100 text-center">
                 <p className="text-sm font-medium text-slate-500">
                   New user?{' '}
                   <button 
                     type="button"
                     onClick={onSwitchToRegister}
                     className="text-blue-600 font-bold hover:text-blue-700"
                   >
                     Create Account
                   </button>
                 </p>
               </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;