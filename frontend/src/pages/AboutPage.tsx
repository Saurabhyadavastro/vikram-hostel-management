import React from 'react';
import { Award, Users, Calendar, Target, Heart, Shield, BookOpen, Clock, Building, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Calendar, label: 'Years of Excellence', value: '30+', color: 'blue' },
    { icon: Users, label: 'Students Accommodated', value: '1,300+', color: 'indigo' },
    { icon: Building, label: 'Residential Blocks', value: '8', color: 'amber' },
    { icon: Target, label: 'Success Rate', value: '98%', color: 'emerald' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Student-Centric Approach',
      description: 'We prioritize student comfort, safety, and academic success in everything we do, creating an environment that feels like a second home.'
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      description: 'Round-the-clock security, biometric access, and vigilant staff ensure a safe and secure environment for all residents.'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Fostering a sense of belonging and community among students from diverse backgrounds through cultural events and collaborative spaces.'
    },
    {
      icon: Award,
      title: 'Excellence in Service',
      description: 'Committed to providing world-class hostel facilities, from nutritious dining to high-speed connectivity and modern amenities.'
    },
  ];

  const timeline = [
    {
      year: '1990',
      title: 'Foundation',
      description: 'Samrat Vikramaditya University established its first hostel facility with Vidyatama Girls Hostel, setting the foundation for quality student accommodation on campus.'
    },
    {
      year: '2000',
      title: 'Expansion Phase',
      description: 'Major expansion with the addition of multiple boys hostels including Sandipini, Kalidash, and Bhartihari, increasing capacity to over 1000 students.'
    },
    {
      year: '2010',
      title: 'Modernization',
      description: 'Implementation of modern facilities including high-speed internet, digital security systems, and upgraded mess facilities to meet contemporary needs.'
    },
    {
      year: '2025',
      title: 'Digital Transformation',
      description: 'Launch of the comprehensive digital portal, enabling online room booking, eligibility verification, and enhanced transparent student services.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 opacity-20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500 opacity-10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-md">
            <BookOpen size={14} /> Our Story & Legacy
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            About Vikram University <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Hostel Management
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
            Dedicated to providing world-class accommodation facilities that support 
            academic excellence and personal growth for over three decades.
          </p>
        </div>
      </section>

      {/* Stats Section Floating */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`text-center px-4 ${index % 2 !== 0 ? 'border-l-0 md:border-l' : ''} ${index > 1 ? 'border-t md:border-t-0 pt-8 md:pt-0 mt-8 md:mt-0' : ''}`}>
                  <div className={`mx-auto w-16 h-16 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon size={32} />
                  </div>
                  <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Bento Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden reveal-up">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 blur-[80px]"></div>
              <div className="relative z-10">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-white/10">
                    <Target size={32} />
                 </div>
                 <h2 className="text-4xl font-black mb-6">Our Mission</h2>
                 <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium">
                   To provide safe, comfortable, and conducive living environments that enable students 
                   to focus on their academic pursuits while fostering personal growth, cultural exchange, 
                   and lifelong friendships.
                 </p>
                 <p className="text-slate-400 leading-relaxed font-medium">
                   We are committed to maintaining the highest standards of accommodation, cleanliness, 
                   security, and student welfare, ensuring that every resident feels at home while 
                   pursuing their educational goals.
                 </p>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden reveal-up stagger-1">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 opacity-20 blur-[80px]"></div>
              <div className="relative z-10">
                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                    <Award size={32} />
                 </div>
                 <h2 className="text-4xl font-black mb-6">Our Vision</h2>
                 <p className="text-blue-100 text-lg leading-relaxed mb-6 font-medium">
                   To be recognized as the premier university hostel system in India, known for our 
                   innovative facilities, exceptional student care, and contribution to academic 
                   excellence and character development.
                 </p>
                 <p className="text-blue-200 leading-relaxed font-medium opacity-80">
                   We envision creating a global community of scholars who carry forward the values 
                   of integrity, excellence, and service learned during their stay in our hostels.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Core Values</h2>
            <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              The principles that guide our commitment to student welfare and academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-slate-50 rounded-[2.5rem] p-8 hover:-translate-y-2 transition-all duration-500 border border-slate-100 group reveal-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:bg-blue-600 group-hover:text-white text-blue-600">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Our Journey</h2>
            <p className="text-lg text-slate-500 font-medium">Three decades of evolution in student accommodation.</p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active reveal-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1.5 bg-slate-100 text-blue-600 font-black text-sm rounded-full tracking-wider">{item.year}</span>
                    <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 leading-relaxed font-medium">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 reveal-up">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Ready to experience <br />
            <span className="text-amber-400">campus life?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium opacity-90 max-w-2xl mx-auto">
            Begin your journey with Samrat Vikramaditya University Hostels. Safe, modern, and built for your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/eligibility" className="btn-accent px-10 py-4 text-lg">
              Check Eligibility
            </Link>
            <Link to="/contact" className="px-10 py-4 rounded-full border-2 border-white/30 text-white font-black hover:bg-white hover:text-slate-900 transition-all text-lg flex items-center justify-center gap-2">
              Contact Admin <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;