import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HostelsPage from './pages/HostelsPage';
import HostelDetailPage from './pages/HostelDetailPage';
import RoomDetailPage from './pages/RoomDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminPanel from './pages/AdminPanel';
import StudentDashboard from './pages/StudentDashboard';
import MessPage from './pages/MessPage';
import EligibilityPage from './pages/EligibilityPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component for eligibility page
const ProtectedEligibilityRoute: React.FC = () => {
  const { user } = useAuth();
  
  // If user is admin, redirect to admin panel
  if (user?.role === 'admin') {
    return <Navigate to="/admin-panel" replace />;
  }
  
  // For non-admin users (or no user), show eligibility page
  return <EligibilityPage />;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Navbar 
            onLoginClick={() => setShowLogin(true)} 
            onRegisterClick={() => setShowRegister(true)}
          />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hostels" element={<HostelsPage />} />
            <Route path="/hostel/:id" element={<HostelDetailPage />} />
            <Route path="/hostel/:id/room/:roomId" element={<RoomDetailPage />} />
            <Route path="/mess" element={<MessPage />} />
            <Route path="/eligibility" element={<ProtectedEligibilityRoute />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Routes>

          {showLogin && (
            <LoginPage 
              onClose={() => setShowLogin(false)} 
              onSwitchToRegister={handleSwitchToRegister}
            />
          )}

          {showRegister && (
            <RegisterPage 
              onClose={() => setShowRegister(false)} 
              onSwitchToLogin={handleSwitchToLogin}
            />
          )}

          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
