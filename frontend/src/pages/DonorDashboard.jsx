import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Droplet, MapPin, Activity, Search, AlertCircle,
  CheckCircle2, XCircle, Clock, Heart, Zap, Shield,
  ChevronRight, Edit3,
} from 'lucide-react';
import api from '../services/api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const BG_COLORS = {
  'A+':  '#e11d48', 'A-': '#ea580c',
  'B+':  '#2563eb', 'B-': '#7c3aed',
  'O+':  '#16a34a', 'O-': '#0891b2',
  'AB+': '#c026d3', 'AB-': '#d97706',
};

/* ── Stat card ──────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 overflow-hidden group hover:shadow-md transition-shadow">
    <div className="absolute right-0 top-0 bottom-0 w-1 rounded-l-full" style={{ background: color }} />
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg }}>
      <Icon size={22} style={{ color }} />
    </div>
    <div>
      <div className="text-2xl font-extrabold text-gray-900 leading-none">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  </div>
);

/* ── Main component ─────────────────────────── */
const DonorDashboard = () => {
  const { user }                        = useAuth();
  const [donorProfile, setDonorProfile] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [form, setForm]                 = useState({ bloodGroup: 'A+', location: '' });

  useEffect(() => {
    api.get('/donors/me')
      .then(r => setDonorProfile(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const registerDonor = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const r = await api.post('/donors/register', { ...form, status: 'Available' });
      setDonorProfile(r.data);
    } catch (err) {
      alert(err.response?.data || 'Could not register. Check backend connection.');
    } finally { setSaving(false); }
  };

  const toggleStatus = async () => {
    const next = donorProfile.status === 'Available' ? 'Not Available' : 'Available';
    setSaving(true);
    try {
      await api.put(`/donors/status?status=${next}`);
      setDonorProfile(prev => ({ ...prev, status: next }));
    } catch { alert('Could not update status.'); }
    finally { setSaving(false); }
  };

  /* ── Loading ── */
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-[#b80f1d] rounded-full animate-spin" />
      <p className="text-sm text-gray-400 font-medium">Loading your dashboard…</p>
    </div>
  );

  const isAvailable = donorProfile?.status === 'Available';
  const bgColor     = donorProfile ? (BG_COLORS[donorProfile.bloodGroup] || '#b80f1d') : '#b80f1d';

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-slate-50">

      {/* ── Top hero banner ─────────────────── */}
      <div className="w-full bg-gradient-to-br from-[#b80f1d] via-[#9b0c18] to-[#66040c] text-white">
        <div className="w-full px-6 lg:px-12 py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-2">Donor Dashboard</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
                Welcome back, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-red-100/80 text-sm">
                {donorProfile ? 'Your profile is active. Thank you for saving lives.' : 'Complete your profile to start saving lives.'}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap mt-1">
              <Link to="/search"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all">
                <Search size={15} /> Find Donors
              </Link>
              <Link to="/request"
                className="inline-flex items-center gap-2 bg-white text-[#b80f1d] text-sm font-bold px-4 py-2.5 rounded-full shadow hover:shadow-md transition-all">
                <Heart size={15} fill="currentColor" /> Request Blood
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 py-8">

        {!donorProfile ? (
          /* ── SETUP PROFILE ───────────────────────────── */
          <div className="max-w-[580px] mx-auto">
            {/* Prompt card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-white px-8 pt-8 pb-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-[#b80f1d] shrink-0">
                  <Droplet size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Complete Your Profile</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Enter your blood group and location so recipients can find you.</p>
                </div>
              </div>

              <form onSubmit={registerDonor} className="px-8 py-7 flex flex-col gap-6">
                {/* Blood group */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">Select Your Blood Group</label>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_GROUPS.map(bg => (
                      <label key={bg}
                        className={`flex items-center justify-center p-3 border-2 rounded-xl font-extrabold text-sm cursor-pointer transition-all ${
                          form.bloodGroup === bg
                            ? 'border-[#b80f1d] bg-red-50 text-[#b80f1d] scale-105 shadow-sm'
                            : 'border-gray-100 text-gray-500 bg-gray-50 hover:border-red-300 hover:text-[#b80f1d]'
                        }`}>
                        <input type="radio" name="bloodGroup" value={bg}
                          checked={form.bloodGroup === bg}
                          onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))}
                          className="hidden" />
                        {bg}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2" htmlFor="location">
                    Your District / City
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input id="location" type="text"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:bg-white focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10 transition-all"
                      placeholder="e.g., Dhaka, Chittagong…"
                      value={form.location}
                      onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                      required />
                  </div>
                </div>

                <button type="submit" disabled={saving}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 text-sm">
                  {saving
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Registering…</>
                    : <><Droplet size={15} fill="currentColor" /> Register as Donor</>}
                </button>
              </form>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Zap,     label: 'Instant Match',   desc: 'Recipients find you immediately', color: '#f59e0b' },
                { icon: Shield,  label: 'Private & Safe',  desc: 'Contact only shown after login',  color: '#3b82f6' },
                { icon: Heart,   label: 'Save Lives',      desc: 'One donation helps up to 3 people', color: '#e11d48' },
              ].map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="text-xs font-bold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* ── PROFILE ACTIVE ──────────────────────────── */
          <div className="flex flex-col gap-6">

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Droplet}       label="Total Donations"  value="0"  color="#e11d48" bg="#fff1f2" />
              <StatCard icon={Clock}         label="Last Donation"    value="—"  color="#f59e0b" bg="#fffbeb" />
              <StatCard icon={CheckCircle2}  label="Lives Impacted"   value="0"  color="#16a34a" bg="#f0fdf4" />
              <StatCard icon={Activity}      label="Requests Matched" value="0"  color="#2563eb" bg="#eff6ff" />
            </div>

            {/* Main content row */}
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">

              {/* ── Profile card ──────────────────────── */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {/* Profile header */}
                <div className="relative px-6 pt-8 pb-6 flex flex-col items-center text-center"
                  style={{ background: `linear-gradient(135deg, ${bgColor}12, ${bgColor}04)` }}>
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-extrabold text-white shadow-xl mb-4"
                    style={{ background: `linear-gradient(135deg, ${bgColor}, ${bgColor}bb)` }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <h2 className="text-xl font-extrabold text-gray-900">{user?.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5 mb-3">{user?.email}</p>

                  {/* Status badge */}
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${
                    isAvailable
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                    {isAvailable ? 'Available to Donate' : 'Not Available'}
                  </span>
                </div>

                {/* Details */}
                <div className="px-6 py-5 flex flex-col gap-3 border-t border-gray-100 flex-1">
                  <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                    <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                      <Droplet size={14} className="text-gray-400" /> Blood Group
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold border" style={{
                      background: `${bgColor}12`,
                      color: bgColor,
                      borderColor: `${bgColor}30`,
                    }}>
                      {donorProfile.bloodGroup}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
                    <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" /> Location
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{donorProfile.location}</span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                      <Shield size={14} className="text-gray-400" /> Role
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {user?.role === 'ROLE_DONOR' ? 'Blood Donor' : 'User'}
                    </span>
                  </div>
                </div>

                {/* Toggle status button */}
                <div className="px-6 pb-6">
                  <button
                    onClick={toggleStatus}
                    disabled={saving}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold border-2 transition-all duration-200 ${
                      isAvailable
                        ? 'border-gray-200 text-gray-600 bg-gray-50 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                        : 'border-[#b80f1d] text-white bg-[#b80f1d] hover:bg-[#990a16] shadow-md'
                    }`}
                  >
                    {saving ? (
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    ) : isAvailable ? (
                      <><XCircle size={17} /> Mark Unavailable</>
                    ) : (
                      <><CheckCircle2 size={17} /> Mark Available</>
                    )}
                  </button>
                </div>
              </div>

              {/* ── Right column ──────────────────────── */}
              <div className="flex flex-col gap-5">

                {/* Quick actions */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { icon: Search,  label: 'Find Donors',    sub: 'Browse nearby donors',    to: '/search',  color: '#2563eb', bg: '#eff6ff' },
                      { icon: Heart,   label: 'Request Blood',  sub: 'Create a blood request',  to: '/request', color: '#e11d48', bg: '#fff1f2' },
                      { icon: Edit3,   label: 'Update Profile', sub: 'Edit your information',   to: '#',        color: '#7c3aed', bg: '#f5f3ff' },
                    ].map(({ icon: Icon, label, sub, to, color, bg }) => (
                      <Link key={label} to={to}
                        className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
                        style={{ background: bg }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${color}18` }}>
                          <Icon size={18} style={{ color }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                        </div>
                        <ChevronRight size={15} className="ml-auto text-gray-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Donation history */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex-1">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-bold text-gray-900">Donation History</h3>
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full font-medium">0 records</span>
                  </div>

                  {/* Empty state */}
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center mb-4">
                      <Droplet size={28} className="text-red-300" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-700 mb-1">No donations yet</h4>
                    <p className="text-xs text-gray-400 max-w-[220px] leading-relaxed">
                      Once you donate blood, your history and impact will appear here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
