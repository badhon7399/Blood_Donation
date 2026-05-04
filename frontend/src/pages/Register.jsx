import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, AlertCircle, Droplet, Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import registerHero from '../assets/bg_hand.png';

const ROLES = [
  { value: 'donor',     label: '🩸 I want to Donate Blood' },
  { value: 'recipient', label: '🏥 I need Blood (Recipient)' },
];

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'donor' });
  const [showPwd, setShowPwd] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const set = (k) => (e) => setFormData(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e) => {o
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      await register(formData);
      setSuccess('Account created! Redirecting to login…');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-page--register">
      <div className="register-shell">
        <div className="register-visual">
          <div className="register-visual__badge">
            <Droplet size={18} fill="currentColor" />
            Trusted donor network
          </div>
          <img src={registerHero} alt="Blood donation drop" className="register-visual__image" />
          <div className="register-visual__content">
            <h2>Join a smarter way to save lives.</h2>
            <p>Create your profile, connect with urgent needs, and help your community respond faster.</p>
            <div className="register-stats">
              <span><strong>10k+</strong> Donors</span>
              <span><strong>24/7</strong> Requests</span>
              <span><strong>Safe</strong> Network</span>
            </div>
          </div>
        </div>

        <div className="auth-card auth-card--wide glass register-card">
          <div className="auth-brand">
            <div className="auth-brand__icon"><Droplet size={22} fill="currentColor" /></div>
            <span className="auth-brand__text">BloodLink</span>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">Join Bangladesh's largest blood donor network — free forever</p>

          {error   && <div className="alert alert-error">  <AlertCircle size={16} /> {error}   </div>}
          {success && <div className="alert alert-success"><AlertCircle size={16} /> {success} </div>}

          <form onSubmit={handleSubmit} className="auth-form">
          {/* Role pills */}
          <div className="form-group">
            <label className="form-label">I am a…</label>
            <div className="role-pills">
              {ROLES.map(r => (
                <label key={r.value} className={`role-pill${formData.role === r.value ? ' selected' : ''}`}>
                  <input type="radio" name="role" value={r.value} checked={formData.role === r.value} onChange={set('role')} />
                  {r.label}
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <div className="input-icon-wrap">
              <User size={16} className="input-icon" />
              <input id="reg-name" type="text" className="form-control form-control--icon"
                placeholder="Arif Hossain" value={formData.name} onChange={set('name')} required />
            </div>
          </div>

          {/* Two column — email & phone */}
          <div className="auth-row">
            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email</label>
              <div className="input-icon-wrap">
                <Mail size={16} className="input-icon" />
                <input id="reg-email" type="email" className="form-control form-control--icon"
                  placeholder="you@example.com" value={formData.email} onChange={set('email')} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-phone">Phone</label>
              <div className="input-icon-wrap">
                <Phone size={16} className="input-icon" />
                <input id="reg-phone" type="tel" className="form-control form-control--icon"
                  placeholder="01700-000000" value={formData.phone} onChange={set('phone')} required />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input id="reg-password" type={showPwd ? 'text' : 'password'}
                className="form-control form-control--icon form-control--icon-r"
                placeholder="Minimum 6 characters" value={formData.password} onChange={set('password')}
                required minLength={6} />
              <button type="button" className="input-icon-btn" onClick={() => setShowPwd(!showPwd)} tabIndex={-1}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>
            {loading ? <><span className="btn-spinner" /> Creating account…</> : 'Create Account'}
          </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
