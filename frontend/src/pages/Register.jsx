import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, AlertCircle, Droplet, Eye, EyeOff } from 'lucide-react';
import './Auth.css';
import registerHero from '../assets/bg_hand.png';

const ROLES = [
  { value: 'donor', label: '🩸 I want to Donate Blood' },
  { value: 'recipient', label: '🏥 I need Blood (Recipient)' },
];

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'donor' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState({ register: false, login: false });
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState({ register: false, login: false });
  const [isLoginView, setIsLoginView] = useState(false);
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const set = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));
  const setLogin = (key) => (e) => setLoginData(prev => ({ ...prev, [key]: e.target.value }));
  const togglePwd = (key) => setShowPwd(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(prev => ({ ...prev, register: true }));

    try {
      await register(formData);
      setLoginData({ email: formData.email, password: '' });
      setSuccess('Account created! You can log in now.');
      setTimeout(() => setIsLoginView(true), 650);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(prev => ({ ...prev, register: false }));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(prev => ({ ...prev, login: true }));

    try {
      await login(loginData.email, loginData.password);
      navigate('/donor-dashboard');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, login: false }));
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

        <div className={`auth-flip${isLoginView ? ' is-flipped' : ''}`}>
          <div className="auth-flip__inner">
            <section className="auth-card auth-card--wide glass register-card auth-face auth-face--front" aria-hidden={isLoginView}>
              <div className="auth-brand">
                <div className="auth-brand__icon"><Droplet size={22} fill="currentColor" /></div>
                <span className="auth-brand__text">BloodLink</span>
              </div>

              <h1 className="auth-title">Create your account</h1>
              <p className="auth-sub">Join Bangladesh&apos;s largest blood donor network - free forever</p>

              {error && <div className="alert alert-error"><AlertCircle size={16} /> {error}</div>}
              {success && <div className="alert alert-success"><AlertCircle size={16} /> {success}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label className="form-label">I am a...</label>
                  <div className="role-pills">
                    {ROLES.map(role => (
                      <label key={role.value} className={`role-pill${formData.role === role.value ? ' selected' : ''}`}>
                        <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={set('role')} />
                        {role.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">Full Name</label>
                  <div className="input-icon-wrap">
                    <User size={16} className="input-icon" />
                    <input id="reg-name" type="text" className="form-control form-control--icon" placeholder="Arif Hossain" value={formData.name} onChange={set('name')} required />
                  </div>
                </div>

                <div className="auth-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-email">Email</label>
                    <div className="input-icon-wrap">
                      <Mail size={16} className="input-icon" />
                      <input id="reg-email" type="email" className="form-control form-control--icon" placeholder="you@example.com" value={formData.email} onChange={set('email')} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-phone">Phone</label>
                    <div className="input-icon-wrap">
                      <Phone size={16} className="input-icon" />
                      <input id="reg-phone" type="tel" className="form-control form-control--icon" placeholder="01700-000000" value={formData.phone} onChange={set('phone')} required />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">Password</label>
                  <div className="input-icon-wrap">
                    <Lock size={16} className="input-icon" />
                    <input
                      id="reg-password"
                      type={showPwd.register ? 'text' : 'password'}
                      className="form-control form-control--icon form-control--icon-r"
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={set('password')}
                      required
                      minLength={6}
                    />
                    <button type="button" className="input-icon-btn" onClick={() => togglePwd('register')} tabIndex={-1}>
                      {showPwd.register ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading.register}>
                  {loading.register ? <><span className="btn-spinner" /> Creating account...</> : 'Create Account'}
                </button>
              </form>

              <p className="auth-footer">
                Already have an account?{' '}
                <button type="button" className="auth-link-button" onClick={() => setIsLoginView(true)}>
                  Login here
                </button>
              </p>
            </section>

            <section className="auth-card auth-card--wide glass register-card auth-face auth-face--back" aria-hidden={!isLoginView}>
              <div className="auth-brand">
                <div className="auth-brand__icon"><Droplet size={22} fill="currentColor" /></div>
                <span className="auth-brand__text">BloodLink</span>
              </div>

              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-sub">Login to access your donor account</p>

              {loginError && (
                <div className="alert alert-error">
                  <AlertCircle size={16} /> {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="flip-login-email">Email Address</label>
                  <div className="input-icon-wrap">
                    <Mail size={16} className="input-icon" />
                    <input
                      id="flip-login-email"
                      type="email"
                      className="form-control form-control--icon"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={setLogin('email')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="flip-login-password">Password</label>
                  <div className="input-icon-wrap">
                    <Lock size={16} className="input-icon" />
                    <input
                      id="flip-login-password"
                      type={showPwd.login ? 'text' : 'password'}
                      className="form-control form-control--icon form-control--icon-r"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={setLogin('password')}
                      required
                    />
                    <button type="button" className="input-icon-btn" onClick={() => togglePwd('login')} tabIndex={-1}>
                      {showPwd.login ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading.login}>
                  {loading.login ? <><span className="btn-spinner" /> Logging in...</> : 'Login'}
                </button>
              </form>

              <p className="auth-footer">
                New to BloodLink?{' '}
                <button type="button" className="auth-link-button" onClick={() => setIsLoginView(false)}>
                  Create one free
                </button>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
