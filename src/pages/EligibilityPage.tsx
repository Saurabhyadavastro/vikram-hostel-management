import React, { useState } from 'react';
import { CheckCircle, XCircle, MapPin, Phone, User, Home, Award } from 'lucide-react';
import { hostelsData } from '../data/hostelsData';

interface EligibilityForm {
  name: string;
  mobile: string;
  gender: 'male' | 'female' | '';
  category: 'General' | 'OBC' | 'SC/ST' | '';
  location: string;
  distance: number;
  selectedHostel: string;
}

interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  hostelName: string;
}

const EligibilityPage: React.FC = () => {
  const [form, setForm] = useState<EligibilityForm>({
    name: '',
    mobile: '',
    gender: '',
    category: '',
    location: '',
    distance: 0,
    selectedHostel: ''
  });

  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Filter hostels based on gender
  const availableHostels = hostelsData.filter(hostel => {
    if (form.gender === 'male') return hostel.type === 'boys';
    if (form.gender === 'female') return hostel.type === 'girls';
    return false;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkEligibility = () => {
    setIsChecking(true);
    
    // Simulate checking animation
    setTimeout(() => {
      const selectedHostel = hostelsData.find(h => h.id === form.selectedHostel);
      if (!selectedHostel) {
        setResult({
          isEligible: false,
          reason: 'Please select a hostel',
          hostelName: ''
        });
        setIsChecking(false);
        return;
      }

      let isEligible = false;
      let reason = '';

      // Check distance requirement (must be more than 20km)
      if (form.distance <= 20) {
        isEligible = false;
        reason = 'You must live more than 20 km away from the university to be eligible for hostel accommodation.';
      } else {
        // Special hostels for SC/ST category
        if (selectedHostel.id === 'baba-saheb-ambedkar' && form.gender === 'male') {
          if (form.category === 'SC/ST') {
            isEligible = true;
            reason = 'Congratulations! You are eligible for Baba Saheb Ambedkar Boys Hostel (Free accommodation for SC/ST students).';
          } else {
            isEligible = false;
            reason = 'Baba Saheb Ambedkar Boys Hostel is exclusively for SC/ST category students.';
          }
        } else if (selectedHostel.id === 'ramabai' && form.gender === 'female') {
          if (form.category === 'SC/ST') {
            isEligible = true;
            reason = 'Congratulations! You are eligible for Ramabai Girls Hostel (Special accommodation for SC/ST students).';
          } else {
            isEligible = false;
            reason = 'Ramabai Girls Hostel is exclusively for SC/ST category students.';
          }
        } else {
          // General hostels - check if hostel is closed
          if (selectedHostel.status === 'closed') {
            isEligible = false;
            reason = `${selectedHostel.name} is currently closed for maintenance and upgrades.`;
          } else {
            // Check if hostel has available capacity
            const availableSeats = selectedHostel.capacity - selectedHostel.currentOccupancy;
            if (availableSeats > 0) {
              isEligible = true;
              reason = `Congratulations! You are eligible for ${selectedHostel.name}. Available seats: ${availableSeats}`;
            } else {
              isEligible = false;
              reason = `${selectedHostel.name} is currently full. Please choose another hostel.`;
            }
          }
        }
      }

      setResult({
        isEligible,
        reason,
        hostelName: selectedHostel.name
      });
      setIsChecking(false);
    }, 2000);
  };

  const resetForm = () => {
    setForm({
      name: '',
      mobile: '',
      gender: '',
      category: '',
      location: '',
      distance: 0,
      selectedHostel: ''
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hostel Eligibility Check
          </h1>
          <p className="text-xl text-gray-600">
            Check if you're eligible for hostel accommodation at Vikram University
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!result ? (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="mr-3 text-blue-600" size={24} />
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 text-gray-400" size={20} />
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC/ST">SC/ST</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <MapPin className="mr-3 text-blue-600" size={24} />
                  Location Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your current location"
                      required
                    />
                  </div>

                  {/* Distance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance from University (km) *
                    </label>
                    <input
                      type="number"
                      name="distance"
                      value={form.distance}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter distance in km"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Hostel Selection */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Home className="mr-3 text-blue-600" size={24} />
                  Hostel Selection
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Hostel *
                  </label>
                  <select
                    name="selectedHostel"
                    value={form.selectedHostel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={!form.gender}
                  >
                    <option value="">
                      {!form.gender ? 'Please select gender first' : 'Select a hostel'}
                    </option>
                    {availableHostels.map(hostel => (
                      <option key={hostel.id} value={hostel.id}>
                        {hostel.name} - ₹{hostel.fees.monthlyFee * 12}/year
                        {hostel.status === 'closed' && ' (Currently Closed)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  onClick={checkEligibility}
                  disabled={!form.name || !form.mobile || !form.gender || !form.category || !form.location || !form.distance || !form.selectedHostel || isChecking}
                  className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isChecking
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105'
                  }`}
                >
                  {isChecking ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Checking Eligibility...
                    </div>
                  ) : (
                    'Check Eligibility'
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Result Display */
            <div className="text-center">
              <div className="mb-8">
                {result.isEligible ? (
                  <div className="animate-bounce">
                    <CheckCircle className="mx-auto text-green-500 animate-pulse" size={120} />
                  </div>
                ) : (
                  <div className="animate-bounce">
                    <XCircle className="mx-auto text-red-500 animate-pulse" size={120} />
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className={`text-3xl font-bold mb-4 ${result.isEligible ? 'text-green-600' : 'text-red-600'}`}>
                  {result.isEligible ? 'Eligible!' : 'Not Eligible'}
                </h2>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  {result.reason}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="ml-2 text-gray-900">{form.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Mobile:</span>
                    <span className="ml-2 text-gray-900">{form.mobile}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Gender:</span>
                    <span className="ml-2 text-gray-900">{form.gender}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-900">{form.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-900">{form.location}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Distance:</span>
                    <span className="ml-2 text-gray-900">{form.distance} km</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Check Another Hostel
                </button>
                {result.isEligible && (
                  <button
                    onClick={() => window.location.href = '/hostels'}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Hostels
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Eligibility Criteria */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eligibility Criteria</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">General Hostels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Must live more than 20 km from the university</li>
                <li>• Available for all categories (General, OBC, SC/ST)</li>
                <li>• Subject to availability</li>
                <li>• Separate hostels for boys and girls</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Category Hostels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Baba Saheb Ambedkar Boys Hostel:</strong> SC/ST males only</li>
                <li>• <strong>Ramabai Girls Hostel:</strong> SC/ST females only</li>
                <li>• Must live more than 20 km from the university</li>
                <li>• Free/subsidized accommodation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityPage;
