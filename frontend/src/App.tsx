import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Course from './pages/Course';
import Education from './pages/Education';
import RealEstate from './pages/RealEstate';
import HospitalMarketing from './pages/HospitalMarketing';
import ThankYou from './pages/ThankYou';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CityLanding from './pages/CityLanding';
import SplashScreen from './components/SplashScreen';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
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
        </Routes>
      </Layout>
    </Router>
    </HelmetProvider>
  );
}