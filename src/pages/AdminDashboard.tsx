import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Building2, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Bell,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const stats = {
    totalStudents: 1247,
    totalRooms: 1340,
    occupancyRate: 93,
    totalRevenue: 2450000,
    pendingComplaints: 23,
    activeWardens: 8
  };

  const recentActivities = [
    { id: 1, type: 'booking', message: 'New room booking by Rahul Kumar', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'complaint', message: 'Maintenance complaint in Sandipini Hostel', time: '4 hours ago', status: 'warning' },
    { id: 3, type: 'payment', message: 'Payment of ₹25,000 received from Priya Sharma', time: '6 hours ago', status: 'success' },
    { id: 4, type: 'user', message: 'New warden assigned to Vidhyatama Hostel', time: '1 day ago', status: 'info' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Room Booking', student: 'Amit Singh', hostel: 'Sandipini', room: 'A-101', amount: '₹25,000' },
    { id: 2, type: 'Refund Request', student: 'Priya Patel', hostel: 'Vidhyatama', room: 'B-205', amount: '₹15,000' },
    { id: 3, type: 'Room Transfer', student: 'Raj Kumar', from: 'Kalidash A-301', to: 'Bhartihari B-102', amount: '₹5,000' },
  ];

  const handleApprove = (id: number, type: string) => {
    toast.success(`${type} approved successfully!`);
  };

  const handleReject = (id: number, type: string) => {
    toast.error(`${type} rejected.`);
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm flex items-center gap-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="h-4 w-4" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );

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

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            change={8.2}
            color="bg-blue-500"
          />
          <StatCard
            icon={Building2}
            title="Total Rooms"
            value={stats.totalRooms.toLocaleString()}
            change={2.1}
            color="bg-green-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            change={5.3}
            color="bg-purple-500"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
            change={12.5}
            color="bg-yellow-500"
          />
          <StatCard
            icon={AlertTriangle}
            title="Pending Complaints"
            value={stats.pendingComplaints}
            change={-15.2}
            color="bg-red-500"
          />
          <StatCard
            icon={UserCheck}
            title="Active Wardens"
            value={stats.activeWardens}
            change={0}
            color="bg-indigo-500"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton id="overview" label="Overview" icon={TrendingUp} />
            <TabButton id="users" label="User Management" icon={Users} />
            <TabButton id="hostels" label="Hostel Management" icon={Building2} />
            <TabButton id="payments" label="Payments" icon={DollarSign} />
            <TabButton id="complaints" label="Complaints" icon={AlertTriangle} />
            <TabButton id="settings" label="Settings" icon={Settings} />
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Recent Activities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-100 text-green-600' :
                        activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Approvals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Approvals</h3>
                <div className="space-y-3">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{approval.type}</p>
                        <p className="text-sm text-gray-600">
                          {approval.student} • {approval.hostel} {approval.room} • {approval.amount}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(approval.id, approval.type)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(approval.id, approval.type)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    <Plus className="h-4 w-4" />
                    Add User
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            RS
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Rahul Sharma</div>
                            <div className="text-sm text-gray-500">rahul@student.vikramuniv.ac.in</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">Student</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">2 hours ago</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'hostels' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Hostel Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Sandipini', 'Kalidash', 'Bhartihari', 'Vidhyatama'].map((hostel, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-2">{hostel} Hostel</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Occupancy: 85%</p>
                      <p>Available Rooms: 12</p>
                      <p>Pending Maintenance: 3</p>
                    </div>
                    <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700">
                      Manage Hostel
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Payment Management</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-center py-8">
                  <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Payment management features coming soon...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Complaint Management</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-center py-8">
                  <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Complaint management features coming soon...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">System Settings</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-center py-8">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">System settings coming soon...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 