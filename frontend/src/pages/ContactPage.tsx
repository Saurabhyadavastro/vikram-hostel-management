import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.custom((t) => (
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
           <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 size={24} />
           </div>
           <div>
              <p className="font-black text-sm uppercase tracking-widest text-emerald-400">Message Delivered</p>
              <p className="text-sm font-medium">We'll get back to you shortly.</p>
           </div>
        </div>
      ), { duration: 4000 });
      setFormData({ name: '', email: '', phone: '', category: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const officeHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 1:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  const contacts = [
    {
      title: 'Administration Office',
      phone: '+91-734-2274545',
      email: 'hostel@vikramuniv.ac.in',
      address: 'Vikram University Campus, Dewas Road, Ujjain - 456010',
      timing: 'Mon-Fri: 9:00 AM - 6:00 PM',
      color: 'blue'
    },
    {
      title: 'Student Affairs',
      phone: '+91-734-2274546',
      email: 'studentaffairs@vikramuniv.ac.in',
      address: 'Administrative Block, Samrat Vikramaditya University',
      timing: 'Mon-Sat: 9:00 AM - 5:00 PM',
      color: 'indigo'
    },
    {
      title: 'Emergency Contact',
      phone: '+91-734-2274500',
      email: 'emergency@vikramuniv.ac.in',
      address: 'Security Office, Main Gate',
      timing: '24/7 Available',
      color: 'red'
    }
  ];

  const quickContacts = [
    { title: 'Boys Hostel Warden', name: 'Dr. Rajesh Kumar', phone: '+91-9876543210' },
    { title: 'Girls Hostel Warden', name: 'Dr. Priya Sharma', phone: '+91-9876543211' },
    { title: 'Mess Manager', name: 'Mr. Suresh Patel', phone: '+91-9876543212' },
    { title: 'Maintenance Head', name: 'Mr. Amit Singh', phone: '+91-9876543213' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 overflow-hidden">
      {/* Header Section */}
      <section className="relative mb-20 reveal-up">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-b from-blue-100 to-transparent opacity-50 blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-black uppercase tracking-widest mb-6">
            <Mail size={16} /> Get In Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6">
            We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Help</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Reach out to Vikram University Hostel Management for inquiries, support, or emergency assistance.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Main Contact Form */}
          <div className="lg:col-span-3 reveal-up stagger-1">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 opacity-10 blur-[80px]"></div>
              
              <div className="relative z-10">
                 <h2 className="text-3xl font-black text-slate-900 mb-2">Send us a message</h2>
                 <p className="text-slate-500 font-medium mb-10">Fill out the form below and our team will respond within 24 hours.</p>

                 <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                          <div className="relative">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                             <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700" placeholder="e.g. John Doe" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                          <div className="relative">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                             <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700" placeholder="john@example.com" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                          <div className="relative">
                             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 font-mono" placeholder="+91 XXXXX XXXXX" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Topic</label>
                          <div className="relative">
                             <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                             <select name="category" value={formData.category} onChange={handleChange} required className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700 appearance-none">
                               <option value="">Select Topic</option>
                               <option value="admission">Hostel Admission</option>
                               <option value="booking">Room Booking</option>
                               <option value="complaint">Complaint</option>
                               <option value="payment">Payment Issues</option>
                               <option value="facilities">Facilities</option>
                               <option value="other">Other</option>
                             </select>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                       <div className="relative">
                          <MessageSquare className="absolute left-4 top-6 text-slate-400" size={20} />
                          <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-700 resize-none" placeholder="How can we assist you today?"></textarea>
                       </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-5 text-lg shadow-xl shadow-blue-600/20 group disabled:opacity-70 disabled:cursor-not-allowed">
                       {isSubmitting ? (
                         <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                         </div>
                       ) : (
                         <div className="flex items-center justify-center gap-2">
                            Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                         </div>
                       )}
                    </button>
                 </form>
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="lg:col-span-2 space-y-8 reveal-up stagger-2">
            
            {/* Office Hours Widget */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-20 blur-[50px]"></div>
               <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                     <Clock size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black">Office Hours</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IST Timezone</p>
                  </div>
               </div>
               
               <div className="space-y-4 relative z-10">
                  {officeHours.map((hour, idx) => (
                     <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                        <span className="font-bold text-slate-300">{hour.day}</span>
                        <span className={`font-black ${hour.time === 'Closed' ? 'text-red-400' : 'text-white'}`}>{hour.time}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Direct Directory */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
               <h3 className="text-xl font-black text-slate-900 mb-6">Directory</h3>
               <div className="space-y-4">
                  {quickContacts.map((contact, idx) => (
                     <div key={idx} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center group hover:bg-blue-50 transition-colors cursor-pointer">
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-400">{contact.title}</p>
                           <p className="text-sm font-bold text-slate-700">{contact.name}</p>
                        </div>
                        <a href={`tel:${contact.phone}`} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                           <Phone size={18} />
                        </a>
                     </div>
                  ))}
               </div>
            </div>

          </div>
        </div>

        {/* Location Cards */}
        <div className="mt-20 mb-12 text-center reveal-up">
           <h2 className="text-3xl font-black text-slate-900 mb-4">Our Locations</h2>
           <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 reveal-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-14 h-14 bg-${contact.color}-50 text-${contact.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
                 <MapPin size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-6">{contact.title}</h3>
              
              <div className="space-y-4">
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Call</span>
                    <a href={`tel:${contact.phone}`} className={`font-bold text-${contact.color}-600 font-mono`}>{contact.phone}</a>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email</span>
                    <a href={`mailto:${contact.email}`} className="font-bold text-slate-700">{contact.email}</a>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Visit</span>
                    <p className="font-medium text-slate-500 text-sm leading-relaxed">{contact.address}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section - Styled like a bento item */}
        <div className="bg-slate-900 rounded-[3rem] p-2 relative overflow-hidden reveal-up">
           <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
           <div className="bg-slate-800 rounded-[2.5rem] h-[400px] flex items-center justify-center relative z-10 border border-white/10">
              <div className="text-center p-8 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white animate-bounce-slow shadow-lg shadow-blue-600/50">
                   <MapPin size={28} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Campus Map</h3>
                <p className="text-blue-200 font-medium mb-6">Vikram University, Dewas Road, Ujjain</p>
                <a 
                  href="https://earth.google.com/web/search/vikram+university" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-accent px-8 py-3 text-sm inline-flex items-center gap-2"
                >
                   Open in Google Earth <ArrowRight size={16} />
                </a>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;