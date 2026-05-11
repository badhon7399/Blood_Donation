import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Droplet, User as UserIcon, Phone, X } from 'lucide-react';
import { DUMMY_DONORS } from '../data/dummyDonors';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const LOCATIONS = [...new Set(DUMMY_DONORS.map(d => d.location))].sort();

const bloodGroupColor = (bg) => {
  const map = {
    'A+': '#ef4444', 'A-': '#f97316',
    'B+': '#3b82f6', 'B-': '#8b5cf6',
    'O+': '#10b981', 'O-': '#06b6d4',
    'AB+': '#ec4899', 'AB-': '#f59e0b',
  };
  return map[bg] || '#ef4444';
};

const DonorCard = ({ donor }) => {
  const color = bloodGroupColor(donor.bloodGroup);
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Blood Group badge */}
      <div className="flex items-center justify-between p-5 pb-4 border-b" style={{ borderColor: `${color}30` }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: `${color}18`, color }}>
          <UserIcon size={22} />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold text-sm tracking-wide" style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>
          <Droplet size={13} fill="currentColor" />
          {donor.bloodGroup}
        </div>
      </div>

      <div className="p-4 px-5 flex-1">
        <h3 className="text-[1.0625rem] font-bold text-gray-900 mb-2">{donor.name}</h3>

        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <MapPin size={14} className="text-gray-400" />
            {donor.area}, {donor.location}
          </span>
        </div>

        <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${donor.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' : 'bg-red-50 text-red-500 border border-red-200/50'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${donor.status === 'Available' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
          {donor.status}
        </div>
      </div>

      <button
        className="mx-5 mb-5 w-auto rounded-lg text-sm inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        onClick={() => alert(`Contact info is shown after login.\n${donor.name} — ${donor.bloodGroup}`)}
      >
        <Phone size={15} /> Contact Donor
      </button>
    </article>
  );
};

const FindDonor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bloodGroup, setBloodGroup] = useState(searchParams.get('bloodGroup') || '');
  const [location,   setLocation]   = useState(searchParams.get('location')   || '');
  const [statusFilter, setStatusFilter] = useState('Available');
  const [results, setResults]    = useState([]);
  const [searched, setSearched]  = useState(false);
  const inputRef = useRef(null);

  const runSearch = (bg = bloodGroup, loc = location, status = statusFilter) => {
    let out = DUMMY_DONORS;
    if (bg)  out = out.filter(d => d.bloodGroup === bg);
    if (loc) out = out.filter(d => d.location.toLowerCase().includes(loc.toLowerCase()) || d.area.toLowerCase().includes(loc.toLowerCase()));
    if (status !== 'All') out = out.filter(d => d.status === status);
    setResults(out);
    setSearched(true);
  };

  // Run immediately if URL has params
  useEffect(() => {
    if (searchParams.get('bloodGroup') || searchParams.get('location')) runSearch();
    else { setResults(DUMMY_DONORS.filter(d => d.status === 'Available')); setSearched(true); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ ...(bloodGroup && { bloodGroup }), ...(location && { location }) });
    runSearch();
  };

  const clearSearch = () => {
    setBloodGroup(''); setLocation(''); setSearchParams({});
    setResults(DUMMY_DONORS.filter(d => d.status === 'Available'));
  };

  return (
    <div className="pb-20">

      {/* ── Page Header ─────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm font-bold text-[#b80f1d] uppercase tracking-wider mb-2">Real-Time Search</p>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-3">Find a Blood Donor</h1>
        <p className="text-gray-500 text-[1.05rem]">Search across all 64 districts of Bangladesh. Results update instantly.</p>
      </div>

      {/* ── Search Panel ────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
            {/* Blood Group */}
            <div className="flex-1 min-w-[180px]">
              <label className="text-sm font-semibold text-gray-900 mb-2 block" htmlFor="bg-select">Blood Group</label>
              <div className="relative">
                <Droplet size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                <select
                  id="bg-select"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                  value={bloodGroup}
                  onChange={e => setBloodGroup(e.target.value)}
                >
                  <option value="">Any Blood Group</option>
                  {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="flex-1 min-w-[180px]">
              <label className="text-sm font-semibold text-gray-900 mb-2 block" htmlFor="loc-select">District / Area</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                <select
                  id="loc-select"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                >
                  <option value="">Any Location</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            {/* Availability */}
            <div className="flex-1 min-w-[180px]">
              <label className="text-sm font-semibold text-gray-900 mb-2 block" htmlFor="status-select">Availability</label>
              <div className="relative">
                <select
                  id="status-select"
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] transition-all focus:outline-none focus:border-[#b80f1d] focus:ring-4 focus:ring-[#b80f1d]/10"
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); runSearch(bloodGroup, location, e.target.value); }}
                >
                  <option value="Available">Available Only</option>
                  <option value="All">All Donors</option>
                </select>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-xl font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all" id="search-btn">
                <Search size={18} /> Search
              </button>
              {(bloodGroup || location) && (
                <button type="button" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" onClick={clearSearch}>
                  <X size={16} /> Clear
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* ── Results ─────────────────────────── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-8">
        {/* Result count bar */}
        {searched && (
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-5 border-b border-gray-200">
            <span className="text-[0.9rem] text-gray-500 flex items-center gap-2">
              <strong className="text-gray-900 text-base">{results.length}</strong> donor{results.length !== 1 ? 's' : ''} found
              {bloodGroup && <span className="px-2.5 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-semibold text-[#b80f1d]">{bloodGroup}</span>}
              {location   && <span className="px-2.5 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-semibold text-[#b80f1d]">{location}</span>}
            </span>
            {/* Blood group quick filters */}
            <div className="flex flex-wrap gap-1.5 ml-auto">
              {BLOOD_GROUPS.map(bg => (
                <button
                  key={bg}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all tracking-wide hover:bg-[color-mix(in_srgb,var(--c)_15%,transparent)] hover:border-[color-mix(in_srgb,var(--c)_40%,transparent)] hover:text-[var(--c)] ${bloodGroup === bg ? 'bg-[color-mix(in_srgb,var(--c)_20%,transparent)] border-[color-mix(in_srgb,var(--c)_50%,transparent)] text-[var(--c)]' : 'bg-white border-gray-200 text-gray-500'}`}
                  style={{ '--c': bloodGroupColor(bg) }}
                  onClick={() => { setBloodGroup(bg); runSearch(bg, location, statusFilter); }}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cards grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {results.length > 0 ? (
            results.map(d => <DonorCard key={d.id} donor={d} />)
          ) : searched ? (
            <div className="col-span-full p-20 text-center flex flex-col items-center gap-4 rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg">
              <Droplet size={48} className="text-gray-400" />
              <h3 className="text-xl text-gray-500 font-bold">No donors found</h3>
              <p className="text-gray-400">Try a different blood group or location.</p>
              <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-2.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all mt-2" onClick={clearSearch}>Show All Donors</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FindDonor;
