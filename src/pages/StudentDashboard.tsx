import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  CreditCard, 
  AlertCircle, 
  Calendar,
  User,
  Bell,
  FileText,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock student data
  const studentData = {
    roomDetails: {
      hostel: 'Sandipini Hostel',
      roomNumber: 'A-204',
      roomType: 'Double Sharing',
      floorNumber: 2,
      checkInDate: '2024-07-15',
      checkOutDate: '2025-05-15',
      roommates: ['Amit Kumar']
    },
    paymentHistory: [
      { id: 1, date: '2024-01-15', amount: 25000, type: 'Room Rent', status: 'Paid', method: 'UPI' },
      { id: 2, date: '2024-01-10', amount: 5000, type: 'Mess Fees', status: 'Paid', method: 'Card' },
      { id: 3, date: '2024-02-15', amount: 25000, type: 'Room Rent', status: 'Pending', method: 'UPI' },
    ],
    complaints: [
      { id: 1, title: 'AC not working', category: 'Maintenance', status: 'In Progress', date: '2024-01-20', priority: 'High' },
      { id: 2, title: 'Water supply issue', category: 'Plumbing', status: 'Resolved', date: '2024-01-18', priority: 'Medium' },
    ],
    upcomingPayments: [
      { type: 'Room Rent', amount: 25000, dueDate: '2024-02-15' },
      { type: 'Mess Fees', amount: 5000, dueDate: '2024-02-10' },
    ]
  };

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? 'bg-primary-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );

  const QuickStatCard = ({ icon: Icon, title, value, color }: any) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  // Student dashboard is no longer available - only admin access is supported
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature Not Available</h2>
        <p className="text-gray-600">Student dashboard access has been removed. Only administrator accounts are supported.</p>
        <p className="text-gray-500 mt-2">Please contact an administrator for assistance.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Here's your hostel information.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QuickStatCard
            icon={Home}
            title="Current Room"
            value={studentData.roomDetails.roomNumber}
            color="bg-blue-500"
          />
          <QuickStatCard
            icon={DollarSign}
            title="Pending Payments"
            value={`₹${studentData.upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}`}
            color="bg-yellow-500"
          />
          <QuickStatCard
            icon={AlertCircle}
            title="Active Complaints"
            value={studentData.complaints.filter(c => c.status !== 'Resolved').length}
            color="bg-red-500"
          />
          <QuickStatCard
            icon={Calendar}
            title="Days Remaining"
            value="124"
            color="bg-green-500"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton id="overview" label="Overview" icon={Home} />
            <TabButton id="room" label="Room Details" icon={MapPin} />
            <TabButton id="payments" label="Payments" icon={CreditCard} />
            <TabButton id="complaints" label="Complaints" icon={AlertCircle} />
            <TabButton id="profile" label="Profile" icon={User} />
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Room Summary */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Accommodation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hostel:</span>
                        <span className="font-medium">{studentData.roomDetails.hostel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room Number:</span>
                        <span className="font-medium">{studentData.roomDetails.roomNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room Type:</span>
                        <span className="font-medium">{studentData.roomDetails.roomType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor:</span>
                        <span className="font-medium">Floor {studentData.roomDetails.floorNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in Date:</span>
                        <span className="font-medium">{new Date(studentData.roomDetails.checkInDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out Date:</span>
                        <span className="font-medium">{new Date(studentData.roomDetails.checkOutDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Roommate:</span>
                        <span className="font-medium">{studentData.roomDetails.roommates[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Payments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Payments</h3>
                <div className="space-y-3">
                  {studentData.upcomingPayments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-800">{payment.type}</p>
                          <p className="text-sm text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gray-800">₹{payment.amount.toLocaleString()}</span>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Complaints */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Complaints</h3>
                  <button 
                    onClick={() => setActiveTab('complaints')}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {studentData.complaints.slice(0, 2).map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle className={`h-5 w-5 ${
                          complaint.status === 'Resolved' ? 'text-green-600' :
                          complaint.status === 'In Progress' ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-800">{complaint.title}</p>
                          <p className="text-sm text-gray-600">{complaint.category} • {new Date(complaint.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'room' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Room Information</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Hostel Name</label>
                      <p className="text-lg font-semibold text-gray-800">{studentData.roomDetails.hostel}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Room Number</label>
                      <p className="text-lg font-semibold text-gray-800">{studentData.roomDetails.roomNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Room Type</label>
                      <p className="text-lg font-semibold text-gray-800">{studentData.roomDetails.roomType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Floor Number</label>
                      <p className="text-lg font-semibold text-gray-800">Floor {studentData.roomDetails.floorNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Check-in Date</label>
                      <p className="text-lg font-semibold text-gray-800">{new Date(studentData.roomDetails.checkInDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Check-out Date</label>
                      <p className="text-lg font-semibold text-gray-800">{new Date(studentData.roomDetails.checkOutDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Roommates</label>
                      <div className="space-y-2">
                        {studentData.roomDetails.roommates.map((roommate, index) => (
                          <p key={index} className="text-lg font-semibold text-gray-800">{roommate}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    Request Room Change
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Download Room Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentData.paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payment.type}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ₹{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{payment.method}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">My Complaints</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <Plus className="h-4 w-4" />
                  New Complaint
                </button>
              </div>

              <div className="space-y-4">
                {studentData.complaints.map((complaint) => (
                  <div key={complaint.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{complaint.title}</h4>
                        <p className="text-sm text-gray-600">
                          {complaint.category} • Submitted on {new Date(complaint.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                          complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {complaint.priority}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-center py-8">
                  <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Profile management features coming soon...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 