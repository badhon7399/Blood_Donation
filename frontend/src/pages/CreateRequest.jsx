import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ClipboardList, Droplet, MapPin, Radio, Shield } from 'lucide-react';
import api from '../services/api';
import {
  getDistrictCoordinates,
  isInsideBangladesh,
  resolveDistrictFromText,
  saveStoredBloodRequest,
} from '../data/liveMapData';
import { useAuth } from '../context/useAuth';

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

const urgencyTime = {
  Normal: 'Within 1-3 days',
  Urgent: 'Within 48 hours',
  Critical: 'Immediately needed',
};

const geocodeLocation = async (location) => {
  const query = `${location}, Bangladesh`;
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=bd&q=${encodeURIComponent(query)}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) throw new Error('Location lookup failed');

  const [result] = await response.json();
  if (!result) throw new Error('Location was not found');

  const coordinates = { lat: Number(result.lat), lng: Number(result.lon) };
  if (!isInsideBangladesh(coordinates)) throw new Error('Location is outside Bangladesh');

  return {
    coordinates,
    displayName: result.display_name,
  };
};

const CreateRequest = () => {
  const [form, setForm] = useState({ bloodGroup: 'A+', units: 1, urgency: 'Normal', location: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [locating, setLocating] = useState(false);
  const [locationSource, setLocationSource] = useState('');
  const { user } = useAuth();

  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }));
  const previewItems = [
    { label: 'Blood Group', value: form.bloodGroup },
    { label: 'Units', value: form.units },
    { label: 'Urgency', value: form.urgency },
    { label: 'Location', value: form.location || 'Not set' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in before submitting a blood request.');
      return;
    }
    setLoading(true);
    setLocating(true);
    setError('');
    setSuccess('');
    setLocationSource('');
    try {
      let resolvedLocation;
      try {
        resolvedLocation = await geocodeLocation(form.location);
        setLocationSource('Location matched automatically with OpenStreetMap.');
      } catch {
        const district = resolveDistrictFromText(form.location);
        resolvedLocation = {
          coordinates: getDistrictCoordinates(district, form.location, Date.now()),
          displayName: `${form.location}, Bangladesh`,
        };
        setLocationSource(`Exact lookup was unavailable, so the marker was placed near ${district}.`);
      } finally {
        setLocating(false);
      }

      const district = resolveDistrictFromText(resolvedLocation.displayName);
      const requestPayload = {
        ...form,
        title: `${form.bloodGroup} Blood Needed`,
        requesterName: user.name || 'LifeStream user',
        contact: user.email || user.phone || 'Account contact',
        hospital: form.location,
        city: district,
        area: form.location,
        time: urgencyTime[form.urgency],
        latitude: resolvedLocation.coordinates.lat,
        longitude: resolvedLocation.coordinates.lng,
      };
      const response = await api.post('/requests/create', requestPayload);
      const id = response.data?.id || `local-${Date.now()}`;
      const nextRequest = {
        ...requestPayload,
        id,
        requester: requestPayload.requesterName,
        status: 'Active',
        coordinates: resolvedLocation.coordinates,
      };

      saveStoredBloodRequest(nextRequest);
      setSuccess('Request submitted. Donors can now find this need on the Blood Needs page.');
      setForm({ bloodGroup: 'A+', units: 1, urgency: 'Normal', location: '' });
    } catch {
      setError('Failed to submit. Please make sure you are logged in, then try again.');
      setLocating(false);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-white to-red-50 px-6 py-8 lg:px-12">
      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b80f1d]">Request Blood</p>
              <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">Create a clear request donors can act on.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
                Add the blood group, unit count, urgency, and hospital location. The location is resolved automatically on submit and published for donors on the Blood Needs page.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-bold text-[#b80f1d] shadow-sm">
              <Radio size={14} className="animate-pulse" />
              Publishes to Blood Needs
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-gray-200/70 bg-white/90 p-8 shadow-xl backdrop-blur-md animate-[fadeScaleIn_0.5s_ease_both]">
            {/* Header */}
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-200">
              <div className="w-14 h-14 bg-gradient-to-br from-[#b80f1d] to-[#66040c] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner"><Droplet size={26} fill="currentColor" /></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Request Blood</h2>
                <p className="text-sm text-gray-500">Fill in the details below. The request will stay on this page after submission.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {success && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{success}</span>
                  </div>
                  {locationSource && <p className="mt-2 text-xs font-bold text-emerald-700/80">{locationSource}</p>}
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  <div className="flex items-start gap-2">
                    {!user && <Shield size={16} className="mt-0.5 shrink-0" />}
                    <span>{error}</span>
                  </div>
                  {!user && (
                    <Link to="/login" className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-[#b80f1d] shadow-sm">
                      Login to continue
                    </Link>
                  )}
                </div>
              )}

              {/* Blood Group */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">Blood Group Needed</label>
                <div className="grid grid-cols-4 gap-2">
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
                    onChange={e => set('units')(parseInt(e.target.value, 10) || 1)} />
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
                  <p className="text-xs font-semibold text-gray-400">
                    Location is matched automatically after submission.
                  </p>
                </div>
              </div>

              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all w-full mt-2" disabled={loading}>
                {loading
                  ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {locating ? 'Locating...' : 'Submitting...'}</>
                  : `Submit ${form.urgency} Request`}
              </button>
            </form>
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <div className="rounded-[28px] border border-red-100 bg-[#3b0308] p-6 text-white shadow-[0_24px_70px_rgba(102,4,12,0.16)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-red-100">
              <ClipboardList size={22} />
            </div>
            <h2 className="text-2xl font-extrabold leading-tight">What donors will see</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Your request appears on the Blood Needs page with urgency, blood group, units, hospital location, and your account contact.
            </p>
            <Link to="/blood-needs" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#b80f1d] transition-all hover:-translate-y-0.5">
              View Blood Needs
            </Link>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-gray-900">Request Summary</h3>
            <div className="mt-5 space-y-3">
              {previewItems.map(item => (
                <div key={item.label} className="flex items-start justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="text-xs font-bold uppercase text-gray-400">{item.label}</span>
                  <span className="max-w-[180px] text-right text-sm font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-gray-900">Before submitting</h3>
            <div className="mt-4 space-y-3 text-sm font-semibold text-gray-600">
              {[
                'Use the hospital or clinic name if possible.',
                'Set urgency honestly so donors can prioritize.',
                'Keep your account email reachable after posting.',
              ].map(item => (
                <div key={item} className="flex gap-2">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CreateRequest;
