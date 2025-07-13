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
  Award
} from 'lucide-react';
import { hostelsData, newsData } from '../data/hostelsData';

const HomePage: React.FC = () => {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    // Load updates from localStorage (admin panel)
    const loadUpdates = () => {
      const savedUpdates = localStorage.getItem('admin_updates');
      if (savedUpdates) {
        const adminUpdates = JSON.parse(savedUpdates);
        setUpdates(adminUpdates.slice(0, 3)); // Show latest 3 updates
      } else {
        // Fallback to static news data
        setUpdates(newsData.slice(0, 3));
      }
    };

    loadUpdates();

    // Listen for storage changes (when admin updates data)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_updates') {
        loadUpdates();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check for updates every 2 seconds (in case of same-tab updates)
    const interval = setInterval(loadUpdates, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { label: 'Total Hostels', value: '8', icon: Building },
    { label: 'Total Capacity', value: '1,362', icon: Users },
    { label: 'Current Students', value: '1,283', icon: Users },
    { label: 'Years of Excellence', value: '30+', icon: Award },
  ];

  const features = [
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security with CCTV surveillance and biometric access.'
    },
    {
      icon: Wifi,
      title: 'High-Speed Internet',
      description: 'Fiber optic internet connectivity in all rooms and common areas.'
    },
    {
      icon: Utensils,
      title: 'Quality Mess',
      description: 'Nutritious meals with diverse menu options including regional cuisines.'
    },
    {
      icon: Car,
      title: 'Parking Facilities',
      description: 'Secure parking spaces for students with vehicles.'
    },
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'On-campus medical facilities and regular health checkups.'
    },
    {
      icon: BookOpen,
      title: 'Study Environment',
      description: 'Dedicated study halls and library access for academic excellence.'
    },
  ];

  const boysHostels = hostelsData.filter(h => h.type === 'boys');
  const girlsHostels = hostelsData.filter(h => h.type === 'girls');
  const recentNews = updates; // Use dynamic updates instead of static newsData

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 university-gradient"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-accent-400 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-accent-400 rounded-full opacity-15 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-accent-400 rounded-full opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Welcome to
            <span className="block text-accent-400">Vikram University</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-2">Hostel Management</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Experience world-class accommodation facilities with modern amenities, 
            ensuring a comfortable and conducive environment for your academic journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/hostels" className="btn-accent text-lg px-8 py-4 w-full sm:w-auto">
              Explore Hostels
              <ChevronRight className="inline ml-2" size={20} />
            </Link>
            <a 
              href="https://earth.google.com/web/search/vikram+university/@23.1678205,75.8027311,522.66117663a,769.6246986d,35y,0h,0t,0r/data=CiwiJgokCR_9530eOjRAER79530eOjTAGc2fJlZyGElAIaZkOSo4xknAQgIIAToDCgEwQgIIAEoNCP___________wEQAA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline bg-white bg-opacity-10 text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 w-full sm:w-auto inline-block text-center"
            >
              Virtual Tour
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Icon className="text-primary-600" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Quick Access
            </h2>
            <p className="text-gray-600">
              Explore our facilities and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/hostels" 
              className="group bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Building className="text-blue-600 mb-3" size={32} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hostels</h3>
                  <p className="text-gray-600">Explore our 8 modern hostels</p>
                </div>
                <ChevronRight className="text-blue-600 group-hover:transform group-hover:translate-x-1 transition-transform" size={24} />
              </div>
            </Link>
            
            <Link 
              to="/eligibility" 
              className="group bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Shield className="text-purple-600 mb-3" size={32} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Check Eligibility</h3>
                  <p className="text-gray-600">Verify your hostel eligibility</p>
                </div>
                <ChevronRight className="text-purple-600 group-hover:transform group-hover:translate-x-1 transition-transform" size={24} />
              </div>
            </Link>
            
            <Link 
              to="/mess" 
              className="group bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Utensils className="text-green-600 mb-3" size={32} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mess Facilities</h3>
                  <p className="text-gray-600">Quality dining for all residents</p>
                </div>
                <ChevronRight className="text-green-600 group-hover:transform group-hover:translate-x-1 transition-transform" size={24} />
              </div>
            </Link>
            
            <Link 
              to="/news" 
              className="group bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <BookOpen className="text-purple-600 mb-3" size={32} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">News & Updates</h3>
                  <p className="text-gray-600">Stay updated with latest news</p>
                </div>
                <ChevronRight className="text-purple-600 group-hover:transform group-hover:translate-x-1 transition-transform" size={24} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              World-Class Facilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our hostels are equipped with modern amenities to ensure comfort, safety, and academic excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hostels Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Hostels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our premium accommodation options designed for comfort and academic success.
            </p>
          </div>

          {/* Boys Hostels */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h3 className="text-2xl font-bold text-primary-600 flex items-center mb-4 sm:mb-0">
              <Building className="mr-3" size={28} />
              Boys Hostels ({boysHostels.length})
            </h3>
              <a 
                href="https://earth.google.com/web/search/Shaligram+Tomar+Hostel+-+Vikram+University,+Vikram+University,+Ujjain,+Madhya+Pradesh/@23.16231192,75.81078517,527.06017598a,831.55357935d,35y,0h,0t,0r/data=CsYBGpcBEpABCiUweDM5NjM3Mzk1NTIzMWE5ZTk6MHg3YjBiZGRiNTQ5YWY1MWJjGdo7_ma9KTdAIbqSLkfZ81JAKlVTaGFsaWdyYW0gVG9tYXIgSG9zdGVsIC0gVmlrcmFtIFVuaXZlcnNpdHksIFZpa3JhbSBVbml2ZXJzaXR5LCBVamphaW4sIE1hZGh5YSBQcmFkZXNoGAIgASImCiQJlYKfauYrN0ARRZ15HwYqN0AZ4E4VbunzUkAh1K5xdtbyUkBCAggBOgMKATBCAggASg0I____________ARAA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm px-4 py-2 flex items-center gap-2 hover:bg-primary-600 hover:text-white transition-colors"
              >
                🛰️ Virtual Tour - Boys Hostels
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boysHostels.map((hostel, index) => (
                <Link
                  key={hostel.id}
                  to={`/hostel/${hostel.id}`}
                  className="hostel-card group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                    {hostel.images[0] && (
                      <img 
                        src={hostel.images[0]} 
                        alt={hostel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {hostel.name}
                      {hostel.status === 'closed' && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          Closed
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users size={16} className="mr-2" />
                      <span>{hostel.currentOccupancy}/{hostel.capacity} Students</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="mr-2" />
                      <span>{hostel.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="text-accent-500 mr-1" size={16} />
                        <span className="text-sm text-gray-600">4.8/5</span>
                      </div>
                      <span className="text-primary-600 font-semibold">
                        ₹{hostel.fees.roomRent}/month
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Girls Hostels */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h3 className="text-2xl font-bold text-primary-600 flex items-center mb-4 sm:mb-0">
              <Building className="mr-3" size={28} />
              Girls Hostels ({girlsHostels.length})
            </h3>
              <a 
                href="https://earth.google.com/web/search/Vikram+University+Vidhyottama+Hostel,+Vikram+University,+Ujjain,+Madhya+Pradesh/@23.1667113,75.8039971,520.96523003a,769.56594081d,35y,0h,0t,0r/data=CsABGpEBEooBCiUweDM5NjM3NTIxODU0NjI0MjM6MHg1OTg2MGM5OWExYjRiZTU0GadffZetKjdAIQulQLB081JAKk9WaWtyYW0gVW5pdmVyc2l0eSBWaWRoeW90dGFtYSBIb3N0ZWwsIFZpa3JhbSBVbml2ZXJzaXR5LCBVamphaW4sIE1hZGh5YSBQcmFkZXNoGAIgASImCiQJJpNIQYoqN0ARJlM_4JAoN0AZSW-xkXT0UkAh4rZ4QFPzUkBCAggBOgMKATBCAggASg0I____________ARAA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm px-4 py-2 flex items-center gap-2 hover:bg-primary-600 hover:text-white transition-colors"
              >
                🛰️ Virtual Tour - Girls Hostels
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {girlsHostels.map((hostel, index) => (
                <Link
                  key={hostel.id}
                  to={`/hostel/${hostel.id}`}
                  className="hostel-card group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                    {hostel.images[0] && (
                      <img 
                        src={hostel.images[0]} 
                        alt={hostel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{hostel.name}</h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users size={16} className="mr-2" />
                      <span>{hostel.currentOccupancy}/{hostel.capacity} Students</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="mr-2" />
                      <span>{hostel.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="text-accent-500 mr-1" size={16} />
                        <span className="text-sm text-gray-600">4.9/5</span>
                      </div>
                      <span className="text-primary-600 font-semibold">
                        ₹{hostel.fees.roomRent}/month
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with the latest hostel news and announcements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((news, index) => (
              <div 
                key={news.id} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    news.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {news.type.toUpperCase()}
                  </div>
                  <div className="ml-auto flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    {new Date(news.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h3>
                <p className="text-gray-600 text-sm">{news.content}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/news" className="btn-primary">
              View All News
              <ChevronRight className="inline ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 university-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-accent-100 mb-8">
            Experience the best hostel facilities and become part of Vikram University's legacy of excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hostels" className="btn-accent text-lg px-8 py-4">
              Book Your Room Now
            </Link>
            <button className="btn-outline bg-white bg-opacity-10 text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;