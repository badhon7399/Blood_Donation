import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplet, MapPin, Activity, ToggleLeft, ToggleRight, ChevronRight, AlertCircle } from 'lucide-react';
import api from '../services/api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donorProfile, setDonorProfile] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ bloodGroup: 'A+', location: '' });

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

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4 text-gray-500">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#b80f1d] rounded-full animate-spin" />
      <p>Loading your dashboard…</p>
    </div>
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 pt-12 pb-20">
      {/* ── Header ───────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-sm font-bold text-[#b80f1d] uppercase tracking-wider mb-2">My Dashboard</p>
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-gray-900 mb-1">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-gray-500">Manage your donor profile and track impact.</p>
        </div>
        <Link to="/search" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:text-[#b80f1d] transition-colors shadow-sm">
          Browse Donors <ChevronRight size={16} />
        </Link>
      </div>

      {!donorProfile ? (
        /* ── Setup Profile ─────────────────── */
        <div className="flex justify-center">
          <div className="w-full max-w-[560px] p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-[#b80f1d] mx-auto mb-5"><Droplet size={32} /></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Donor Profile</h2>
            <p className="text-gray-500 mb-8">Enter your blood group and location so recipients can find you.</p>

            <form onSubmit={registerDonor} className="flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="bloodGroup">Your Blood Group</label>
                <div className="grid grid-cols-4 gap-2">
                  {BLOOD_GROUPS.map(bg => (
                    <label key={bg} className={`flex items-center justify-center p-2.5 border rounded-lg font-bold text-sm cursor-pointer transition-all ${form.bloodGroup === bg ? 'border-[#b80f1d] bg-red-50 text-[#b80f1d]' : 'border-gray-200 text-gray-500 bg-white hover:border-red-400 hover:text-[#b80f1d] hover:bg-red-50'}`}>
                      <input type="radio" name="bloodGroup" value={bg}
                        checked={form.bloodGroup === bg}
                        onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))} className="hidden" />
                      {bg}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900" htmlFor="location">Your District / City</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input id="location" type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                    placeholder="e.g., Dhaka, Chittagong…"
                    value={form.location}
                    onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                    required />
                </div>
              </div>

              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all w-full mt-2" disabled={saving}>
                {saving ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</> : '🩸 Register as Donor'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ── Profile View ──────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Profile card */}
          <div className="p-8 rounded-3xl lg:row-span-2 bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b80f1d] to-[#66040c] flex items-center justify-center text-2xl font-extrabold text-white shrink-0 shadow-inner">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
              </div>
            </div>

            <div className="h-px bg-gray-200 mb-6" />

            <div className="flex flex-col gap-4 mb-8 flex-grow">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">Blood Group</span>
                <span className="px-2.5 py-1 bg-red-50 border border-red-200 rounded-full text-[#b80f1d] text-sm font-bold shadow-sm">{donorProfile.bloodGroup}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500"><MapPin size={14} /> Location</span>
                <span className="text-sm font-semibold text-gray-900">{donorProfile.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">Status</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${donorProfile.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${donorProfile.status === 'Available' ? 'bg-emerald-500' : 'bg-red-500'}`} /> {donorProfile.status}
                </span>
              </div>
            </div>

            <button
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all w-full mt-auto ${donorProfile.status === 'Available' ? 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50' : 'bg-[#b80f1d] text-white hover:bg-[#990a16] shadow-md hover:shadow-lg'}`}
              onClick={toggleStatus}
              disabled={saving}
            >
              {donorProfile.status === 'Available'
                ? <><ToggleRight size={20} /> Set as Not Available</>
                : <><ToggleLeft  size={20} /> Set as Available</>
              }
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl flex flex-col items-start gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-50 text-red-500">
                <Droplet size={24} />
              </div>
              <div className="text-3xl font-extrabold tracking-tight text-gray-900 mt-1">0</div>
              <div className="text-sm font-medium text-gray-500">Total Donations</div>
            </div>
            <div className="p-7 rounded-3xl flex flex-col items-start gap-3 bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-500">
                <Activity size={24} />
              </div>
              <div className="text-3xl font-extrabold tracking-tight text-gray-900 mt-1">—</div>
              <div className="text-sm font-medium text-gray-500">Last Donation</div>
            </div>
          </div>

          {/* History */}
          <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Donation History</h3>
            <div className="flex flex-col items-center gap-3 p-8 text-center text-gray-400">
              <AlertCircle size={32} />
              <p className="text-sm font-medium text-gray-500 max-w-[250px]">No donations recorded yet. Your history will appear here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
