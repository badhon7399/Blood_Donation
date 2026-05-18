import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown, LayoutDashboard, Search, Heart, CalendarDays } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen]         = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { user, logout }            = useAuth();
  const navigate                    = useNavigate();
  const location                    = useLocation();
  const profileRef                  = useRef(null);

  /* scroll effect */
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => { setIsOpen(false); setProfileOpen(false); }, [location]);

  /* close dropdown when clicking outside */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setProfileOpen(false); };

  const navLinks = [
    { to: '/',        label: 'Home'          },
    { to: '/search',  label: 'Find Donor'    },
    { to: '/request', label: 'Request Blood' },
    { to: '/blood-needs', label: 'Blood Needs' },
    { to: '/events',  label: 'Events'        },
    { to: '/about',   label: 'About'         },
    { to: '/contact', label: 'Contact'       },
  ];

  return (
    <nav className={`sticky top-0 z-[900] border-b transition-all duration-300 backdrop-blur-md ${
      scrolled
        ? 'bg-white/95 shadow-[0_8px_32px_rgba(102,4,12,0.10)] border-transparent'
        : 'bg-white/95 border-red-700/10'
    }`}>
      <div className="relative flex items-center h-[64px] w-full px-5 md:px-10 lg:px-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <svg width="26" height="30" viewBox="0 0 24 24" fill="#b80f1d" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-[1.35rem] text-gray-900 leading-none tracking-tight">LifeStream</span>
            <span className="text-[0.6rem] font-semibold text-gray-500 mt-[2px] tracking-wider uppercase">
              Give Blood. <span className="text-[#b80f1d] font-bold">Save Lives.</span>
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7 xl:gap-10 px-5 py-2 border border-red-700/12 rounded-full bg-white/95 shadow-[0_8px_24px_rgba(102,4,12,0.08)]">
          {navLinks.map(l => {
            const isActive = location.pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`text-sm font-semibold transition-all hover:text-[#b80f1d] relative py-1 ${isActive ? 'text-[#b80f1d]' : 'text-gray-600'}`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#b80f1d]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth — desktop */}
        <div className="hidden md:flex items-center shrink-0 ml-auto gap-3">
          {user ? (
            /* Profile dropdown */
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className={`flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                  profileOpen
                    ? 'bg-red-50 border-red-200 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-200'
                }`}
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d41425] to-[#66040c] flex items-center justify-center text-[0.75rem] font-extrabold text-white shrink-0 shadow">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-800 max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-[1000]">
                  {/* User info header */}
                  <div className="px-4 py-4 bg-gradient-to-br from-[#b80f1d] to-[#66040c] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-base font-extrabold text-white shrink-0">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-white text-sm truncate">{user.name}</p>
                      <p className="text-white/70 text-xs truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    <Link
                      to="/donor-dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#b80f1d] transition-colors"
                    >
                      <LayoutDashboard size={16} className="text-gray-400" />
                      My Dashboard
                    </Link>
                    <Link
                      to="/search"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#b80f1d] transition-colors"
                    >
                      <Search size={16} className="text-gray-400" />
                      Find Donor
                    </Link>
                    <Link
                      to="/events"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#b80f1d] transition-colors"
                    >
                      <CalendarDays size={16} className="text-gray-400" />
                      Live Events
                    </Link>
                    <Link
                      to="/request"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#b80f1d] transition-colors"
                    >
                      <Heart size={16} className="text-gray-400" />
                      Request Blood
                    </Link>
                  </div>

                  <div className="h-px bg-gray-100 mx-2" />

                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className="bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white rounded-full px-5 py-2 font-semibold text-sm shadow-[0_8px_20px_rgba(184,15,29,0.28)] hover:shadow-[0_12px_28px_rgba(102,4,12,0.32)] transition-all hover:-translate-y-[1px]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex ml-auto text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 origin-top z-50 ${
        isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
      }`}>
        {user && (
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-red-50 to-white border-b border-red-100">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d41425] to-[#66040c] flex items-center justify-center text-sm font-extrabold text-white">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{user.name}</p>
              <p className="text-gray-500 text-xs">{user.email}</p>
            </div>
          </div>
        )}

        <div className="p-4 flex flex-col gap-1">
          {navLinks.map(l => (
            <Link
              key={l.to} to={l.to}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === l.to
                  ? 'bg-red-50 text-[#b80f1d]'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#b80f1d]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="px-4 pb-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors"
            >
              <LogOut size={15} /> Sign Out
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/register" className="text-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-[#b80f1d] hover:bg-[#990a16] transition-colors">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
