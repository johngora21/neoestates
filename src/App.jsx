import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Houses from './pages/Houses';
import Apartments from './pages/Apartments';
import Commercial from './pages/Commercial';
import Plots from './pages/Plots';
import PropertyDetail from './pages/PropertyDetail';
import Profile from './pages/Profile';
import MyProperties from './pages/MyProperties';
import AddProperty from './pages/AddProperty';
import ResidentialSubmission from './pages/ResidentialSubmission';
import CommercialSubmission from './pages/CommercialSubmission';
import PlotSubmission from './pages/PlotSubmission';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminPendingProperties from './pages/AdminPendingProperties';
import AdminAddProperty from './pages/AdminAddProperty';
import BecomeAgent from './pages/BecomeAgent';
import AdminAgentRequests from './pages/AdminAgentRequests';
import BottomNav from './components/BottomNav';

function AppContent() {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();

  const addToFavorites = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Hide bottom nav on property detail pages, submission pages, add property page, profile, my properties, and admin pages
  const shouldShowBottomNav = !location.pathname.startsWith('/properties/') && 
                             !location.pathname.startsWith('/submit/') &&
                             !location.pathname.startsWith('/add-property') &&
                             !location.pathname.startsWith('/profile') &&
                             !location.pathname.startsWith('/my-properties') &&
                             !location.pathname.startsWith('/admin/') &&
                             !location.pathname.startsWith('/become-agent');

  return (
    <div className="App">
      <main className={shouldShowBottomNav ? "pb-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/plots" element={<Plots />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/become-agent" element={<BecomeAgent />} />
          <Route path="/properties/:id" element={<PropertyDetail addToFavorites={addToFavorites} favorites={favorites} />} />
          <Route path="/submit/residential" element={<ResidentialSubmission />} />
          <Route path="/submit/commercial" element={<CommercialSubmission />} />
          <Route path="/submit/plot" element={<PlotSubmission />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/pending-properties" element={<AdminPendingProperties />} />
          <Route path="/admin/add-property" element={<AdminAddProperty />} />
          <Route path="/admin/agent-requests" element={<AdminAgentRequests />} />
        </Routes>
      </main>
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
