import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  Star, 
  IndianRupee,
  Wifi,
  Shield,
  Car,
  Utensils,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Target,
  Building
} from 'lucide-react';
import { hostelsData } from '../data/hostelsData';

const HostelsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'boys' | 'girls'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'capacity' | 'rent'>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [maxRent, setMaxRent] = useState(60000);

  const filteredAndSortedHostels = useMemo(() => {
    let filtered = hostelsData.filter(hostel => {
      const matchesSearch = hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hostel.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || hostel.type === selectedType;
      const matchesRent = (hostel.fees.monthlyFee * 12) <= maxRent;
      
      return matchesSearch && matchesType && matchesRent;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'capacity':
          return b.capacity - a.capacity;
        case 'rent':
          return (a.fees.monthlyFee * 12) - (b.fees.monthlyFee * 12);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [searchTerm, selectedType, sortBy, maxRent]);

  const totalCapacity = hostelsData.reduce((sum, hostel) => sum + hostel.capacity, 0);
  const totalOccupancy = hostelsData.reduce((sum, hostel) => sum + hostel.currentOccupancy, 0);
  const occupancyRate = Math.round((totalOccupancy / totalCapacity) * 100);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 reveal-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest mb-4">
                 <Building size={18} /> Residential Portal
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Residences</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl font-medium">
                Discover safe, comfortable, and modern accommodation options tailored for your academic journey at Samrat Vikramaditya University.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" />
                    </div>
                  ))}
               </div>
               <div className="text-sm font-bold text-slate-600">
                  <span className="text-blue-600">1.2k+</span> students live here
               </div>
            </div>
          </div>
          
          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Hostels', value: hostelsData.length, icon: Building, color: 'blue' },
              { label: 'Total Capacity', value: totalCapacity, icon: Target, color: 'emerald' },
              { label: 'Active Residents', value: totalOccupancy, icon: Users, color: 'indigo' },
              { label: 'Occupancy Rate', value: `${occupancyRate}%`, icon: TrendingUp, color: 'amber' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-xl transition-all duration-500">
                <div className={`w-14 h-14 bg-${stat.color === 'blue' ? 'blue-50' : stat.color === 'emerald' ? 'emerald-50' : stat.color === 'indigo' ? 'indigo-50' : 'amber-50'} text-${stat.color === 'blue' ? 'blue-600' : stat.color === 'emerald' ? 'emerald-600' : stat.color === 'indigo' ? 'indigo-600' : 'amber-600'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
                </div>
                <div>
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                   <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters - Modern Toolbar */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 md:p-8 mb-12 reveal-up stagger-1">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Search */}
            <div className="flex-grow">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, location or facilities..."
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            {/* Segmented Controls for Type */}
            <div className="flex p-1.5 bg-slate-50 rounded-2xl">
              {[
                { value: 'all', label: 'All' },
                { value: 'boys', label: 'Boys' },
                { value: 'girls', label: 'Girls' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value as any)}
                  className={`px-8 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                    selectedType === type.value
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-wider transition-all ${
                showFilters ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal size={20} />
              Filter
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in-up">
              <div>
                <label className="block text-sm font-black text-slate-900 mb-4 uppercase tracking-widest">Sort Results By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-4 bg-slate-50 border-none rounded-xl focus:ring-4 focus:ring-blue-100 font-bold text-slate-700"
                >
                  <option value="name">Alphabetical (A-Z)</option>
                  <option value="capacity">Largest Capacity</option>
                  <option value="rent">Lowest Rent</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                   <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Yearly Budget</label>
                   <span className="text-blue-600 font-black">₹{maxRent}</span>
                </div>
                <input
                  type="range"
                  min="12000"
                  max="60000"
                  step="1200"
                  value={maxRent}
                  onChange={(e) => setMaxRent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                   <span>₹12k</span>
                   <span>₹60k+</span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSortBy('name');
                    setMaxRent(60000);
                  }}
                  className="w-full py-4 text-slate-400 font-black text-sm uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 px-4">
           <div className="text-slate-500 font-bold">
              Found <span className="text-slate-900">{filteredAndSortedHostels.length}</span> matching hostels
           </div>
           {searchTerm && (
             <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                Results for "{searchTerm}"
             </div>
           )}
        </div>

        {/* Hostels Grid - New Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-20">
          {filteredAndSortedHostels.map((hostel, index) => (
            <Link
              key={hostel.id}
              to={`/hostel/${hostel.id}`}
              className="hostel-card-new group reveal-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={hostel.images[0]} 
                  alt={hostel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                     hostel.type === 'boys' ? 'bg-blue-600/90 text-white' : 'bg-pink-600/90 text-white'
                   }`}>
                     {hostel.type}
                   </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                   <div className="flex items-center gap-2 text-white">
                      <MapPin size={14} className="text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wider">{hostel.location.split(',')[0]}</span>
                   </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                     {hostel.name}
                   </h3>
                </div>
                
                <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
                  {hostel.description}
                </p>

                <div className="flex items-center gap-6 mb-8">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Occupancy</span>
                      <div className="flex items-center gap-2">
                         <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                               className="h-full bg-blue-600 transition-all duration-1000" 
                               style={{ width: `${(hostel.currentOccupancy/hostel.capacity)*100}%` }}
                            ></div>
                         </div>
                         <span className="text-xs font-black text-slate-700">{Math.round((hostel.currentOccupancy/hostel.capacity)*100)}%</span>
                      </div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</span>
                      <div className="flex items-center gap-1 text-amber-500 font-black">
                         <Star size={14} fill="currentColor" />
                         <span className="text-xs">4.8</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Fee</span>
                    <div className="text-xl font-black text-slate-900">₹{hostel.fees.monthlyFee * 12}</div>
                  </div>
                  <div className="flex items-center gap-2 font-black text-sm text-blue-600 group-hover:gap-4 transition-all">
                     View Details <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedHostels.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 reveal-up">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
               <Search size={48} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No results found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
              We couldn't find any hostels matching your current filters. Try resetting or adjusting your search.
            </p>
            <button
              onClick={() => {setSearchTerm(''); setSelectedType('all'); setMaxRent(60000);}}
              className="btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Support Section */}
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden reveal-up">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-20 blur-[150px]"></div>
           <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Need assistance choosing?</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                Our warden office is available to help you find the perfect accommodation based on your department and requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                 <Link to="/contact" className="btn-accent">Contact Warden Office</Link>
                 <Link to="/about" className="btn-outline border-white/20 text-white hover:bg-white/10">Read Guidelines</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HostelsPage;
