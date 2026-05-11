import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, AlertCircle, Droplet, Eye, EyeOff } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-64px)] p-3 md:p-6 bg-[radial-gradient(circle_at_10%_14%,rgba(239,68,68,0.16),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(252,165,165,0.24),transparent_32%),radial-gradient(circle_at_72%_88%,rgba(193,18,31,0.12),transparent_34%),linear-gradient(135deg,#fff5f5_0%,#ffffff_45%,#ffe4e6_100%)] relative flex items-stretch">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(193, 18, 31, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(193, 18, 31, 0.045) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'linear-gradient(to bottom, black, transparent 80%)' }}></div>
      <div className="w-full max-w-[1240px] lg:h-[min(740px,100%)] min-h-[700px] m-auto grid grid-cols-1 lg:grid-cols-[minmax(420px,0.95fr)_minmax(460px,1fr)] border border-[#c1121f]/10 rounded-[24px] lg:rounded-[34px] overflow-hidden bg-white/70 shadow-[0_30px_90px_rgba(87,22,33,0.16)] backdrop-blur-md relative z-10 animate-[fadeUp_0.55s_ease_both]">
        <div className="p-6 md:p-8 relative overflow-hidden flex flex-col justify-between bg-[linear-gradient(145deg,rgba(95,7,17,0.96),rgba(193,18,31,0.88))] bg-cover bg-center text-white min-h-[360px] lg:min-h-0">
          {/* Background circles */}
          <div className="absolute w-[520px] h-[520px] -right-[160px] top-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.24),transparent_68%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#24050a]/70"></div>
          
          <div className="relative z-10 w-fit inline-flex items-center gap-2 px-3.5 py-2 border border-white/20 rounded-full bg-white/10 shadow-[0_16px_38px_rgba(0,0,0,0.16)] backdrop-blur-md text-sm font-bold">
            <Droplet size={18} fill="currentColor" />
            Trusted donor network
          </div>
          
          <img src={registerHero} alt="Blood donation drop" className="relative z-10 w-[260px] lg:w-[min(78%,360px)] self-center filter drop-shadow-[0_34px_46px_rgba(0,0,0,0.28)] animate-[floatSoft_6s_ease-in-out_infinite] mt-4 absolute lg:static right-[-2rem] bottom-[-2rem] opacity-40 lg:opacity-100" />
          
          <div className="relative z-10 max-w-[560px] lg:max-w-[520px]">
            <h2 className="text-white text-[clamp(2rem,3vw,2.8rem)] leading-[1.05] mb-3 font-bold">Join a smarter way to save lives.</h2>
            <p className="text-white/80 text-base max-w-[480px]">Create your profile, connect with urgent needs, and help your community respond faster.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              <span className="p-3 border border-white/10 rounded-xl bg-white/10 text-white/80 text-[0.78rem] backdrop-blur-md">
                <strong className="block text-white text-[1.05rem] mb-0.5 font-bold">10k+</strong> Donors
              </span>
              <span className="p-3 border border-white/10 rounded-xl bg-white/10 text-white/80 text-[0.78rem] backdrop-blur-md">
                <strong className="block text-white text-[1.05rem] mb-0.5 font-bold">24/7</strong> Requests
              </span>
              <span className="p-3 border border-white/10 rounded-xl bg-white/10 text-white/80 text-[0.78rem] backdrop-blur-md">
                <strong className="block text-white text-[1.05rem] mb-0.5 font-bold">Safe</strong> Network
              </span>
            </div>
          </div>
        </div>

        <div className="h-full min-w-0 [perspective:1600px] [transform-style:preserve-3d]">
          <div className={`relative w-full h-full min-h-[780px] lg:min-h-0 [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoginView ? '[transform:rotateY(180deg)]' : ''}`}>
            
            {/* Front: Register */}
            <section className={`absolute inset-0 [backface-visibility:hidden] p-6 lg:p-[clamp(1.75rem,3.4vw,2.8rem)] flex flex-col justify-center bg-[radial-gradient(circle_at_100%_0%,rgba(245,158,11,0.12),transparent_28%),rgba(255,255,255,0.92)]`} aria-hidden={isLoginView}>
              <div className="flex items-center gap-2 mb-5 font-extrabold text-[1.2rem] text-gray-900 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-[#b80f1d] to-[#66040c] rounded-lg flex items-center justify-center text-white">
                  <Droplet size={22} fill="currentColor" />
                </div>
                <span>BloodLink</span>
              </div>

              <h1 className="text-[clamp(2rem,3vw,2.65rem)] text-left mb-2 font-bold text-gray-900 leading-tight">Create your account</h1>
              <p className="text-[0.9rem] text-gray-500 text-left mb-7 max-w-[440px] leading-relaxed">Join Bangladesh's largest blood donor network - free forever</p>

              {error && <div className="flex items-start gap-3 p-4 mb-4 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm"><AlertCircle size={16} /> {error}</div>}
              {success && <div className="flex items-start gap-3 p-4 mb-4 rounded-lg bg-green-50 text-green-800 border border-green-200 text-sm"><AlertCircle size={16} /> {success}</div>}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900">I am a...</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {ROLES.map(role => (
                      <label key={role.value} className={`flex-1 min-w-[160px] flex items-center justify-center p-3 border rounded-lg cursor-pointer text-sm font-semibold transition-all text-center ${formData.role === role.value ? 'border-[#b80f1d] bg-gradient-to-br from-red-50 to-orange-50 text-[#c1121f] shadow-[0_12px_26px_rgba(193,18,31,0.09)]' : 'border-gray-200 text-gray-500 bg-white hover:border-red-200 hover:text-gray-900 hover:bg-orange-50'}`}>
                        <input type="radio" name="role" value={role.value} checked={formData.role === role.value} onChange={set('role')} className="hidden" />
                        {role.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900" htmlFor="reg-name">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input id="reg-name" type="text" className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10 shadow-[0_10px_24px_rgba(15,23,42,0.04)]" placeholder="Arif Hossain" value={formData.name} onChange={set('name')} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-900" htmlFor="reg-email">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input id="reg-email" type="email" className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10 shadow-[0_10px_24px_rgba(15,23,42,0.04)]" placeholder="you@example.com" value={formData.email} onChange={set('email')} required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-900" htmlFor="reg-phone">Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input id="reg-phone" type="tel" className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10 shadow-[0_10px_24px_rgba(15,23,42,0.04)]" placeholder="01700-000000" value={formData.phone} onChange={set('phone')} required />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900" htmlFor="reg-password">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="reg-password"
                      type={showPwd.register ? 'text' : 'password'}
                      className="w-full min-h-[48px] pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={set('password')}
                      required
                      minLength={6}
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-md" onClick={() => togglePwd('register')} tabIndex={-1}>
                      {showPwd.register ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all w-full mt-2" disabled={loading.register}>
                  {loading.register ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</> : 'Create Account'}
                </button>
              </form>

              <p className="text-center mt-6 text-sm text-gray-500">
                Already have an account?{' '}
                <button type="button" className="text-[#b80f1d] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer" onClick={() => setIsLoginView(true)}>
                  Login here
                </button>
              </p>
            </section>

            {/* Back: Login */}
            <section className={`absolute inset-0 [backface-visibility:hidden] p-6 lg:p-[clamp(1.75rem,3.4vw,2.8rem)] flex flex-col justify-center sm:justify-start lg:justify-center bg-[radial-gradient(circle_at_100%_0%,rgba(245,158,11,0.12),transparent_28%),rgba(255,255,255,0.92)] [transform:rotateY(180deg)]`} aria-hidden={!isLoginView}>
              <div className="flex items-center gap-2 mb-5 font-extrabold text-[1.2rem] text-gray-900 justify-start mt-4 sm:mt-0 lg:mt-0">
                <div className="w-8 h-8 bg-gradient-to-br from-[#b80f1d] to-[#66040c] rounded-lg flex items-center justify-center text-white">
                  <Droplet size={22} fill="currentColor" />
                </div>
                <span>BloodLink</span>
              </div>

              <h1 className="text-[clamp(2rem,3vw,2.65rem)] text-left mb-2 font-bold text-gray-900 leading-tight">Welcome back</h1>
              <p className="text-[0.9rem] text-gray-500 text-left mb-7 max-w-[440px] leading-relaxed">Login to access your donor account</p>

              {loginError && (
                <div className="flex items-start gap-3 p-4 mb-4 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm">
                  <AlertCircle size={16} /> {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900" htmlFor="flip-login-email">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="flip-login-email"
                      type="email"
                      className="w-full min-h-[48px] pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={setLogin('email')}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-900" htmlFor="flip-login-password">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      id="flip-login-password"
                      type={showPwd.login ? 'text' : 'password'}
                      className="w-full min-h-[48px] pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={setLogin('password')}
                      required
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-md" onClick={() => togglePwd('login')} tabIndex={-1}>
                      {showPwd.login ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all w-full mt-2" disabled={loading.login}>
                  {loading.login ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Logging in...</> : 'Login'}
                </button>
              </form>

              <p className="text-center mt-6 text-sm text-gray-500">
                New to BloodLink?{' '}
                <button type="button" className="text-[#b80f1d] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer" onClick={() => setIsLoginView(false)}>
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
