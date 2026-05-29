import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  ClipboardList
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  checkInDate: string;
  checkOutDate: string;
  emergencyContact: string;
  category: string;
  yearOfStudy: string;
}

interface Room {
  id: string;
  roomNumber: string;
  type: string;
  capacity: number;
  occupied: boolean;
  student?: Student;
  monthlyRent: number;
  amenities: string[];
  lastMaintenance: string;
  status: 'available' | 'occupied' | 'maintenance';
}

interface Hostel {
  id: string;
  name: string;
  type: 'boys' | 'girls';
  totalRooms: number;
  occupiedRooms: number;
  monthlyFee: number;
  amenities: string[];
  warden: string;
  contactNumber: string;
  status: 'active' | 'closed' | 'maintenance';
  rooms: Room[];
}

interface UpdateNotice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'maintenance';
  date: string;
  author: string;
}

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userGender: string;
  hostelId: string;
  hostelName: string;
  hostelType: string;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  date: string;
  screenshot: string;
}

const AdminPanel: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('hostels');
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [updates, setUpdates] = useState<UpdateNotice[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [showEditHostel, setShowEditHostel] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Load initial data
  useEffect(() => {
    loadHostelData();
    loadUpdates();
    loadBookings();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'vikram_bookings') {
        loadBookings();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadHostelData = () => {
    const savedHostels = localStorage.getItem('admin_hostels');
    if (savedHostels) {
      setHostels(JSON.parse(savedHostels));
    } else {
      initializeFullHostelData();
    }
  };

  const loadBookings = () => {
    const savedBookings = JSON.parse(localStorage.getItem('vikram_bookings') || '[]');
    setBookings(savedBookings.sort((a: Booking, b: Booking) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const handleBookingAction = (id: string, status: 'Confirmed' | 'Rejected') => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('vikram_bookings', JSON.stringify(updated));
    toast.success(`Booking ${status}`);
  };

  const initializeFullHostelData = () => {
    const mockHostels: Hostel[] = [
        {
          id: '1',
          name: 'Sandipini Boys Hostel',
          type: 'boys',
          totalRooms: 200,
          occupiedRooms: 185,
          monthlyFee: 800,
          amenities: ['Wi-Fi', 'Mess', 'Laundry', 'Common Room', 'Security', 'Gym', 'Study Hall'],
          warden: 'Dr. Rajesh Sharma',
          contactNumber: '+91 9876543210',
          status: 'active',
          rooms: generateMockRooms(200, 'sandipini')
        },
        {
          id: '2',
          name: 'Kalidash Boys Hostel',
          type: 'boys',
          totalRooms: 180,
          occupiedRooms: 165,
          monthlyFee: 800,
          amenities: ['Wi-Fi', 'Mess', 'Laundry', 'Gym', 'Library', 'Sports Equipment'],
          warden: 'Dr. Priya Verma',
          contactNumber: '+91 9876543220',
          status: 'active',
          rooms: generateMockRooms(180, 'kalidash')
        },
        {
          id: '3',
          name: 'Bhartihari Boys Hostel',
          type: 'boys',
          totalRooms: 160,
          occupiedRooms: 145,
          monthlyFee: 800,
          amenities: ['Wi-Fi', 'Mess', 'Laundry', 'Computer Lab', 'Music Room', 'Indoor Games'],
          warden: 'Dr. Sanjay Tiwari',
          contactNumber: '+91 9876543230',
          status: 'active',
          rooms: generateMockRooms(160, 'bhartihari')
        },
        {
          id: '4',
          name: 'Shaligram Tomar Boys Hostel',
          type: 'boys',
          totalRooms: 170,
          occupiedRooms: 155,
          monthlyFee: 800,
          amenities: ['Premium Wi-Fi', 'Gourmet Mess', 'Fitness Center', 'Gaming Zone', 'Seminar Hall'],
          warden: 'Dr. Amit Gupta',
          contactNumber: '+91 9876543240',
          status: 'active',
          rooms: generateMockRooms(170, 'shaligram-tomar')
        },
        {
          id: '5',
          name: 'Baba Saheb Ambedkar Boys Hostel',
          type: 'boys',
          totalRooms: 150,
          occupiedRooms: 140,
          monthlyFee: 0,
          amenities: ['Free Wi-Fi', 'Subsidized Mess', 'Coaching Classes', 'Career Guidance', 'Scholarship Desk'],
          warden: 'Dr. Kailash Meena',
          contactNumber: '+91 9876543250',
          status: 'active',
          rooms: generateMockRooms(150, 'baba-saheb-ambedkar')
        },
        {
          id: '6',
          name: 'Jawaharlal Nehru Boys Hostel',
          type: 'boys',
          totalRooms: 180,
          occupiedRooms: 0,
          monthlyFee: 800,
          amenities: ['Modern Gym', 'Digital Library', 'Solar Power', 'Gaming Zone', 'Medical Facility'],
          warden: 'Dr. Vikash Kumar',
          contactNumber: '+91 9876543260',
          status: 'closed',
          rooms: generateMockRooms(180, 'jawaharlal-nehru')
        },
        {
          id: '7',
          name: 'Vidyatama Girls Hostel',
          type: 'girls',
          totalRooms: 250,
          occupiedRooms: 230,
          monthlyFee: 500,
          amenities: ['Ladies Wi-Fi', 'Nutritious Mess', 'Yoga Center', 'Self-Defense Training', 'Health Center'],
          warden: 'Dr. Sunita Agarwal',
          contactNumber: '+91 9876543260',
          status: 'active',
          rooms: generateMockRooms(250, 'vidyatama')
        },
        {
          id: '8',
          name: 'Ramabai Girls Hostel',
          type: 'girls',
          totalRooms: 50,
          occupiedRooms: 48,
          monthlyFee: 417,
          amenities: ['Premium Wi-Fi', 'Fine Dining Mess', 'Wellness Center', 'Art & Craft Room', 'Conference Room'],
          warden: 'Prof. Meera Patel',
          contactNumber: '+91 9876543270',
          status: 'active',
          rooms: generateMockRooms(50, 'ramabai')
        }
      ];
      setHostels(mockHostels);
      localStorage.setItem('admin_hostels', JSON.stringify(mockHostels));
    };

    const resetHostelData = () => {
      localStorage.removeItem('admin_hostels');
      localStorage.removeItem('admin_updates');
      initializeFullHostelData();
      loadUpdates();
      toast.success('All data reset successfully!', { icon: '🔄', duration: 3000 });
    };

  const loadUpdates = () => {
    const savedUpdates = localStorage.getItem('admin_updates');
    if (savedUpdates) {
      setUpdates(JSON.parse(savedUpdates));
    } else {
      const mockUpdates: UpdateNotice[] = [
        {
          id: '1',
          title: 'New Hostel Booking Process',
          content: 'Online booking system has been updated with new features and improved user interface.',
          type: 'general',
          date: '2025-01-15',
          author: 'Admin'
        },
        {
          id: '2',
          title: 'Maintenance Notice - Sandipini Hostel',
          content: 'Scheduled maintenance work in Sandipini Hostel from 10 AM to 4 PM on January 20th.',
          type: 'maintenance',
          date: '2025-01-18',
          author: 'Admin'
        }
      ];
      setUpdates(mockUpdates);
      localStorage.setItem('admin_updates', JSON.stringify(mockUpdates));
    }
  };

  const generateMockRooms = (count: number, hostelPrefix: string): Room[] => {
    const rooms: Room[] = [];
    for (let i = 1; i <= count; i++) {
      const roomNumber = `${hostelPrefix.charAt(0).toUpperCase()}${i.toString().padStart(3, '0')}`;
      const isOccupied = Math.random() > 0.3; 
      
      rooms.push({
        id: `${hostelPrefix}_${i}`,
        roomNumber,
        type: i % 5 === 0 ? 'Single' : 'Double',
        capacity: i % 5 === 0 ? 1 : 2,
        occupied: isOccupied,
        monthlyRent: i % 5 === 0 ? 4000 : 3500,
        amenities: ['Bed', 'Study Table', 'Wardrobe', 'Fan'],
        lastMaintenance: '2024-12-15',
        status: isOccupied ? 'occupied' : 'available',
        student: isOccupied ? {
          id: `student_${i}`,
          name: `Student ${i}`,
          email: `student${i}@example.com`,
          phone: `+91 987654${i.toString().padStart(4, '0')}`,
          studentId: `VU202${i.toString().padStart(4, '0')}`,
          checkInDate: '2024-07-15',
          checkOutDate: '2025-05-15',
          emergencyContact: '+91 9876543000',
          category: 'General',
          yearOfStudy: '2nd Year'
        } : undefined
      });
    }
    return rooms;
  };

  const saveHostelData = (updatedHostels: Hostel[]) => {
    setHostels(updatedHostels);
    localStorage.setItem('admin_hostels', JSON.stringify(updatedHostels));
  };

  const saveUpdates = (updatedUpdates: UpdateNotice[]) => {
    setUpdates(updatedUpdates);
    localStorage.setItem('admin_updates', JSON.stringify(updatedUpdates));
  };

  const addStudent = (hostelId: string, roomId: string, studentData: Student) => {
    const updatedHostels = hostels.map(hostel => {
      if (hostel.id === hostelId) {
        const updatedRooms = hostel.rooms.map(room => {
          if (room.id === roomId) {
            return {
              ...room,
              occupied: true,
              student: studentData,
              status: 'occupied' as const
            };
          }
          return room;
        });
        return {
          ...hostel,
          rooms: updatedRooms,
          occupiedRooms: hostel.occupiedRooms + 1
        };
      }
      return hostel;
    });
    
    saveHostelData(updatedHostels);
    toast.success('Student added successfully!');
    setShowAddStudent(false);
    setSelectedRoom(null);
  };

  const removeStudent = (hostelId: string, roomId: string) => {
    const updatedHostels = hostels.map(hostel => {
      if (hostel.id === hostelId) {
        const updatedRooms = hostel.rooms.map(room => {
          if (room.id === roomId) {
            return {
              ...room,
              occupied: false,
              student: undefined,
              status: 'available' as const
            };
          }
          return room;
        });
        return {
          ...hostel,
          rooms: updatedRooms,
          occupiedRooms: hostel.occupiedRooms - 1
        };
      }
      return hostel;
    });
    
    saveHostelData(updatedHostels);
    toast.success('Student removed successfully!');
  };

  const addUpdate = (updateData: Omit<UpdateNotice, 'id'>) => {
    const newUpdate: UpdateNotice = {
      ...updateData,
      id: Date.now().toString()
    };
    const updatedUpdates = [newUpdate, ...updates];
    saveUpdates(updatedUpdates);
    toast.success('Update added successfully!');
    setShowAddUpdate(false);
  };

  const removeUpdate = (updateId: string) => {
    const updatedUpdates = updates.filter(update => update.id !== updateId);
    saveUpdates(updatedUpdates);
    toast.success('Update removed successfully!');
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
        activeTab === id
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-xl p-12 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 font-medium mb-8">
            You need to be logged in as an administrator.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full btn-primary py-4"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 reveal-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">Admin Portal</h1>
              <p className="text-lg text-slate-500 font-medium">Manage hostels, students, bookings, and updates.</p>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={resetHostelData}
                className="px-6 py-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors font-bold flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Reset Data
              </button>
              <div className="flex items-center gap-4 bg-white p-2 rounded-full shadow-sm border border-slate-100 pr-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Welcome</div>
                  <div className="font-bold text-slate-900">{user?.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-50 reveal-up stagger-1">
          <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-slate-100">
            <TabButton id="hostels" label="Hostel Management" icon={Building} />
            <TabButton id="bookings" label="Bookings" icon={ClipboardList} />
            <TabButton id="updates" label="Updates & Notices" icon={Settings} />
          </div>

          {/* Hostels Tab */}
          {activeTab === 'hostels' && (
            <div className="space-y-6 animate-fade-in">
              {!selectedHostel ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {hostels.map((hostel) => (
                    <div key={hostel.id} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:border-blue-200 transition-colors group">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{hostel.name}</h3>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          hostel.status === 'active' ? 'bg-emerald-100 text-emerald-600' :
                          hostel.status === 'closed' ? 'bg-red-100 text-red-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {hostel.status}
                        </span>
                      </div>
                      
                      <div className="space-y-4 text-sm font-medium text-slate-500 mb-8">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                           <span>Type</span>
                           <span className="font-bold text-slate-700 capitalize">{hostel.type}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                           <span>Occupancy</span>
                           <span className="font-bold text-slate-700">{hostel.occupiedRooms}/{hostel.totalRooms}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                           <span>Warden</span>
                           <span className="font-bold text-slate-700">{hostel.warden}</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setSelectedHostel(hostel)}
                          className="flex-1 btn-primary py-3 text-sm"
                        >
                          Manage Rooms
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">{selectedHostel.name} - Room Management</h2>
                      <p className="text-slate-500 font-medium">Manage individual rooms and student assignments</p>
                    </div>
                    <button
                      onClick={() => setSelectedHostel(null)}
                      className="btn-outline px-6 py-2"
                    >
                      Back to Hostels
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {selectedHostel.rooms.map((room) => (
                      <div key={room.id} className={`border rounded-[2rem] p-6 ${
                        room.status === 'occupied' ? 'border-red-100 bg-red-50' :
                        room.status === 'maintenance' ? 'border-amber-100 bg-amber-50' :
                        'border-emerald-100 bg-emerald-50'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-black text-slate-900">{room.roomNumber}</h3>
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            room.status === 'occupied' ? 'bg-red-200 text-red-800' :
                            room.status === 'maintenance' ? 'bg-amber-200 text-amber-800' :
                            'bg-emerald-200 text-emerald-800'
                          }`}>
                            {room.status}
                          </span>
                        </div>
                        
                        <div className="text-sm font-medium text-slate-600 mb-6 space-y-2">
                          <p className="flex justify-between"><span>Type:</span> <span className="font-bold">{room.type}</span></p>
                          <p className="flex justify-between"><span>Capacity:</span> <span className="font-bold">{room.capacity}</span></p>
                          <p className="flex justify-between"><span>Rent:</span> <span className="font-bold">₹{room.monthlyRent}/mo</span></p>
                        </div>

                        {room.student && (
                          <div className="text-sm text-slate-700 mb-6 p-4 bg-white/60 rounded-xl border border-white">
                            <p className="font-black text-slate-900 mb-1">{room.student.name}</p>
                            <p className="text-xs font-mono">{room.student.studentId}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {room.status === 'available' && (
                            <button
                              onClick={() => {
                                setSelectedRoom(room);
                                setShowAddStudent(true);
                              }}
                              className="flex-1 bg-emerald-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-emerald-600 transition-colors"
                            >
                              Add Student
                            </button>
                          )}
                          {room.status === 'occupied' && (
                            <>
                              <button
                                onClick={() => {
                                  setEditingStudent(room.student!);
                                  setSelectedRoom(room);
                                }}
                                className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => removeStudent(selectedHostel.id, room.id)}
                                className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition-colors"
                              >
                                Remove
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Room Reservations</h2>
              </div>
              
              {bookings.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <ClipboardList className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-xl font-black text-slate-900">No Bookings Yet</h4>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-slate-100">
                        <th className="pb-4 font-black text-slate-400 uppercase tracking-widest text-xs">Date</th>
                        <th className="pb-4 font-black text-slate-400 uppercase tracking-widest text-xs">Applicant</th>
                        <th className="pb-4 font-black text-slate-400 uppercase tracking-widest text-xs">Hostel</th>
                        <th className="pb-4 font-black text-slate-400 uppercase tracking-widest text-xs">Payment</th>
                        <th className="pb-4 font-black text-slate-400 uppercase tracking-widest text-xs">Status</th>
                        <th className="pb-4 font-black text-slate-400 uppercase tracking-widest text-xs text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-6 text-sm font-bold text-slate-700">{new Date(booking.date).toLocaleDateString()}</td>
                          <td className="py-6">
                             <p className="font-bold text-slate-900">{booking.userName}</p>
                             <p className="text-xs text-slate-500">{booking.userEmail}</p>
                          </td>
                          <td className="py-6 font-bold text-slate-700">{booking.hostelName}</td>
                          <td className="py-6">
                             <p className="font-black text-blue-600">₹{booking.amount}</p>
                             <p className="text-[10px] text-slate-400 uppercase tracking-widest">{booking.screenshot}</p>
                          </td>
                          <td className="py-6">
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                              booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' :
                              booking.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-6 text-right">
                            {booking.status === 'Pending' && (
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleBookingAction(booking.id, 'Confirmed')} className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-xs font-bold hover:bg-emerald-600">Approve</button>
                                <button onClick={() => handleBookingAction(booking.id, 'Rejected')} className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600">Reject</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Updates Tab */}
          {activeTab === 'updates' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Updates & Notices</h2>
                <button
                  onClick={() => setShowAddUpdate(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Update
                </button>
              </div>

              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-black text-slate-900">{update.title}</h3>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          update.type === 'urgent' ? 'bg-red-100 text-red-800' :
                          update.type === 'maintenance' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {update.type}
                        </span>
                      </div>
                      <button
                        onClick={() => removeUpdate(update.id)}
                        className="w-10 h-10 bg-white hover:bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-sm transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{update.content}</p>
                    <div className="mt-6 flex gap-4 text-xs font-bold text-slate-400">
                      <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">Date: {update.date}</span>
                      <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">By: {update.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudent && selectedRoom && (
        <StudentModal
          room={selectedRoom}
          hostel={selectedHostel!}
          onSave={(studentData: Student) => addStudent(selectedHostel!.id, selectedRoom.id, studentData)}
          onClose={() => {
            setShowAddStudent(false);
            setSelectedRoom(null);
          }}
        />
      )}

      {/* Edit Student Modal */}
      {editingStudent && selectedRoom && (
        <StudentModal
          room={selectedRoom}
          hostel={selectedHostel!}
          student={editingStudent}
          onSave={(studentData: Student) => {
            const updatedHostels = hostels.map(hostel => {
              if (hostel.id === selectedHostel!.id) {
                const updatedRooms = hostel.rooms.map(room => {
                  if (room.id === selectedRoom.id) {
                    return { ...room, student: studentData };
                  }
                  return room;
                });
                return { ...hostel, rooms: updatedRooms };
              }
              return hostel;
            });
            saveHostelData(updatedHostels);
            toast.success('Student updated successfully!');
            setEditingStudent(null);
            setSelectedRoom(null);
          }}
          onClose={() => {
            setEditingStudent(null);
            setSelectedRoom(null);
          }}
        />
      )}

      {/* Add Update Modal */}
      {showAddUpdate && (
        <UpdateModal
          onSave={addUpdate}
          onClose={() => setShowAddUpdate(false)}
        />
      )}
    </div>
  );
};

// Modals remain relatively unchanged structurally but visually updated...
const StudentModal: React.FC<any> = ({ room, hostel, student, onSave, onClose }) => {
  const [formData, setFormData] = useState<Student>(
    student || {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      studentId: '',
      checkInDate: '',
      checkOutDate: '',
      emergencyContact: '',
      category: 'General',
      yearOfStudy: '1st Year'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.studentId) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-reveal-up flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
             <h2 className="text-2xl font-black text-slate-900 mb-1">{student ? 'Edit Student' : 'Add Student'}</h2>
             <p className="text-sm font-bold text-slate-500">Room {room.roomNumber}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white hover:bg-slate-100 rounded-full flex items-center justify-center shadow-sm">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student ID *</label>
              <input type="text" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone *</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold font-mono" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-in Date</label>
              <input type="date" value={formData.checkInDate} onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Emergency Contact</label>
              <input type="tel" value={formData.emergencyContact} onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold font-mono" />
            </div>
          </div>

          <div className="pt-6 flex gap-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="flex-1 btn-outline py-4">Cancel</button>
            <button type="submit" className="flex-1 btn-primary py-4">{student ? 'Update' : 'Save'} Student</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateModal: React.FC<any> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general' as 'general' | 'urgent' | 'maintenance',
    date: new Date().toISOString().split('T')[0],
    author: 'Admin'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
      <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl animate-reveal-up overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-2xl font-black text-slate-900">Add Notice</h2>
          <button onClick={onClose} className="w-10 h-10 bg-white hover:bg-slate-100 rounded-full flex items-center justify-center shadow-sm">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold text-slate-900" required />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
               <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as any })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold text-slate-900">
                 <option value="general">General</option>
                 <option value="urgent">Urgent</option>
                 <option value="maintenance">Maintenance</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
               <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-bold text-slate-900" />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Content *</label>
            <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 font-medium text-slate-700 resize-none" required />
          </div>

          <div className="pt-6 flex gap-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="flex-1 btn-outline py-4">Cancel</button>
            <button type="submit" className="flex-1 btn-primary py-4">Post Notice</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;