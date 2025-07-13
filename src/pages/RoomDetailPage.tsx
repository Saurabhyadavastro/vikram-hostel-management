import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, IndianRupee, CheckCircle, CreditCard } from 'lucide-react';
import { hostelsData } from '../data/hostelsData';

const RoomDetailPage: React.FC = () => {
  const { id, roomId } = useParams<{ id: string; roomId: string }>();
  
  const hostel = hostelsData.find(h => h.id === id);
  const room = hostel?.rooms.find(r => r.id === roomId);

  if (!hostel || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h2>
          <Link to="/hostels" className="btn-primary">Back to Hostels</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to={`/hostel/${hostel.id}`}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to {hostel.name}
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Room {room.number} - {hostel.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Room Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium capitalize">{room.type} Occupancy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{room.capacity} Student(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${room.occupied ? 'text-red-600' : 'text-green-600'}`}>
                    {room.occupied ? 'Occupied' : 'Available'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="font-medium text-primary-600">₹{room.monthlyRent}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Room Facilities</h3>
              <div className="grid grid-cols-1 gap-2">
                {room.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book This Room</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600">₹{room.monthlyRent}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
                
                {room.occupied ? (
                  <div className="text-center">
                    <p className="text-red-600 mb-4">This room is currently occupied</p>
                    <Link to={`/hostel/${hostel.id}`} className="btn-outline w-full">
                      View Other Rooms
                    </Link>
                  </div>
                ) : (
                  <button className="w-full btn-primary flex items-center justify-center">
                    <CreditCard size={18} className="mr-2" />
                    Book This Room
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage; 