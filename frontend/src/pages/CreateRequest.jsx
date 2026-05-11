import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import api from '../services/api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const URGENCY_LEVELS = [
  { value: 'Normal',   label: 'Normal',   icon: CheckCircle,     desc: 'Within 1–3 days' },
  { value: 'Urgent',   label: 'Urgent',   icon: AlertTriangle,   desc: 'Within 48 hours' },
  { value: 'Critical', label: 'Critical', icon: AlertTriangle,   desc: 'Immediately needed' },
];

const getUrgencyClasses = (value, selectedValue) => {
  const isSelected = value === selectedValue;
  if (value === 'Normal') return isSelected ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-500 bg-white hover:border-emerald-400 hover:text-emerald-500 hover:bg-emerald-50/50';
  if (value === 'Urgent') return isSelected ? 'border-amber-500 text-amber-600 bg-amber-50' : 'border-gray-200 text-gray-500 bg-white hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50/50';
  if (value === 'Critical') return isSelected ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-200 text-gray-500 bg-white hover:border-red-400 hover:text-red-500 hover:bg-red-50/50';
  return '';
};

const CreateRequest = () => {
  const [form, setForm] = useState({ bloodGroup: 'A+', units: 1, urgency: 'Normal', location: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/requests/create', form);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    } catch {
      alert('Failed to submit. Please make sure you are logged in.');
    } finally { setLoading(false); }
  };

  if (success) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="w-full max-w-[460px] p-16 text-center rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl flex flex-col items-center gap-4 animate-[fadeUp_0.5s_ease_both]">
        <CheckCircle size={56} className="text-emerald-500" />
        <h2 className="text-3xl font-bold text-gray-900">Request Submitted!</h2>
        <p className="text-gray-500">Your blood request has been posted. Nearby donors will be notified.</p>
        <p className="text-sm text-gray-400 mt-2">Redirecting to home…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="w-full max-w-[620px] p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl animate-[fadeUp_0.5s_ease_both]">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-200">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b80f1d] to-[#66040c] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner"><Droplet size={26} fill="currentColor" /></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Request Blood</h1>
            <p className="text-sm text-gray-500">Fill in the details below. Donors will be matched instantly.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Blood Group */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-900">Blood Group Needed</label>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
              {BLOOD_GROUPS.map(bg => (
                <label key={bg} className={`flex items-center justify-center p-2.5 border rounded-lg font-bold text-sm cursor-pointer transition-all ${form.bloodGroup === bg ? 'border-[#b80f1d] bg-red-50 text-[#b80f1d]' : 'border-gray-200 text-gray-500 bg-white hover:border-red-400 hover:text-[#b80f1d] hover:bg-red-50'}`}>
                  <input type="radio" name="bloodGroup" value={bg}
                    checked={form.bloodGroup === bg}
                    onChange={e => set('bloodGroup')(e.target.value)} className="hidden" />
                  {bg}
                </label>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-900">Urgency Level</label>
            <div className="flex flex-col sm:flex-row gap-3">
              {URGENCY_LEVELS.map(({ value, label, icon: Icon, desc }) => (
                <label key={value} className={`flex-1 flex flex-col items-center gap-1.5 p-4 border rounded-xl cursor-pointer transition-all text-center ${getUrgencyClasses(value, form.urgency)}`}>
                  <input type="radio" name="urgency" value={value}
                    checked={form.urgency === value}
                    onChange={e => set('urgency')(e.target.value)} className="hidden" />
                  <Icon size={24} />
                  <span className="text-sm font-bold">{label}</span>
                  <span className="text-xs opacity-80">{desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Units + Location row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-semibold text-gray-900" htmlFor="units">Units Needed</label>
              <input id="units" type="number" min={1} max={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                value={form.units}
                onChange={e => set('units')(parseInt(e.target.value))} />
            </div>
            <div className="flex flex-col gap-2 flex-[2]">
              <label className="text-sm font-semibold text-gray-900" htmlFor="req-location">Hospital / Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input id="req-location" type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                  placeholder="e.g., Dhaka Medical College Hospital"
                  value={form.location}
                  onChange={e => set('location')(e.target.value)}
                  required />
              </div>
            </div>
          </div>

          <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all w-full mt-2" disabled={loading}>
            {loading
              ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              : `Submit ${form.urgency === 'Critical' ? '🚨' : '🩸'} Request`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
