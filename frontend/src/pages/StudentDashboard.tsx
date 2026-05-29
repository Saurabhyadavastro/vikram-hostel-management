import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  CreditCard, 
  User,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  userId: string;
  userName: string;
  hostelId: string;
  hostelName: string;
  hostelType: string;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  date: string;
  screenshot?: string;
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loadBookings = () => {
      const allBookings: Booking[] = JSON.parse(localStorage.getItem('vikram_bookings') || '[]');
      // Filter bookings for current student
      const userBookings = allBookings.filter(b => b.userId === user?.id);
      setBookings(userBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    loadBookings();
  }, [user]);

  const activeBooking = bookings.find(b => b.status === 'Confirmed' || b.status === 'Pending');

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
        activeTab === id
          ? 'bg-slate-900 text-white shadow-lg'
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );

  if (!user || user.role !== 'student') {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 font-medium mb-8">This portal is strictly for registered students.</p>
          <Link to="/" className="btn-primary">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 reveal-up">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">Student Portal</h1>
          <p className="text-lg text-slate-500 font-medium">Welcome back, <span className="text-blue-600 font-bold">{user.name}</span></p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal-up stagger-1">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Home size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
              <p className="text-xl font-bold text-slate-900">
                {activeBooking ? (activeBooking.status === 'Confirmed' ? 'Housed' : 'Pending Approval') : 'No Active Booking'}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <DollarSign size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Paid</p>
              <p className="text-xl font-bold text-slate-900">
                ₹{bookings.filter(b => b.status === 'Confirmed').reduce((sum, b) => sum + b.amount, 0)}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <CheckCircle size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gender Group</p>
              <p className="text-xl font-bold text-slate-900 capitalize">{user.gender || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-50 reveal-up stagger-2">
          <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-slate-100">
            <TabButton id="overview" label="My Bookings" icon={Home} />
            <TabButton id="profile" label="Profile" icon={User} />
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-2xl font-black text-slate-900">Application History</h3>
                 <Link to="/hostels" className="btn-outline px-6 py-2 text-sm">Apply for Room</Link>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-xl font-black text-slate-900 mb-2">No Applications Found</h4>
                  <p className="text-slate-500 font-medium mb-6">You haven't applied for any hostel room yet.</p>
                  <Link to="/hostels" className="btn-primary">Browse Hostels</Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {bookings.map((booking) => {
                    const bookingDate = new Date(booking.date);
                    const renewalDate = new Date(bookingDate);
                    renewalDate.setFullYear(renewalDate.getFullYear() + 1);
                    const today = new Date();
                    const daysRemaining = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                    
                    return (
                    <div key={booking.id} className="bg-slate-50 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between border border-slate-100 hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                          booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' :
                          booking.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {booking.status === 'Confirmed' ? <CheckCircle size={28} /> :
                           booking.status === 'Pending' ? <Clock size={28} /> :
                           <AlertCircle size={28} />}
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-1">
                             <h4 className="text-xl font-black text-slate-900">{booking.hostelName}</h4>
                             <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' :
                                booking.status === 'Pending' ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                                'bg-red-100 text-red-600 border border-red-200'
                             }`}>
                               {booking.status}
                             </span>
                           </div>
                           <p className="text-sm font-bold text-slate-500 mb-3">Booking ID: {booking.id}</p>
                           
                           {booking.status === 'Confirmed' ? (
                             <div className="flex flex-wrap gap-3">
                               <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Room Status</span>
                                 <span className="text-xs font-bold text-slate-700">Allotted (Pending Room # Assignment)</span>
                               </div>
                               <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Renewal Required In</span>
                                 <span className="text-xs font-bold text-amber-600">{daysRemaining} Days</span>
                               </div>
                             </div>
                           ) : (
                             <p className="text-xs text-slate-400">Applied on {bookingDate.toLocaleDateString()}</p>
                           )}

                           {/* Payment and Course Information */}
                           <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Course & Payment Duration</p>
                               <p className="text-xs font-bold text-slate-700">1 Academic Year</p>
                               <p className="text-[10px] text-slate-500 mt-1">Hostel registration and payment must be renewed annually before the session begins.</p>
                             </div>
                             <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Uploaded Payment Proof</p>
                               <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shadow-inner text-xs">
                                     <DollarSign size={16} />
                                  </div>
                                  <span className="text-xs font-bold text-slate-600 truncate max-w-[120px]">{booking.screenshot || 'payment_proof.jpg'}</span>
                               </div>
                             </div>
                           </div>
                        </div>
                      </div>
                      <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 w-full md:w-auto text-center md:text-right mt-4 md:mt-0 shrink-0">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount Paid</p>
                         <p className="text-2xl font-black text-blue-600">₹{booking.amount}</p>
                         {booking.status === 'Confirmed' && (
                           <p className="text-[10px] font-black text-slate-400 uppercase mt-2">Valid until: {renewalDate.toLocaleDateString()}</p>
                         )}
                      </div>
                    </div>
                  )})}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Personal Profile</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-slate-200">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-inner">
                    <User size={48} />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-3xl font-black text-slate-900 mb-2">{user.name}</h4>
                    <p className="text-slate-500 font-medium bg-white px-4 py-1.5 rounded-full border border-slate-200 inline-block">{user.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">User Role</p>
                     <p className="text-lg font-bold text-slate-800 capitalize">{user.role}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gender Category</p>
                     <p className="text-lg font-bold text-slate-800 capitalize">{user.gender || 'Not Specified'}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Account ID</p>
                     <p className="text-lg font-bold text-slate-800 font-mono">{user.id}</p>
                   </div>
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