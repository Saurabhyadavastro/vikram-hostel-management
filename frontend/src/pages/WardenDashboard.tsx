import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WardenDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature Not Available</h2>
        <p className="text-gray-600">Warden dashboard is currently not available.</p>
        <p className="text-gray-600 mt-2">Please contact the administrator for more information.</p>
      </div>
    </div>
  );
};

export default WardenDashboard;
