import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled(prev => (prev === nextScrolled ? prev : nextScrolled));
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '#about', label: 'About' },
    { to: '/search', label: 'Donate' },
    { to: '#events', label: 'Events' },
    { to: '#blog', label: 'Blog' },
    { to: '#contact', label: 'Contact' },
  ];
  if (user?.role === 'ROLE_DONOR') navLinks.push({ to: '/donor-dashboard', label: 'Dashboard' });

  return (
    <nav className={`sticky top-0 z-[900] py-4 border-b transition-all duration-300 backdrop-blur-md ${scrolled ? 'bg-white/98 shadow-[0_14px_36px_rgba(102,4,12,0.12)] border-transparent' : 'bg-white/95 border-red-700/10'}`}>
      <div className="relative flex items-center h-[60px] w-full px-5 md:px-16 lg:px-20">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <svg className="shrink-0" width="28" height="32" viewBox="0 0 24 24" fill="#b80f1d" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-2xl text-gray-900 leading-none tracking-tight">LifeStream</span>
            <span className="text-[0.65rem] font-semibold text-gray-600 mt-[2px] tracking-wider uppercase">Give Blood. <span className="text-[#b80f1d] font-bold">Save Lives.</span></span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 xl:gap-12 px-5 py-2.5 border border-red-700/15 rounded-full bg-white/95 shadow-[0_12px_30px_rgba(102,4,12,0.09)]">
          {navLinks.map(l => {
            const isActive = location.pathname === l.to || (l.to === '/' && location.pathname === '');
            return (
              <li key={l.to}>
                <Link to={l.to} className={`text-sm font-semibold transition-all hover:text-[#b80f1d] hover:-translate-y-[1px] relative py-1 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                  {l.label}
                  {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-gradient-to-r from-[#d41425] to-[#8c0812] shadow-[0_4px_10px_rgba(184,15,29,0.34)]"></span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth */}
        <div className="hidden md:flex items-center shrink-0 ml-auto">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full cursor-default">
                <div className="w-6 h-6 rounded-full bg-[#b80f1d] flex items-center justify-center text-[0.7rem] font-bold text-white shrink-0">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                <ChevronDown size={14} className="text-gray-500" />
              </div>
              <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-[#b80f1d] hover:bg-red-50 rounded-md transition-colors">
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/register" className="bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white rounded-full px-6 py-2.5 font-semibold text-sm shadow-[0_12px_28px_rgba(184,15,29,0.32)] hover:shadow-[0_18px_36px_rgba(102,4,12,0.36)] transition-all hover:-translate-y-[2px]">
              Register Now
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex ml-auto text-gray-800 p-2 rounded-md hover:bg-gray-100 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 flex flex-col gap-2 shadow-lg transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
        {navLinks.map(l => (
          <Link key={l.to} to={l.to} className={`px-4 py-3 rounded-md font-medium transition-colors ${location.pathname === l.to ? 'text-[#b80f1d] bg-red-50' : 'text-gray-700 hover:text-[#b80f1d] hover:bg-gray-50'}`}>
            {l.label}
          </Link>
        ))}
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
          {user ? (
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-md font-medium hover:bg-red-50 hover:text-[#b80f1d] hover:border-red-100 transition-colors">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/register" className="text-center bg-[#b80f1d] text-white px-4 py-3 rounded-md font-medium shadow-md hover:bg-[#990a16] transition-colors">
              Register Now
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
