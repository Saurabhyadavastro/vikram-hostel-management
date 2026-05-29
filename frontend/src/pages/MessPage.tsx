import React, { useState } from 'react';
import { Phone, MapPin, DollarSign, Users, Clock, Star, Utensils, ArrowRight, ShieldCheck, ChevronRight, X, Building } from 'lucide-react';

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
    <div className="hostel-card-new group reveal-up flex flex-col h-full overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        {mess.images.length > 0 ? (
          <img
            src={mess.images[0]}
            alt={mess.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=1000';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <Utensils className="h-16 w-16 text-slate-300" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
            mess.type === 'boys' 
              ? 'bg-blue-600/90 text-white' 
              : 'bg-pink-600/90 text-white'
          }`}>
            {mess.type}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
          <h3 className="text-white text-xl font-black truncate">{mess.name}</h3>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2 leading-relaxed">
          {mess.description}
        </p>

        <div className="grid grid-cols-1 gap-4 mb-8 flex-1">
          <div className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
              <p className="text-sm font-bold text-slate-700 truncate">{mess.hostelName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors">
              <Users size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In-charge</p>
              <p className="text-sm font-bold text-slate-700 truncate">{mess.incharge}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</p>
              <p className="text-sm font-bold text-slate-700 font-mono">{mess.mobile}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {mess.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-lg"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Fee</span>
            <div className="text-xl font-black text-slate-900">
              {mess.monthlyFees > 0 ? `₹${mess.monthlyFees}` : 'TBD'}
            </div>
          </div>
          <button
            onClick={() => setSelectedMess(mess)}
            className="flex items-center gap-2 font-black text-sm text-blue-600 group-hover:gap-4 transition-all"
          >
            Full Details <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden mb-16">
        <div className="absolute inset-0 university-gradient"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-[0.03] skew-x-[-20deg] translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 opacity-20 blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-sm font-bold mb-6">
            <Utensils size={16} />
            <span>Premium Dining Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Nutritious <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Living</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium opacity-90 mb-12">
            Quality dining experience focusing on hygiene, nutrition, and variety for all residents of Samrat Vikramaditya University hostels.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
             {[
               { label: 'Total Mess', value: messData.length },
               { label: 'Boys Mess', value: boysMessData.length },
               { label: 'Girls Mess', value: girlsMessData.length },
               { label: 'Standard Rating', value: '4.8/5' },
             ].map((stat, i) => (
               <div key={i} className="glass-card p-6 rounded-3xl">
                  <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-black text-blue-200 uppercase tracking-widest">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Boys Mess Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12 reveal-up">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
              <Utensils size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-none mb-2">Boys Dining Halls</h2>
              <p className="text-slate-500 font-bold">Standardized quality for male residents</p>
            </div>
            <div className="flex-grow h-px bg-slate-200 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {boysMessData.map((mess) => (
              <MessCard key={mess.id} mess={mess} />
            ))}
          </div>
        </div>

        {/* Girls Mess Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-12 reveal-up">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 shadow-sm">
              <Utensils size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-none mb-2">Girls Dining Halls</h2>
              <p className="text-slate-500 font-bold">Safe and nutritious dining for female residents</p>
            </div>
            <div className="flex-grow h-px bg-slate-200 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {girlsMessData.map((mess) => (
              <MessCard key={mess.id} mess={mess} />
            ))}
          </div>
        </div>
      </div>

      {/* Mess Details Modal */}
      {selectedMess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setSelectedMess(null)}></div>
          <div className="relative bg-white rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-reveal-up">
            <div className="absolute top-6 right-6 z-20">
              <button
                onClick={() => setSelectedMess(null)}
                className="w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white text-slate-900 rounded-full flex items-center justify-center transition-all shadow-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
               <div className="grid lg:grid-cols-2">
                  {/* Gallery Section */}
                  <div className="p-8 lg:p-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                       <ShieldCheck size={14} /> Quality Verified
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4">{selectedMess.name}</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">{selectedMess.description}</p>
                    
                    <div className="space-y-6 mb-10">
                       <div className="bg-slate-50 rounded-3xl p-6 grid grid-cols-2 gap-6">
                          <div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Breakfast</span>
                             <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><Clock size={16} /> {selectedMess.timings.breakfast}</span>
                          </div>
                          <div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Lunch</span>
                             <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><Clock size={16} /> {selectedMess.timings.lunch}</span>
                          </div>
                          <div className="col-span-2 pt-4 border-t border-slate-200">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Dinner</span>
                             <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><Clock size={16} /> {selectedMess.timings.dinner}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                       {selectedMess.features.map((f, i) => (
                         <div key={i} className="px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-black rounded-xl border border-emerald-100">
                            {f}
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Visuals Section */}
                  <div className="bg-slate-50 p-8 lg:p-12 flex flex-col gap-6">
                     <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <Building className="text-blue-600" /> Facility Gallery
                     </h3>
                     <div className="grid grid-cols-2 gap-4">
                        {selectedMess.images.map((img, i) => (
                           <div key={i} className={`rounded-[2rem] overflow-hidden shadow-md ${i === 0 ? 'col-span-2 h-64' : 'h-40'}`}>
                              <img src={img} alt="Mess" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                           </div>
                        ))}
                        {selectedMess.images.length === 1 && (
                          <div className="col-span-2 h-40 bg-slate-200 rounded-[2rem] flex items-center justify-center text-slate-400 font-bold italic">
                             More photos coming soon...
                          </div>
                        )}
                     </div>

                     <div className="mt-auto bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                              <Star size={24} fill="currentColor" />
                           </div>
                           <div>
                              <div className="text-sm font-black text-slate-400 uppercase tracking-widest">Warden Certified</div>
                              <div className="text-lg font-bold text-slate-900">Official Campus Dining</div>
                           </div>
                        </div>
                        <button className="w-full btn-primary py-4">
                           Book Subscription
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessPage;
