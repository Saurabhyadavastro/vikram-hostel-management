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
  DollarSign
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

const AdminPanel: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('hostels');
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [updates, setUpdates] = useState<UpdateNotice[]>([]);
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
  }, []);

  const loadHostelData = () => {
    // Always load all 8 hostels - clear any old data first
    localStorage.removeItem('admin_hostels');
    initializeFullHostelData();
  };

  const initializeFullHostelData = () => {
    // Initialize with mock data from all hostels
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
      // Clear localStorage and reload all hostels
      localStorage.removeItem('admin_hostels');
      localStorage.removeItem('admin_updates');
      initializeFullHostelData();
      loadUpdates();
      toast.success('All data reset successfully! All 8 hostels loaded.', {
        icon: '🔄',
        duration: 3000
      });
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
      const isOccupied = Math.random() > 0.3; // 70% occupancy
      
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
    // Trigger storage event for other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'admin_hostels',
      newValue: JSON.stringify(updatedHostels)
    }));
  };

  const saveUpdates = (updatedUpdates: UpdateNotice[]) => {
    setUpdates(updatedUpdates);
    localStorage.setItem('admin_updates', JSON.stringify(updatedUpdates));
    // Trigger storage event for other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'admin_updates',
      newValue: JSON.stringify(updatedUpdates)
    }));
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

  // Check if user is authenticated and is admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in as an admin to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
              <p className="text-gray-600">Manage hostels, rooms, students, and updates</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={resetHostelData}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Reset All Hostels
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-500">Welcome,</div>
                <div className="font-semibold text-gray-800">{user?.name}</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <TabButton id="hostels" label="Hostel Management" icon={Building} />
            <TabButton id="updates" label="Updates & Notices" icon={Settings} />
          </div>

          {/* Hostels Tab */}
          {activeTab === 'hostels' && (
            <div className="space-y-6">
              {!selectedHostel ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hostels.map((hostel) => (
                    <div key={hostel.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">{hostel.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          hostel.status === 'active' ? 'bg-green-100 text-green-800' :
                          hostel.status === 'closed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {hostel.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p><strong>Type:</strong> {hostel.type === 'boys' ? 'Boys' : 'Girls'}</p>
                        <p><strong>Occupancy:</strong> {hostel.occupiedRooms}/{hostel.totalRooms}</p>
                        <p><strong>Monthly Fee:</strong> ₹{hostel.monthlyFee}</p>
                        <p><strong>Warden:</strong> {hostel.warden}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedHostel(hostel)}
                          className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                        >
                          Manage Rooms
                        </button>
                        <button
                          onClick={() => {
                            setSelectedHostel(hostel);
                            setShowEditHostel(true);
                          }}
                          className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-300 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{selectedHostel.name} - Room Management</h2>
                      <p className="text-gray-600">Manage individual rooms and student assignments</p>
                    </div>
                    <button
                      onClick={() => setSelectedHostel(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Back to Hostels
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {selectedHostel.rooms.map((room) => (
                      <div key={room.id} className={`border rounded-lg p-4 ${
                        room.status === 'occupied' ? 'border-red-200 bg-red-50' :
                        room.status === 'maintenance' ? 'border-yellow-200 bg-yellow-50' :
                        'border-green-200 bg-green-50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">{room.roomNumber}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                            room.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {room.status}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3">
                          <p><strong>Type:</strong> {room.type}</p>
                          <p><strong>Capacity:</strong> {room.capacity}</p>
                          <p><strong>Rent:</strong> ₹{room.monthlyRent}/month</p>
                        </div>

                        {room.student && (
                          <div className="text-sm text-gray-700 mb-3 p-2 bg-white rounded border">
                            <p><strong>Student:</strong> {room.student.name}</p>
                            <p><strong>ID:</strong> {room.student.studentId}</p>
                            <p><strong>Email:</strong> {room.student.email}</p>
                          </div>
                        )}

                        <div className="flex gap-1">
                          {room.status === 'available' && (
                            <button
                              onClick={() => {
                                setSelectedRoom(room);
                                setShowAddStudent(true);
                              }}
                              className="flex-1 bg-green-600 text-white py-1 px-2 rounded text-xs hover:bg-green-700 transition-colors"
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
                                className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => removeStudent(selectedHostel.id, room.id)}
                                className="flex-1 bg-red-600 text-white py-1 px-2 rounded text-xs hover:bg-red-700 transition-colors"
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

          {/* Updates Tab */}
          {activeTab === 'updates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Updates & Notices</h2>
                <button
                  onClick={() => setShowAddUpdate(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Update
                </button>
              </div>

              <div className="space-y-4">
                {updates.map((update) => (
                  <div key={update.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">{update.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          update.type === 'urgent' ? 'bg-red-100 text-red-800' :
                          update.type === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {update.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{update.date}</span>
                        <button
                          onClick={() => removeUpdate(update.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600">{update.content}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>By: {update.author}</p>
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
          onSave={(studentData) => addStudent(selectedHostel!.id, selectedRoom.id, studentData)}
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
          onSave={(studentData) => {
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

// Student Modal Component
const StudentModal: React.FC<{
  room: Room;
  hostel: Hostel;
  student?: Student;
  onSave: (student: Student) => void;
  onClose: () => void;
}> = ({ room, hostel, student, onSave, onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {student ? 'Edit Student' : 'Add Student'} - {room.roomNumber}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID *</label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
              <input
                type="date"
                value={formData.checkInDate}
                onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
              <input
                type="date"
                value={formData.checkOutDate}
                onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="General">General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
              <select
                value={formData.yearOfStudy}
                onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {student ? 'Update' : 'Add'} Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Update Modal Component
const UpdateModal: React.FC<{
  onSave: (update: Omit<UpdateNotice, 'id'>) => void;
  onClose: () => void;
}> = ({ onSave, onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Add Update/Notice</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="general">General</option>
              <option value="urgent">Urgent</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
