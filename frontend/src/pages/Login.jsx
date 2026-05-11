import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Droplet, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/donor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="w-full max-w-[440px] p-10 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-xl animate-[fadeUp_0.5s_ease_both]">

        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-7 text-gray-900 font-extrabold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-[#b80f1d] to-[#66040c] rounded-lg flex items-center justify-center text-white">
            <Droplet size={18} fill="currentColor" />
          </div>
          <span>BloodLink</span>
        </div>

        <h1 className="text-3xl text-center mb-1 text-gray-900 font-bold">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center mb-7">Login to access your donor account</p>

        {error && (
          <div className="flex items-start gap-3 p-4 mb-4 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm">
            <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-900" htmlFor="login-email">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                id="login-email"
                type="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-900" htmlFor="login-password">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                id="login-password"
                type={showPwd ? 'text' : 'password'}
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-md" onClick={() => setShowPwd(!showPwd)} tabIndex={-1}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all w-full mt-2" disabled={loading}>
            {loading ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Logging in…</> : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-[#b80f1d] font-semibold hover:underline">Create one free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
