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
  SlidersHorizontal
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
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            University Hostels
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover comfortable and modern accommodation options at Vikram University
          </p>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-primary-600">{hostelsData.length}</div>
              <div className="text-sm text-gray-600">Total Hostels</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">{totalCapacity}</div>
              <div className="text-sm text-gray-600">Total Capacity</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{totalOccupancy}</div>
              <div className="text-sm text-gray-600">Current Students</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-accent-600">{occupancyRate}%</div>
              <div className="text-sm text-gray-600">Occupancy Rate</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search hostels by name or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All Hostels' },
                { value: 'boys', label: 'Boys Hostels' },
                { value: 'girls', label: 'Girls Hostels' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value as any)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedType === type.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="capacity">Capacity (High to Low)</option>
                    <option value="rent">Rent (Low to High)</option>
                  </select>
                </div>

                {/* Max Rent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Rent: ₹{maxRent}/year
                  </label>
                  <input
                    type="range"
                    min="12000"
                    max="60000"
                    step="1200"
                    value={maxRent}
                    onChange={(e) => setMaxRent(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedType('all');
                      setSortBy('name');
                      setMaxRent(60000);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredAndSortedHostels.length} of {hostelsData.length} hostels
          </p>
        </div>

        {/* Hostels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredAndSortedHostels.map((hostel, index) => (
            <Link
              key={hostel.id}
              to={`/hostel/${hostel.id}`}
              className="hostel-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden relative">
                {hostel.images[0] && (
                  <img 
                    src={hostel.images[0]} 
                    alt={hostel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hostel.type === 'boys' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-pink-100 text-pink-600'
                  }`}>
                    {hostel.type === 'boys' ? 'Boys Hostel' : 'Girls Hostel'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white bg-opacity-90 px-2 py-1 rounded-lg">
                    <div className="flex items-center text-xs">
                      <Star className="text-accent-500 mr-1" size={12} />
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {hostel.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {hostel.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm">{hostel.currentOccupancy}/{hostel.capacity}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">Campus</span>
                  </div>
                </div>

                                 {/* Key Features */}
                 <div className="flex items-center gap-3 mb-4">
                   {hostel.facilities.includes('Wi-Fi Internet') && (
                     <Wifi size={16} className="text-green-500" />
                   )}
                   {hostel.facilities.includes('24/7 Security') && (
                     <Shield size={16} className="text-blue-500" />
                   )}
                   {hostel.facilities.includes('Parking Area') && (
                     <Car size={16} className="text-purple-500" />
                   )}
                   {hostel.facilities.includes('Mess Hall') && (
                     <Utensils size={16} className="text-orange-500" />
                   )}
                 </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-primary-600 font-semibold">
                    <IndianRupee size={16} className="mr-1" />
                    <span>{hostel.fees.monthlyFee * 12}/year</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hostel.status === 'closed'
                      ? 'bg-red-100 text-red-600'
                      : (hostel.currentOccupancy / hostel.capacity) > 0.9
                      ? 'bg-red-100 text-red-600'
                      : (hostel.currentOccupancy / hostel.capacity) > 0.7
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {hostel.status === 'closed' 
                      ? 'Closed'
                      : hostel.capacity - hostel.currentOccupancy > 0 
                      ? `${hostel.capacity - hostel.currentOccupancy} seats left`
                      : 'Full'
                    }
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedHostels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelsPage; 