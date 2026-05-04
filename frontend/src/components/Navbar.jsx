import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

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
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <svg className="navbar__logo-icon" width="28" height="32" viewBox="0 0 24 24" fill="#b80f1d" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <div className="navbar__logo-text-wrapper">
            <span className="navbar__logo-text">LifeStream</span>
            <span className="navbar__logo-subtext">Give Blood. <span className="highlight-red">Save Lives.</span></span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={`navbar__link${location.pathname === l.to || (l.to === '/' && location.pathname === '') ? ' navbar__link--active' : ''}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className="navbar__auth">
          {user ? (
            <div className="navbar__user">
              <div className="navbar__user-chip">
                <div className="navbar__user-avatar">{user.name?.[0]?.toUpperCase()}</div>
                <span className="navbar__user-name">{user.name}</span>
                <ChevronDown size={14} />
              </div>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/register" className="btn btn-primary btn-sm register-btn">Register Now</Link>
          )}
        </div>

        {/* Hamburger */}
        <button className="navbar__hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={22} color="#111827" /> : <Menu size={22} color="#111827" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${isOpen ? ' navbar__drawer--open' : ''}`}>
        {navLinks.map(l => (
          <Link key={l.to} to={l.to} className={`navbar__drawer-link${location.pathname === l.to ? ' active' : ''}`}>
            {l.label}
          </Link>
        ))}
        <div className="navbar__drawer-auth">
          {user ? (
            <button onClick={handleLogout} className="btn btn-secondary w-full">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link to="/register" className="btn btn-primary w-full">Register Now</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
