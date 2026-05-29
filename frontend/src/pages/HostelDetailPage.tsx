import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  CheckCircle,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  QrCode,
  Upload,
  CheckCircle2,
  X,
  Shield
} from 'lucide-react';
import { hostelsData } from '../data/hostelsData';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const HostelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1 = details, 2 = payment, 3 = success
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

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

  // Fee calculation requested: Jawhalal Nehru = 10000, others = 9600
  const bookingFee = hostel.id.includes('jawaharlal-nehu') ? 10000 : 9600;

  const handleBookRoomClick = () => {
    if (!isAuthenticated || !user) {
      toast.error('Please login to book a room');
      return;
    }

    if (user.role === 'admin') {
      toast.error('Admins cannot book rooms. Please login as a student.');
      return;
    }

    const expectedHostelType = user.gender === 'male' ? 'boys' : 'girls';
    if (user.gender && expectedHostelType !== hostel.type) {
      toast.error(`Invalid selection. You can only book a ${user.gender}'s hostel.`);
      return;
    }

    const existingBookings = JSON.parse(localStorage.getItem('vikram_bookings') || '[]');
    const hasActiveBooking = existingBookings.some((b: any) => 
      b.userId === user.id && (b.status === 'Pending' || b.status === 'Confirmed')
    );

    if (hasActiveBooking) {
      toast.error('You already have an active or pending room booking. You cannot book another room.');
      return;
    }

    setShowBookingModal(true);
    setBookingStep(1);
    setScreenshotFile(null);
  };

  const proceedToPayment = () => {
    setBookingStep(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotFile(e.target.files[0]);
    }
  };

  const confirmBooking = () => {
    if (!screenshotFile) {
      toast.error('Please upload a payment screenshot');
      return;
    }

    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('vikram_bookings') || '[]');
    const newBooking = {
      id: `BKG-${Date.now()}`,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      userGender: user?.gender,
      hostelId: hostel.id,
      hostelName: hostel.name,
      hostelType: hostel.type,
      amount: bookingFee,
      status: 'Pending',
      date: new Date().toISOString(),
      screenshot: screenshotFile.name // mock saving file name
    };

    existingBookings.push(newBooking);
    localStorage.setItem('vikram_bookings', JSON.stringify(existingBookings));

    setBookingStep(3);
    toast.success('Room booking request submitted!');
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setTimeout(() => {
      setBookingStep(1);
      setScreenshotFile(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link 
          to="/hostels" 
          className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Listings
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 reveal-up">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm border border-slate-100 bg-white">
                <span className={`w-2 h-2 rounded-full ${hostel.type === 'boys' ? 'bg-blue-500' : 'bg-pink-500'}`}></span>
                {hostel.type} Hostel
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                {hostel.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-bold">
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-slate-200">
                  <MapPin size={14} className="mr-1.5 text-blue-500" />
                  <span>{hostel.location}</span>
                </div>
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-slate-200">
                  <Star className="mr-1.5 text-amber-500" size={14} fill="currentColor" />
                  <span>4.8 Rating</span>
                </div>
                <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-slate-200">
                  <Calendar size={14} className="mr-1.5 text-emerald-500" />
                  <span>Est. {hostel.established}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 text-left lg:text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Fee</div>
              <div className="text-4xl font-black text-blue-600">
                ₹{bookingFee}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="xl:col-span-2">
            {/* Image Gallery */}
            <div className="mb-10 reveal-up stagger-1">
              <div className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-slate-100">
                <div className="h-[400px] relative rounded-[2rem] overflow-hidden mb-3">
                  {hostel.images[selectedImageIndex] && (
                    <img 
                      src={hostel.images[selectedImageIndex]} 
                      alt={hostel.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                  {hostel.status === 'closed' && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                       <span className="px-6 py-2 bg-red-600 text-white font-bold rounded-full text-sm uppercase">Maintenance</span>
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {hostel.images.length > 1 && (
                  <div className="flex space-x-3 overflow-x-auto p-1 scrollbar-hide">
                    {hostel.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
                          selectedImageIndex === index 
                            ? 'ring-4 ring-blue-600 shadow-lg scale-95' 
                            : 'opacity-70 hover:opacity-100 hover:scale-100'
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
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-10 mb-10 border border-slate-100 reveal-up">
              <h2 className="text-2xl font-black text-slate-900 mb-6">About This Facility</h2>
              <p className="text-slate-500 leading-relaxed font-medium">{hostel.description}</p>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-10 mb-10 border border-slate-100 reveal-up">
              <h2 className="text-2xl font-black text-slate-900 mb-8">Amenities Provided</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {hostel.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50 transition-colors">
                    <CheckCircle className="text-blue-500" size={20} />
                    <span className="text-slate-700 font-bold text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mess Information */}
            <div className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-10 border border-slate-100 reveal-up">
              <h2 className="text-2xl font-black text-slate-900 mb-8">Dining & Mess</h2>
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-20 blur-[80px]"></div>
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">{hostel.mess.name}</h3>
                    <p className="text-slate-400 font-medium text-sm mb-6">{hostel.mess.location}</p>
                    <div className="space-y-4 text-sm font-bold">
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-slate-400">Capacity</span>
                        <span className="text-white">{hostel.mess.capacity} students</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-slate-400">Monthly Fee</span>
                        <span className="text-white">₹{hostel.mess.monthlyFee}</span>
                      </div>
                      <div className="pt-2">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Meal Types</span>
                         <div className="flex flex-wrap gap-2">
                           {hostel.mess.mealTypes.map((type, index) => (
                             <span key={index} className="px-3 py-1 bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-wider border border-white/10">
                               {type}
                             </span>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-3xl p-6 border border-white/10">
                    <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6">Schedule Timings</h4>
                    <div className="space-y-6">
                      <div>
                        <span className="text-slate-400 text-xs font-bold block mb-1">Breakfast</span>
                        <span className="text-white font-black">{hostel.mess.timings.breakfast}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs font-bold block mb-1">Lunch</span>
                        <span className="text-white font-black">{hostel.mess.timings.lunch}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs font-bold block mb-1">Dinner</span>
                        <span className="text-white font-black">{hostel.mess.timings.dinner}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-8">
            
            {/* Booking Action Card */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-100 reveal-up stagger-2 sticky top-28">
              <h3 className="text-xl font-black text-slate-900 mb-6">Reservation</h3>
              
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center border border-blue-100">
                 <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Total Annual Fee</div>
                 <div className="text-4xl font-black text-slate-900">₹{bookingFee}</div>
              </div>

              <div className="space-y-4 text-sm font-bold text-slate-600 mb-8">
                 <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span>Base Rent (Annual)</span>
                    <span className="text-slate-900">₹{bookingFee}</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span>Security Deposit</span>
                    <span className="text-slate-900">Included</span>
                 </div>
              </div>
              
              <button
                onClick={handleBookRoomClick}
                disabled={hostel.status === 'closed'}
                className={`w-full flex items-center justify-center py-5 text-lg shadow-lg group transition-all rounded-full font-black ${
                  hostel.status === 'closed' 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/30'
                }`}
              >
                <CreditCard size={20} className={`mr-2 ${hostel.status !== 'closed' && 'group-hover:scale-110 transition-transform'}`} />
                {hostel.status === 'closed' ? 'Maintenance Break' : 'Book Room Now'}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-emerald-600">
                 <CheckCircle size={14} /> Official University Gateway
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="bg-white rounded-[2.5rem] shadow-sm p-8 border border-slate-100 reveal-up stagger-3">
              <h3 className="text-xl font-black text-slate-900 mb-6">Status Overview</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Operational State</p>
                   <p className={`font-black text-sm ${hostel.status === 'closed' ? 'text-red-600' : 'text-emerald-600'}`}>
                     {hostel.status === 'closed' ? 'CLOSED' : 'ACTIVE & BOOKING'}
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Capacity</p>
                      <p className="font-black text-lg text-slate-900">{hostel.capacity}</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available</p>
                      <p className="font-black text-lg text-blue-600">{hostel.capacity - hostel.currentOccupancy}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div className="bg-white rounded-[2.5rem] shadow-sm p-8 border border-slate-100 reveal-up stagger-4">
              <h3 className="text-xl font-black text-slate-900 mb-6">Administration</h3>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h4 className="font-black text-slate-900">{hostel.warden.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{hostel.warden.position}</p>
                 </div>
              </div>
              <div className="space-y-3 bg-slate-50 rounded-2xl p-4">
                 <a href={`tel:${hostel.warden.contact}`} className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                    <Phone size={16} /> {hostel.warden.contact}
                 </a>
                 <a href={`mailto:${hostel.warden.email}`} className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors truncate">
                    <Mail size={16} /> {hostel.warden.email}
                 </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Booking Flow Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={closeBookingModal}></div>
          <div className="relative bg-white rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl animate-reveal-up">
            
            {/* Modal Header */}
            <div className="bg-slate-900 p-6 flex items-center justify-between">
               <h3 className="text-lg font-black text-white uppercase tracking-widest">Reservation Process</h3>
               <button onClick={closeBookingModal} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
                  <X size={16} />
               </button>
            </div>

            <div className="p-8 md:p-10">
               {/* Step 1: Details Confirmation */}
               {bookingStep === 1 && (
                 <div className="animate-fade-in">
                    <div className="text-center mb-8">
                       <h4 className="text-2xl font-black text-slate-900 mb-2">Confirm Details</h4>
                       <p className="text-slate-500 font-medium">Verify your details before proceeding to payment.</p>
                    </div>

                    <div className="space-y-6 mb-8">
                       <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hostel Selected</p>
                          <p className="font-black text-lg text-slate-900">{hostel.name}</p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Applicant Name</p>
                             <p className="font-bold text-slate-700 truncate">{user?.name}</p>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gender Verified</p>
                             <p className="font-bold text-slate-700 capitalize">{user?.gender || 'N/A'}</p>
                          </div>
                       </div>

                       <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-center justify-between">
                          <div>
                             <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Total Fee Required</p>
                             <p className="font-black text-3xl text-slate-900">₹{bookingFee}</p>
                          </div>
                       </div>
                    </div>

                    <button onClick={proceedToPayment} className="w-full btn-primary py-4">
                       Proceed to Payment
                    </button>
                 </div>
               )}

               {/* Step 2: Payment (QR Code) */}
               {bookingStep === 2 && (
                 <div className="animate-fade-in text-center">
                    <h4 className="text-2xl font-black text-slate-900 mb-2">Complete Payment</h4>
                    <p className="text-slate-500 font-medium mb-6">Scan the QR code below to pay <strong className="text-slate-900">₹{bookingFee}</strong> via UPI.</p>
                    
                    <div className="w-48 h-48 bg-slate-50 mx-auto rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center mb-6">
                       {/* Mock QR Code Graphic */}
                       <div className="text-center text-slate-400">
                          <QrCode size={80} className="mx-auto mb-2 opacity-50" />
                          <span className="text-xs font-black uppercase tracking-widest">Mock QR Code</span>
                       </div>
                    </div>

                    <div className="text-sm font-bold text-slate-600 mb-8 bg-slate-50 p-4 rounded-xl">
                       UPI ID: vikramuniv@sbi
                    </div>

                    <div className="mb-8 text-left">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Upload Payment Screenshot *</label>
                       <div className="relative">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden" 
                            id="screenshot-upload"
                          />
                          <label 
                            htmlFor="screenshot-upload"
                            className="flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold cursor-pointer transition-colors"
                          >
                            <Upload size={20} />
                            {screenshotFile ? screenshotFile.name : 'Choose File to Upload'}
                          </label>
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button onClick={() => setBookingStep(1)} className="btn-outline flex-1 py-4">Back</button>
                       <button onClick={confirmBooking} className="btn-primary flex-1 py-4">Submit Payment</button>
                    </div>
                 </div>
               )}

               {/* Step 3: Success */}
               {bookingStep === 3 && (
                 <div className="animate-fade-in text-center py-6">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle2 size={48} />
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 mb-4">Room is booked!</h4>
                    <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">
                       Your payment has been submitted and your booking request is under review. An admin will verify the payment soon.
                    </p>
                    <button onClick={() => { closeBookingModal(); navigate('/'); }} className="btn-primary w-full block py-4 text-center">
                       Return to Home
                    </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelDetailPage;