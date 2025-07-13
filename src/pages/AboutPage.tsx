import React from 'react';
import { Award, Users, Calendar, Target, Heart, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: Calendar, label: 'Years of Excellence', value: '30+' },
    { icon: Users, label: 'Students Accommodated', value: '1,300+' },
    { icon: Award, label: 'Hostels', value: '8' },
    { icon: Target, label: 'Success Rate', value: '98%' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Student-Centric Approach',
      description: 'We prioritize student comfort, safety, and academic success in everything we do.'
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      description: 'Round-the-clock security ensures a safe and secure environment for all residents.'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Fostering a sense of belonging and community among students from diverse backgrounds.'
    },
    {
      icon: Award,
      title: 'Excellence in Service',
      description: 'Committed to providing world-class hostel facilities and services.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 university-gradient">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Vikram University
            <span className="block text-accent-400">Hostel Management</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Dedicated to providing world-class accommodation facilities that support 
            academic excellence and personal growth for over three decades.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Icon className="text-primary-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide safe, comfortable, and conducive living environments that enable students 
                to focus on their academic pursuits while fostering personal growth, cultural exchange, 
                and lifelong friendships.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are committed to maintaining the highest standards of accommodation, cleanliness, 
                security, and student welfare, ensuring that every resident feels at home while 
                pursuing their educational goals.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To be recognized as the premier university hostel system in India, known for our 
                innovative facilities, exceptional student care, and contribution to academic 
                excellence and character development.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision creating a global community of scholars who carry forward the values 
                of integrity, excellence, and service learned during their stay in our hostels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our commitment to student welfare and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three decades of excellence in student accommodation and welfare
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1990
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Foundation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Vikram University established its first hostel facility with Vidyatama Girls Hostel, 
                setting the foundation for quality student accommodation on campus.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2000
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Expansion</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Major expansion phase with the addition of multiple boys hostels including Sandipini, 
                Kalidash, and Bhartihari, increasing capacity to over 1000 students.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2010
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Modernization</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Implementation of modern facilities including high-speed internet, digital security systems, 
                and upgraded mess facilities to meet contemporary student needs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2025
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Digital Transformation</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Launch of comprehensive digital hostel management system, enabling online room booking, 
                payment processing, and enhanced student services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 university-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-accent-100 mb-8">
            Experience the best in student accommodation at Vikram University
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent text-lg px-8 py-4">
              Apply for Admission
            </button>
            <button className="btn-outline bg-white bg-opacity-10 text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 