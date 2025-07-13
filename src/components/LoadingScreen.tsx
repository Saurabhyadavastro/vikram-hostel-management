import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="university-loader">
      <div className="text-center">
        {/* University Logo */}
        <div className="university-logo-animation mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center p-2">
              <img 
                src="/images/vikram-university-logo.jpg" 
                alt="Vikram University Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <div className="hidden text-primary-600 font-bold text-2xl">VU</div>
            </div>
          </div>
        </div>

        {/* University Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in-up">
          Vikram University
        </h1>
        <h2 className="text-xl md:text-2xl text-accent-200 mb-8 animate-fade-in-up">
          Hostel Management System
        </h2>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-accent-400 rounded-full animate-bounce-slow"></div>
          <div className="w-3 h-3 bg-accent-400 rounded-full animate-bounce-slow" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-accent-400 rounded-full animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-accent-100 text-lg animate-pulse">
          Loading Excellence...
        </p>

        {/* University Motto */}
        <div className="mt-8 text-center">
          <p className="text-accent-200 text-sm italic">
            "Knowledge is Power, Character is Excellence"
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 border-2 border-accent-400 rounded-full opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 border-2 border-accent-400 rounded-full opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 border-2 border-accent-400 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-10 w-10 h-10 border-2 border-accent-400 rounded-full opacity-25 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen; 