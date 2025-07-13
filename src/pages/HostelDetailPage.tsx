import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  MapPin, 
  Star, 
  IndianRupee,
  Wifi,
  Shield,
  Car,
  Utensils,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  Calendar,
  CreditCard
} from 'lucide-react';
import { hostelsData } from '../data/hostelsData';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const HostelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const hostel = hostelsData.find(h => h.id === id);

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hostel Not Found</h2>
          <Link to="/hostels" className="btn-primary">
            Back to Hostels
          </Link>
        </div>
      </div>
    );
  }

  const availableRooms = hostel.rooms.filter(room => !room.occupied);
  const occupancyRate = Math.round((hostel.currentOccupancy / hostel.capacity) * 100);

  const handleBookRoom = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a room');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/hostels" 
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Hostels
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {hostel.name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{hostel.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-accent-500 mr-1" size={16} />
                  <span>4.8 (125 reviews)</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Est. {hostel.established}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">
                  ₹{hostel.fees.roomRent}/month
                </div>
                <div className="text-sm text-gray-600">Starting from</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-96 relative">
                  {hostel.images[selectedImageIndex] && (
                    <img 
                      src={hostel.images[selectedImageIndex]} 
                      alt={hostel.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      hostel.type === 'boys' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-pink-100 text-pink-600'
                    }`}>
                      {hostel.type === 'boys' ? 'Boys Hostel' : 'Girls Hostel'}
                    </span>
                  </div>
                </div>
                
                {/* Thumbnail Gallery */}
                {hostel.images.length > 1 && (
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {hostel.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                            selectedImageIndex === index 
                              ? 'ring-2 ring-primary-500' 
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${hostel.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Hostel</h2>
              <p className="text-gray-600 leading-relaxed">{hostel.description}</p>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mess Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mess Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{hostel.mess.name}</h3>
                  <p className="text-gray-600 mb-4">{hostel.mess.location}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{hostel.mess.capacity} students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Fee:</span>
                      <span className="font-medium">₹{hostel.mess.monthlyFee}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Meal Timings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Breakfast:</span>
                      <span className="font-medium">{hostel.mess.timings.breakfast}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lunch:</span>
                      <span className="font-medium">{hostel.mess.timings.lunch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dinner:</span>
                      <span className="font-medium">{hostel.mess.timings.dinner}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Meal Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {hostel.mess.mealTypes.map((type, index) => (
                        <span key={index} className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Rooms */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableRooms.slice(0, 6).map((room) => (
                  <Link
                    key={room.id}
                    to={`/hostel/${hostel.id}/room/${room.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">Room {room.number}</span>
                      <span className="text-primary-600 font-medium">₹{room.monthlyRent}/month</span>
                    </div>
                    <div className="text-sm text-gray-600 capitalize mb-2">{room.type} Occupancy</div>
                    <div className="text-xs text-green-600">Available</div>
                  </Link>
                ))}
              </div>
              {availableRooms.length > 6 && (
                <div className="mt-4 text-center">
                  <Link to={`/hostel/${hostel.id}#rooms`} className="text-primary-600 hover:text-primary-700 font-medium">
                    View All {availableRooms.length} Available Rooms
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${hostel.status === 'closed' ? 'text-red-600' : 'text-green-600'}`}>
                    {hostel.status === 'closed' ? 'Closed' : 'Active'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capacity:</span>
                  <span className="font-medium">{hostel.capacity} students</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Occupancy:</span>
                  <span className="font-medium">{hostel.currentOccupancy} students</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occupancy Rate:</span>
                  <span className="font-medium">{hostel.status === 'closed' ? 'N/A' : `${occupancyRate}%`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Rooms:</span>
                  <span className="font-medium text-green-600">{availableRooms.length}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{hostel.warden.name}</h4>
                  <p className="text-sm text-gray-600">{hostel.warden.position}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={14} className="mr-2" />
                      {hostel.warden.contact}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={14} className="mr-2" />
                      {hostel.warden.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Your Room</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    ₹{hostel.fees.roomRent}
                  </div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Fee:</span>
                    <span>₹{hostel.fees.monthlyFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit:</span>
                    <span>₹{hostel.fees.securityDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admission Fee:</span>
                    <span>₹{hostel.fees.admissionFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance:</span>
                    <span>₹{hostel.fees.maintenanceFee}/month</span>
                  </div>
                </div>
                
                <button
                  onClick={handleBookRoom}
                  disabled={hostel.status === 'closed'}
                  className={`w-full flex items-center justify-center ${
                    hostel.status === 'closed' 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'btn-primary'
                  }`}
                >
                  <CreditCard size={18} className="mr-2" />
                  {hostel.status === 'closed' ? 'Currently Closed' : 'Book Now'}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Secure booking with instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Room Booking</h3>
              <p className="text-gray-600 mb-6">
                Booking functionality will be available after login. This is a demo of the hostel management system.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 btn-outline"
                >
                  Close
                </button>
                <button className="flex-1 btn-primary">
                  Contact Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelDetailPage; 