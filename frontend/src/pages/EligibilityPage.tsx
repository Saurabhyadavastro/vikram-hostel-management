import React, { useState } from 'react';
import { CheckCircle, XCircle, MapPin, Phone, User, Home, Award, ArrowRight, ClipboardCheck, Ruler, ShieldAlert } from 'lucide-react';
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

  const availableHostels = hostelsData.filter(hostel => {
    if (form.gender === 'male') return hostel.type === 'boys';
    if (form.gender === 'female') return hostel.type === 'girls';
    return false;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const checkEligibility = () => {
    setIsChecking(true);
    setTimeout(() => {
      const selectedHostel = hostelsData.find(h => h.id === form.selectedHostel);
      if (!selectedHostel) {
        setResult({ isEligible: false, reason: 'Please select a hostel', hostelName: '' });
        setIsChecking(false);
        return;
      }

      let isEligible = false;
      let reason = '';

      if (form.distance <= 20) {
        isEligible = false;
        reason = 'Minimum distance requirement is 20km from the university campus.';
      } else {
        if (selectedHostel.id === 'baba-saheb-ambedkar' && form.gender === 'male') {
          if (form.category === 'SC/ST') {
            isEligible = true;
            reason = 'You qualify for Baba Saheb Ambedkar Hostel (Reserved SC/ST).';
          } else {
            isEligible = false;
            reason = 'This hostel is exclusively for SC/ST category students.';
          }
        } else if (selectedHostel.id === 'ramabai' && form.gender === 'female') {
          if (form.category === 'SC/ST') {
            isEligible = true;
            reason = 'You qualify for Ramabai Girls Hostel (Reserved SC/ST).';
          } else {
            isEligible = false;
            reason = 'This hostel is exclusively for SC/ST category students.';
          }
        } else {
          if (selectedHostel.status === 'closed') {
            isEligible = false;
            reason = `${selectedHostel.name} is currently under maintenance.`;
          } else {
            const availableSeats = selectedHostel.capacity - selectedHostel.currentOccupancy;
            if (availableSeats > 0) {
              isEligible = true;
              reason = `Qualified for ${selectedHostel.name}. ${availableSeats} seats remaining.`;
            } else {
              isEligible = false;
              reason = `${selectedHostel.name} has reached maximum occupancy.`;
            }
          }
        }
      }

      setResult({ isEligible, reason, hostelName: selectedHostel.name });
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 reveal-up">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-black uppercase tracking-widest mb-6">
              <ClipboardCheck size={18} />
              <span>Admission Verification</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
             Check <span className="text-blue-600">Eligibility</span>
           </h1>
           <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
             Verify your residential qualification in seconds. Our automated system checks distance, category, and availability.
           </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
           {/* Guidelines Sidebar */}
           <div className="lg:col-span-1 space-y-6 reveal-up">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-20 blur-[60px]"></div>
                 <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <ShieldAlert className="text-amber-400" /> Essential Criteria
                 </h3>
                 <ul className="space-y-6">
                    <li className="flex gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-amber-400 font-black">1</div>
                       <div>
                          <p className="text-sm font-black uppercase tracking-wider text-blue-200">Distance</p>
                          <p className="text-slate-400 text-xs mt-1">Must reside at least 20km away from Ujjain campus.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-amber-400 font-black">2</div>
                       <div>
                          <p className="text-sm font-black uppercase tracking-wider text-blue-200">Enrollment</p>
                          <p className="text-slate-400 text-xs mt-1">Valid university registration ID required for final booking.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-amber-400 font-black">3</div>
                       <div>
                          <p className="text-sm font-black uppercase tracking-wider text-blue-200">Verification</p>
                          <p className="text-slate-400 text-xs mt-1">Address proof (Aadhar/Voter ID) must match input location.</p>
                       </div>
                    </li>
                 </ul>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                 <h3 className="text-xl font-black text-slate-900 mb-4">Need Help?</h3>
                 <p className="text-slate-500 text-sm mb-6 leading-relaxed">Our support team is available 10AM - 5PM for assistance with special cases.</p>
                 <button className="w-full btn-outline py-3 text-sm">Contact Support</button>
              </div>
           </div>

           {/* Form Section */}
           <div className="lg:col-span-2 reveal-up stagger-1">
              <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-50">
                 {!result ? (
                   <div className="space-y-10">
                      <div>
                         <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Personal Profiles</h2>
                         </div>
                         <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                               <input type="text" name="name" value={form.name} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700" placeholder="e.g. Rahul Sharma" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Access</label>
                               <input type="tel" name="mobile" value={form.mobile} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 font-mono" placeholder="+91 XXXXX XXXXX" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                               <select name="gender" value={form.gender} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700">
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                               </select>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reservation Category</label>
                               <select name="category" value={form.category} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700">
                                  <option value="">Select Category</option>
                                  <option value="General">General / Open</option>
                                  <option value="OBC">OBC</option>
                                  <option value="SC/ST">SC / ST</option>
                               </select>
                            </div>
                         </div>
                      </div>

                      <div>
                         <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-1 bg-amber-500 rounded-full"></div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Geographical Data</h2>
                         </div>
                         <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Home Town / City</label>
                               <input type="text" name="location" value={form.location} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700" placeholder="Current residential city" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Distance (km)</label>
                               <div className="relative">
                                  <input type="number" name="distance" value={form.distance} onChange={handleInputChange} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700" placeholder="0" />
                                  <Ruler className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                               </div>
                            </div>
                         </div>
                      </div>

                      <div>
                         <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-1 bg-indigo-600 rounded-full"></div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Preference</h2>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Residential Block</label>
                            <select name="selectedHostel" value={form.selectedHostel} onChange={handleInputChange} disabled={!form.gender} className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
                               <option value="">{!form.gender ? 'Define gender to see options' : 'Choose a Hostel block'}</option>
                               {availableHostels.map(h => (
                                 <option key={h.id} value={h.id}>{h.name} {h.status === 'closed' ? '(Under Maintenance)' : ''}</option>
                               ))}
                            </select>
                         </div>
                      </div>

                      <div className="pt-8">
                         <button onClick={checkEligibility} disabled={isChecking || !form.selectedHostel} className="w-full btn-primary py-5 text-lg shadow-xl shadow-blue-600/20 disabled:opacity-50 group">
                            {isChecking ? (
                              <div className="flex items-center justify-center gap-3">
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                 Processing Data...
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                 Perform Verification <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                         </button>
                      </div>
                   </div>
                 ) : (
                   <div className="text-center py-6 animate-fade-in-up">
                      <div className="mb-10 relative inline-block">
                         <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${result.isEligible ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                         {result.isEligible ? (
                           <CheckCircle size={120} className="text-emerald-500 relative" />
                         ) : (
                           <XCircle size={120} className="text-red-500 relative" />
                         )}
                      </div>

                      <h2 className={`text-4xl font-black mb-4 ${result.isEligible ? 'text-emerald-600' : 'text-red-600'}`}>
                        {result.isEligible ? 'VERIFIED ELIGIBLE' : 'QUALIFICATION FAILED'}
                      </h2>
                      <p className="text-slate-500 font-bold text-lg mb-10 max-w-md mx-auto leading-relaxed">
                        {result.reason}
                      </p>

                      <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-10 border border-slate-100">
                         <div className="grid grid-cols-2 gap-y-6 text-left">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate</p>
                               <p className="font-bold text-slate-900">{form.name}</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin</p>
                               <p className="font-bold text-slate-900">{form.location} ({form.distance}km)</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</p>
                               <p className="font-bold text-slate-900">{form.category}</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected block</p>
                               <p className="font-bold text-slate-900">{result.hostelName}</p>
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <button onClick={() => setResult(null)} className="btn-outline px-8">Check Another</button>
                         {result.isEligible && (
                           <button onClick={() => window.location.href = '/hostels'} className="btn-primary px-8">Proceed to Booking</button>
                         )}
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityPage;
