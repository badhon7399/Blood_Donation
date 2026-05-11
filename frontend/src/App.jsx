import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import FindDonor from './pages/FindDonor';
import CreateRequest from './pages/CreateRequest';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans w-full">
          <Navbar />
          <main className="flex-grow flex flex-col w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              
              <Route path="/search" element={<FindDonor />} />
              <Route path="/request" element={<CreateRequest />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
