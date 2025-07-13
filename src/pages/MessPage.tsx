import React, { useState } from 'react';
import { Phone, MapPin, DollarSign, Users, Clock, Star } from 'lucide-react';

interface MessDetails {
  id: string;
  name: string;
  hostelName: string;
  incharge: string;
  mobile: string;
  monthlyFees: number;
  type: 'boys' | 'girls';
  images: string[];
  description: string;
  timings: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  features: string[];
}

const MessPage: React.FC = () => {
  const [selectedMess, setSelectedMess] = useState<MessDetails | null>(null);

  const messData: MessDetails[] = [
    {
      id: 'shaligram-mess',
      name: 'Shaligram Tomar Mess',
      hostelName: 'Shaligram Tomar Hostel',
      incharge: 'Rohit Malviya',
      mobile: '9753754771',
      monthlyFees: 2000,
      type: 'boys',
      images: [
        '/images/Shaligram Mess/IMG-20250709-WA0016.jpg',
        '/images/Shaligram Mess/IMG-20250709-WA0017.jpg',
        '/images/Shaligram Mess/WhatsApp Image 2025-07-09 at 11.53.52_ed26c648.jpg'
      ],
      description: 'Quality meals served with fresh ingredients and hygienic preparation for Shaligram Tomar Hostel residents.',
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      },
      features: ['Fresh Ingredients', 'Hygienic Preparation', 'Nutritious Meals', 'Variety Menu']
    },
    {
      id: 'sandipini-mess',
      name: 'Sandipini Mess',
      hostelName: 'Sandipini Hostel',
      incharge: 'Nitin Mishra',
      mobile: '9755961451',
      monthlyFees: 2400,
      type: 'boys',
      images: [
        '/images/Sandipin Mess/WhatsApp Image 2025-07-09 at 11.52.35_46b9205e.jpg'
      ],
      description: 'Premium dining experience with diverse menu options for boys hostel residents.',
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      },
      features: ['Premium Quality', 'Diverse Menu', 'Clean Environment', 'Healthy Options']
    },
    {
      id: 'vidhyutama-mess',
      name: 'Vidhyutama Mess',
      hostelName: 'Vidyatama Girls Hostel',
      incharge: 'Priya',
      mobile: '9407013721',
      monthlyFees: 2000,
      type: 'girls',
      images: [
        '/images/Vidhyutama Mess/IMG-20250701-WA0062.jpg'
      ],
      description: 'Specially curated meals for Vidyatama Girls Hostel residents with focus on nutrition and taste.',
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      },
      features: ['Nutritious Meals', 'Homely Taste', 'Special Care', 'Healthy Options']
    },
    {
      id: 'ramabai-mess',
      name: 'Ramabai Girls Hostel Mess',
      hostelName: 'Ramabai Girls Hostel',
      incharge: 'XYZ',
      mobile: 'XYZ',
      monthlyFees: 0,
      type: 'girls',
      images: [
        '/images/Girls Hostel/IMG-20250701-WA0067.jpg',
        '/images/Girls Hostel/IMG-20250701-WA0068.jpg',
        '/images/Girls Hostel/IMG-20250701-WA0069.jpg',
        '/images/Girls Hostel/IMG-20250701-WA0070.jpg',
        '/images/Girls Hostel/IMG-20250701-WA0071.jpg'
      ],
      description: 'Quality dining services for Ramabai Girls Hostel residents. Details will be updated soon.',
      timings: {
        breakfast: 'To be updated',
        lunch: 'To be updated',
        dinner: 'To be updated'
      },
      features: ['Details Coming Soon']
    }
  ];

  const boysMessData = messData.filter(mess => mess.type === 'boys');
  const girlsMessData = messData.filter(mess => mess.type === 'girls');

  const MessCard: React.FC<{ mess: MessDetails }> = ({ mess }) => (
    <div className="mess-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 flex flex-col h-full">
      {/* Image Section */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {mess.images.length > 0 ? (
          <img
            src={mess.images[0]}
            alt={mess.name}
            className="card-image w-full h-full object-cover transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder-mess.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Users className="h-16 w-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
            mess.type === 'boys' 
              ? 'bg-blue-500 text-white' 
              : 'bg-pink-500 text-white'
          }`}>
            {mess.type === 'boys' ? 'Boys' : 'Girls'}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <h3 className="text-white text-lg font-bold truncate">{mess.name}</h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="card-content p-5 flex-1 flex flex-col">
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-shrink-0">{mess.description}</p>

        {/* Info Grid */}
        <div className="space-y-3 mb-4 flex-1">
          {/* Hostel Info */}
          <div className="flex items-center text-gray-700">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium truncate">{mess.hostelName}</span>
          </div>

          {/* Incharge Info */}
          <div className="flex items-center text-gray-700">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm truncate">
              <span className="font-medium">In-charge:</span> {mess.incharge}
            </span>
          </div>

          {/* Contact */}
          <div className="flex items-center text-gray-700">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <Phone className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm font-mono truncate">{mess.mobile}</span>
          </div>

          {/* Monthly Fees */}
          <div className="flex items-center text-gray-700">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <DollarSign className="h-4 w-4 text-orange-600" />
            </div>
            <span className="text-sm">
              <span className="font-medium">Monthly:</span> {mess.monthlyFees > 0 ? `₹${mess.monthlyFees}/-` : 'To be updated'}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex flex-wrap gap-1">
            {mess.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
              >
                {feature}
              </span>
            ))}
            {mess.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{mess.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => setSelectedMess(mess)}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mess Facilities
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Quality dining experience for all hostel residents
            </p>
            <div className="flex justify-center space-x-8 text-primary-100">
              <div className="text-center">
                <div className="text-2xl font-bold">{messData.length}</div>
                <div className="text-sm">Total Mess</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{boysMessData.length}</div>
                <div className="text-sm">Boys Mess</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{girlsMessData.length}</div>
                <div className="text-sm">Girls Mess</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Boys Mess Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Boys Mess Facilities
          </h2>
          <p className="text-gray-600 text-center mb-8">Quality dining services for boys hostels</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {boysMessData.map((mess) => (
              <MessCard key={mess.id} mess={mess} />
            ))}
          </div>
        </div>

        {/* Girls Mess Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Girls Mess Facilities
          </h2>
          <p className="text-gray-600 text-center mb-8">Quality dining services for girls hostels</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {girlsMessData.map((mess) => (
              <MessCard key={mess.id} mess={mess} />
            ))}
          </div>
        </div>
      </div>

      {/* Mess Details Modal */}
      {selectedMess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedMess.name}</h2>
                <button
                  onClick={() => setSelectedMess(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Image Gallery */}
              {selectedMess.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedMess.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedMess.name} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-mess.jpg';
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{selectedMess.hostelName}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>In-charge: {selectedMess.incharge}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{selectedMess.mobile}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Monthly Fees: {selectedMess.monthlyFees > 0 ? `₹${selectedMess.monthlyFees}/-` : 'To be updated'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Meal Timings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Breakfast: {selectedMess.timings.breakfast}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Lunch: {selectedMess.timings.lunch}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Dinner: {selectedMess.timings.dinner}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMess.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-600">{selectedMess.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessPage;
