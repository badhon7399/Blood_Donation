import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import FindDonor from './pages/FindDonor';
import CreateRequest from './pages/CreateRequest';
import BloodNeeds from './pages/BloodNeeds';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans w-full">
          <Navbar />
          <main className="flex-grow flex flex-col w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Register initialView="login" />} />
              <Route path="/register" element={<Register initialView="register" />} />
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              
              <Route path="/search" element={<FindDonor />} />
              <Route path="/request" element={<CreateRequest />} />
              <Route path="/blood-needs" element={<BloodNeeds />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
