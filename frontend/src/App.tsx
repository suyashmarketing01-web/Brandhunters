import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';

// Main website pages
import Home from './pages/Home';
import Course from './pages/Course';
import Education from './pages/Education';
import RealEstate from './pages/RealEstate';
import HospitalMarketing from './pages/HospitalMarketing';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CityLanding from './pages/CityLanding';
import International from './pages/International';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ClientsList from './pages/admin/ClientsList';
import ClientPosts from './pages/admin/ClientPosts';

// Client pages
import ClientLogin from './pages/client/ClientLogin';
import ClientLayout from './pages/client/ClientLayout';
import ClientDashboard from './pages/client/ClientDashboard';

import React from 'react';

// Route Guards
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated } = useAuth();
  return isAdminAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

function ProtectedClientRoute({ children }: { children: React.ReactNode }) {
  const { isClientAuthenticated } = useAuth();
  return isClientAuthenticated ? <>{children}</> : <Navigate to="/portal/login" replace />;
}


export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Admin panel routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<ClientsList />} />
              <Route path="clients/:clientId/posts" element={<ClientPosts />} />
            </Route>

            {/* Client portal routes */}
            <Route path="/portal/login" element={<ClientLogin />} />
            <Route
              path="/portal"
              element={
                <ProtectedClientRoute>
                  <ClientLayout />
                </ProtectedClientRoute>
              }
            >
              <Route index element={<ClientDashboard />} />
            </Route>

            {/* Main Website (rendered with Layout & SplashScreen) */}
            <Route
              path="/*"
              element={
                <>
                  <SplashScreen />
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/digital-marketing-agency-pune" element={<CityLanding city="Pune" />} />
                      <Route path="/digital-marketing-agency-mumbai" element={<CityLanding city="Mumbai" />} />
                      <Route path="/course" element={<Course />} />
                      <Route path="/education" element={<Education />} />
                      <Route path="/real-estate" element={<RealEstate />} />
                      <Route path="/hospital-marketing" element={<HospitalMarketing />} />
                      <Route path="/thank-you" element={<ThankYou />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route path="/digital-marketing-uk-us" element={<International />} />
                    </Routes>
                  </Layout>
                </>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}