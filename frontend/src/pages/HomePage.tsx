import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Wifi, 
  Utensils, 
  Car, 
  Heart, 
  BookOpen, 
  Users, 
  MapPin,
  Star,
  ChevronRight,
  Building,
  Clock,
  Award,
  ArrowRight,
  Globe,
  Zap
} from 'lucide-react';
import { hostelsData, newsData } from '../data/hostelsData';

const HomePage: React.FC = () => {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    const loadUpdates = () => {
      const savedUpdates = localStorage.getItem('admin_updates');
      if (savedUpdates) {
        const adminUpdates = JSON.parse(savedUpdates);
        setUpdates(adminUpdates.slice(0, 3));
      } else {
        setUpdates(newsData.slice(0, 3));
      }
    };

    loadUpdates();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_updates') loadUpdates();
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadUpdates, 2000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { label: 'Total Hostels', value: '8', icon: Building, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Capacity', value: '1,362', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Current Students', value: '1,283', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Years of Excellence', value: '30+', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const features = [
    { icon: Shield, title: '24/7 Security', description: 'Round-the-clock security with CCTV and biometric access.' },
    { icon: Wifi, title: 'High-Speed Internet', description: 'Fiber optic connectivity in all rooms and common areas.' },
    { icon: Utensils, title: 'Quality Mess', description: 'Nutritious meals with diverse menu and regional cuisines.' },
    { icon: Car, title: 'Parking Facilities', description: 'Secure parking spaces for students with vehicles.' },
    { icon: Heart, title: 'Healthcare', description: 'On-campus medical facilities and regular health checkups.' },
    { icon: BookOpen, title: 'Study Environment', description: 'Dedicated study halls and library access for excellence.' },
  ];

  const boysHostels = hostelsData.filter(h => h.type === 'boys');
  const girlsHostels = hostelsData.filter(h => h.type === 'girls');

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section - Immersive Design */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 university-gradient"></div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.03] skew-x-[-20deg] translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 opacity-20 blur-[120px]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400 opacity-20 blur-[150px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left reveal-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-sm font-bold mb-6">
              <Star size={16} fill="currentColor" />
              <span>Accredited A++ University</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              A Home Away <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                From Home.
              </span>
            </h1>
            
            <p className="text-xl text-blue-100/80 mb-10 max-w-lg leading-relaxed">
              Experience world-class accommodation at Vikram University. We provide modern amenities designed for comfort and academic success.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/hostels" className="btn-accent px-10 py-4 group">
                Explore Hostels
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="https://earth.google.com/web/search/vikram+university"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white hover:text-blue-900 transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <Globe size={20} />
                Virtual Tour
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative reveal-up stagger-1">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="/images/Boys Hostel/Sandipini Hostel.jpg" 
                alt="University Hostel" 
                className="w-full h-[500px] object-cover scale-110 hover:scale-100 transition-transform duration-700"
              />
            </div>
            {/* Floating Glass Card */}
            <div className="absolute -bottom-10 -left-10 z-20 glass-card p-6 rounded-3xl max-w-xs animate-bounce-slow">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">
                  <Award size={20} />
                </div>
                <div className="font-bold text-slate-800">Top Rated Facility</div>
              </div>
              <p className="text-sm text-slate-600">Voted #1 for student satisfaction and safety in 2024.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Floating Section */}
      <section className="relative z-30 -mt-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon size={32} />
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Bento Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-up">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Portal Dashboard</h2>
            <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            <Link to="/hostels" className="md:col-span-2 md:row-span-2 bg-blue-600 bento-item group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:scale-110 transition-transform">
                <Building size={200} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white mb-2">Explore Hostels</h3>
                <p className="text-blue-100 mb-6">Discover our 8 premium residential blocks.</p>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <ChevronRight />
                </div>
              </div>
            </Link>

            <Link to="/eligibility" className="md:col-span-2 bg-slate-900 bento-item group relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Check Eligibility</h3>
                  <p className="text-slate-400">Verify your status in seconds.</p>
                </div>
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                  <Shield size={28} />
                </div>
              </div>
            </Link>

            <Link to="/mess" className="bg-white bento-item group">
              <Utensils className="text-emerald-500 mb-4" size={40} />
              <h3 className="text-xl font-bold text-slate-900">Mess Info</h3>
              <p className="text-slate-500 text-sm">Dining & Menus</p>
            </Link>

            <Link to="/news" className="bg-amber-500 bento-item group">
              <BookOpen className="text-white mb-4" size={40} />
              <h3 className="text-xl font-bold text-white">News Hub</h3>
              <p className="text-amber-100 text-sm">Latest Updates</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Features Layout */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-20 blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600 opacity-10 blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1 reveal-up">
              <h2 className="text-4xl font-black text-white mb-6">World-Class <br /> Amenities</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                We believe that a comfortable living space is the foundation of academic success. Our facilities are designed to support your growth.
              </p>
              <Link to="/about" className="text-amber-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                Learn more about our standards <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-6 p-4 group reveal-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Hostels Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Our Residences</h2>
              <p className="text-slate-500 text-lg">Select your preferred accommodation from our 8 specialized hostels.</p>
            </div>
            <Link to="/hostels" className="mt-6 md:mt-0 text-blue-600 font-bold flex items-center gap-2 group">
              View All Hostels <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Section for Boys Hostels */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10 reveal-up">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Building size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Boys Hostels</h3>
              <div className="flex-grow h-px bg-slate-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {boysHostels.slice(0, 3).map((hostel, index) => (
                <Link key={hostel.id} to={`/hostel/${hostel.id}`} className="hostel-card-new group reveal-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative h-64 overflow-hidden">
                    <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        {hostel.type}
                      </span>
                    </div>
                    {hostel.status === 'closed' && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="px-6 py-2 bg-red-600 text-white font-bold rounded-full text-sm uppercase">Maintenance</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{hostel.name}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-slate-500 text-sm gap-2">
                        <Users size={16} />
                        <span>{hostel.currentOccupancy} Residents</span>
                      </div>
                      <div className="flex items-center text-slate-500 text-sm gap-2">
                        <MapPin size={16} />
                        <span>{hostel.location.split(',')[0]}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={16} fill="currentColor" />
                        <span>4.8</span>
                      </div>
                      <div className="text-xl font-black text-slate-900">₹{hostel.fees.roomRent}<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section for Girls Hostels */}
          <div>
            <div className="flex items-center gap-4 mb-10 reveal-up">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600">
                <Building size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Girls Hostels</h3>
              <div className="flex-grow h-px bg-slate-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {girlsHostels.map((hostel, index) => (
                <Link key={hostel.id} to={`/hostel/${hostel.id}`} className="hostel-card-new group flex flex-col md:flex-row reveal-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 md:w-3/5">
                    <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                      {hostel.type}
                    </span>
                    <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-4">{hostel.name}</h4>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">{hostel.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star size={16} fill="currentColor" />
                        <span>4.9</span>
                      </div>
                      <div className="text-xl font-black text-slate-900">₹{hostel.fees.roomRent}<span className="text-sm text-slate-400 font-normal">/mo</span></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern News Ticker / Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 reveal-up">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-black text-slate-900 mb-2">Bulletin Board</h2>
              <p className="text-slate-500">Live updates and official university announcements.</p>
            </div>
            <Link to="/news" className="btn-primary">View All Updates</Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {updates.map((news, index) => (
              <div key={news.id} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 reveal-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    news.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {news.type}
                  </span>
                  <div className="flex items-center text-slate-400 text-xs font-bold">
                    <Clock size={14} className="mr-1" />
                    {new Date(news.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">{news.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{news.content}</p>
                <Link to="/news" className="text-blue-600 text-sm font-black flex items-center gap-1 hover:gap-2 transition-all">
                  READ ARTICLE <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 university-gradient"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 reveal-up">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Begin Your <br />
            <span className="text-amber-400">Academic Legacy?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium opacity-90">
            Join a vibrant community of scholars and experience the best hostel life Samrat Vikramaditya University has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/hostels" className="btn-accent px-12 py-5 text-xl shadow-2xl shadow-amber-500/40">
              Apply For Admission
            </Link>
            <button className="px-12 py-5 rounded-full border-2 border-white text-white font-black hover:bg-white hover:text-blue-900 transition-all text-xl backdrop-blur-md">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
      
      {/* Scroll Indicator */}
      <div className="fixed bottom-10 right-10 z-50 animate-bounce-slow">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl">
          <ChevronRight size={24} className="rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;