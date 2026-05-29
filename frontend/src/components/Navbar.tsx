import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Bell, Home, Building, Newspaper, Info, Phone, UtensilsCrossed, CheckCircle, Settings, ChevronDown, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Hostels', href: '/hostels', icon: Building },
    { name: 'Mess', href: '/mess', icon: UtensilsCrossed },
    ...(isAuthenticated && user?.role === 'admin' 
      ? [{ name: 'Admin Panel', href: '/admin-panel', icon: Settings }]
      : [{ name: 'Eligibility', href: '/eligibility', icon: CheckCircle }]
    ),
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin': return '/admin-panel';
      case 'student': return '/student-dashboard';
      default: return '/';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src="/images/Vikram-university_Logo.jpg" 
                  alt="Samrat Vikramaditya University Logo" 
                  className="w-12 h-12 object-contain rounded-full relative z-10 border-2 border-white/50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-white font-black text-lg">VU</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tight transition-colors duration-300 ${
                isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white'
              }`}>
                VIKRAM <span className="text-amber-500">UNI</span>
              </span>
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                isScrolled || location.pathname !== '/' ? 'text-slate-500' : 'text-blue-100/60'
              }`}>
                Hostel Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : (isScrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button className={`p-2 rounded-xl transition-all ${
                  isScrolled || location.pathname !== '/' ? 'text-slate-400 hover:text-blue-600 hover:bg-blue-50' : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}>
                  <Bell size={20} />
                </button>

                <div className="relative group">
                  <button className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                    isScrolled || location.pathname !== '/' ? 'border-slate-200 bg-slate-50' : 'border-white/20 bg-white/10'
                  }`}>
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {user?.name.charAt(0)}
                    </div>
                    <span className={`text-sm font-bold ${
                      isScrolled || location.pathname !== '/' ? 'text-slate-700' : 'text-white'
                    }`}>{user?.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className={isScrolled || location.pathname !== '/' ? 'text-slate-400' : 'text-white/40'} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 overflow-hidden">
                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                      <div className="text-sm font-black text-slate-900">{user?.name}</div>
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-0.5">{user?.role}</div>
                    </div>
                    <div className="p-2">
                      <Link to={getDashboardLink()} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Settings size={18} /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onLoginClick}
                  className={`text-sm font-bold px-6 py-2 transition-all ${
                    isScrolled || location.pathname !== '/' ? 'text-blue-600 hover:text-blue-700' : 'text-white hover:text-amber-400'
                  }`}
                >
                  Log In
                </button>
                <button 
                  onClick={onRegisterClick}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-xl ${
              isScrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-4/5 h-full bg-white shadow-2xl transition-transform duration-500 flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
             <div className="text-2xl font-black text-slate-900">MENU</div>
             <button onClick={() => setIsMenuOpen(false)} className="text-slate-400"><X size={32} /></button>
          </div>
          <div className="flex-grow overflow-y-auto p-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all ${
                  location.pathname === item.href ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon size={24} /> {item.name}
              </Link>
            ))}
          </div>
          <div className="p-8 border-t border-slate-50">
            {isAuthenticated ? (
               <button onClick={handleLogout} className="w-full btn-outline border-red-100 text-red-500 hover:bg-red-50">Sign Out</button>
            ) : (
               <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => {onLoginClick(); setIsMenuOpen(false);}} className="btn-outline">Log In</button>
                  <button onClick={() => {onRegisterClick(); setIsMenuOpen(false);}} className="btn-accent">Join Now</button>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Ticker */}
      <div className="bg-slate-900 text-white py-2 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
        <div className="flex animate-marquee whitespace-nowrap">
          {[1,2].map(i => (
            <div key={i} className="flex items-center">
              <span className="mx-8 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                New hostel bookings open for Academic Year 2025-26
              </span>
              <span className="mx-8 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 opacity-60">
                <Building size={14} /> Room allotment starts July 15th
              </span>
              <span className="mx-8 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Updated mess menu with continental dishes
              </span>
              <span className="mx-8 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 opacity-60">
                <Award size={14} /> Cultural night at Vidyatama Hostel - July 5th
              </span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 