import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, MapPin, Droplet, Phone, X, ChevronDown, Heart, Clock, Radio,
} from 'lucide-react';
import { DUMMY_DONORS } from '../data/dummyDonors';
import LiveLocationMap from '../components/LiveLocationMap';
import { toDonorMapItem } from '../data/liveMapData';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const LOCATIONS = [...new Set(DUMMY_DONORS.map(d => d.location))].sort();

const BG_COLORS = {
  'A+':  { bg: '#fff1f2', border: '#fecdd3', text: '#be123c', dot: '#e11d48' },
  'A-':  { bg: '#fff7ed', border: '#fed7aa', text: '#c2410c', dot: '#ea580c' },
  'B+':  { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', dot: '#2563eb' },
  'B-':  { bg: '#f5f3ff', border: '#ddd6fe', text: '#6d28d9', dot: '#7c3aed' },
  'O+':  { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d', dot: '#16a34a' },
  'O-':  { bg: '#ecfeff', border: '#a5f3fc', text: '#0e7490', dot: '#0891b2' },
  'AB+': { bg: '#fdf2f8', border: '#f5d0fe', text: '#a21caf', dot: '#c026d3' },
  'AB-': { bg: '#fffbeb', border: '#fde68a', text: '#b45309', dot: '#d97706' },
};

const getLastDonationDays = (dateStr) => {
  if (!dateStr) return null;
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
};

const DonorCard = ({ donor }) => {
  const c = BG_COLORS[donor.bloodGroup] || BG_COLORS['A+'];
  const days = getLastDonationDays(donor.lastDonation);
  const isAvailable = donor.status === 'Available';
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Top color accent */}
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${c.dot}, ${c.dot}66)` }} />

      {/* Card header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold shrink-0"
            style={{ background: c.bg, color: c.text, border: `2px solid ${c.border}` }}
          >
            {donor.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{donor.name}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-1">
              <MapPin size={12} className="text-gray-400" />
              {donor.area}, {donor.location}
            </span>
          </div>
        </div>

        {/* Blood group badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-extrabold text-sm tracking-wide shrink-0"
          style={{ background: c.bg, color: c.text, border: `1.5px solid ${c.border}` }}
        >
          <Droplet size={12} fill="currentColor" />
          {donor.bloodGroup}
        </div>
      </div>

      {/* Status + last donation */}
      <div className="flex items-center justify-between px-6 pb-5">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
            isAvailable
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-gray-50 text-gray-500 border-gray-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
          {isAvailable ? 'Available' : 'Not Available'}
        </span>

        {days !== null && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            Last donated {days}d ago
          </span>
        )}
      </div>

      {/* CTA button */}
      <div className="px-6 pb-6 mt-auto">
        <button
          disabled={!isAvailable}
          onClick={() => setContactVisible(prev => !prev)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 border"
          style={{
            background: isAvailable ? c.bg : '#f9fafb',
            color: isAvailable ? c.text : '#9ca3af',
            borderColor: isAvailable ? c.border : '#e5e7eb',
          }}
          onMouseEnter={e => {
            if (isAvailable) {
              e.currentTarget.style.background = c.dot;
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = c.dot;
            }
          }}
          onMouseLeave={e => {
            if (isAvailable) {
              e.currentTarget.style.background = c.bg;
              e.currentTarget.style.color = c.text;
              e.currentTarget.style.borderColor = c.border;
            }
          }}
        >
          <Phone size={14} />
          {isAvailable ? (contactVisible ? 'Hide Contact' : 'View Contact') : 'Currently Unavailable'}
        </button>
        {contactVisible && (
          <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm">
            <p className="font-bold text-emerald-800">{donor.phone}</p>
            <p className="mt-1 text-xs font-semibold text-emerald-700/75">
              {donor.name} is marked available for {donor.bloodGroup} donation.
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────── */

const FindDonor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bloodGroup, setBloodGroup]         = useState(searchParams.get('bloodGroup') || '');
  const [location, setLocation]             = useState(searchParams.get('location') || '');
  const [locationInput, setLocationInput]   = useState(searchParams.get('location') || '');
  const [availability, setAvailability]     = useState('Available');
  const [activeDonorId, setActiveDonorId]   = useState(DUMMY_DONORS[0]?.id);

  /* Live results — all filters reactive */
  const results = useMemo(() => {
    let out = DUMMY_DONORS;
    if (bloodGroup) out = out.filter(d => d.bloodGroup === bloodGroup);
    if (location)   out = out.filter(d =>
      d.location.toLowerCase().includes(location.toLowerCase()) ||
      d.area.toLowerCase().includes(location.toLowerCase())
    );
    if (availability !== 'All') out = out.filter(d => d.status === availability);
    return out;
  }, [bloodGroup, location, availability]);

  const donorMapItems = useMemo(() => results.map(toDonorMapItem), [results]);
  const visibleActiveDonorId = results.some(donor => donor.id === activeDonorId)
    ? activeDonorId
    : results[0]?.id;
  const donorSummary = [
    { label: 'Visible', value: results.length },
    { label: 'Available', value: results.filter(donor => donor.status === 'Available').length },
    { label: 'Districts', value: new Set(results.map(donor => donor.location)).size },
    { label: 'Groups', value: new Set(results.map(donor => donor.bloodGroup)).size },
  ];

  const hasFilters = bloodGroup || location;

  const clearAll = () => {
    setBloodGroup(''); setLocation(''); setLocationInput('');
    setAvailability('Available'); setSearchParams({});
  };

  /* Debounce text → location filter */
  useEffect(() => {
    const t = setTimeout(() => setLocation(locationInput), 300);
    return () => clearTimeout(t);
  }, [locationInput]);

  /* Sync blood group to URL */
  useEffect(() => {
    const params = {};
    if (bloodGroup) params.bloodGroup = bloodGroup;
    if (location)   params.location   = location;
    setSearchParams(params);
  }, [bloodGroup, location, setSearchParams]);

  const totalAvailable = DUMMY_DONORS.filter(d => d.status === 'Available').length;

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-64px)]">

      {/* ── Hero ────────────────────────────────── */}
      <div className="w-full relative overflow-hidden bg-gradient-to-br from-[#b80f1d] via-[#9b0c18] to-[#66040c] text-white py-14 px-6 text-center">
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white/90 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <Heart size={12} fill="currentColor" /> Real-Time Donor Search
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">Find a Blood Donor</h1>
          <p className="text-white/75 text-base sm:text-lg">
            Connect with <strong className="text-white">{totalAvailable} available donors</strong> across Bangladesh instantly.
          </p>
        </div>

        {/* Stats */}
        <div className="relative flex justify-center gap-10 sm:gap-16 mt-10 flex-wrap">
          {[
            { label: 'Total Donors',  value: DUMMY_DONORS.length },
            { label: 'Available Now', value: totalAvailable },
            { label: 'Districts',     value: LOCATIONS.length },
            { label: 'Blood Groups',  value: 8 },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold">{s.value}</div>
              <div className="text-white/60 text-xs font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────── */}
      <div className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-[64px] z-50">
        <div className="w-full px-6 lg:px-12 py-4">

          {/* Row 1: text search + dropdowns */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Text search */}
            <div className="flex-1 min-w-[220px] relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by district or area…"
                value={locationInput}
                onChange={e => setLocationInput(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-[#b80f1d] focus:ring-2 focus:ring-[#b80f1d]/15 transition-all placeholder:text-gray-400"
              />
              {locationInput && (
                <button onClick={() => { setLocationInput(''); setLocation(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* District dropdown */}
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
              <select
                value={location}
                onChange={e => { setLocation(e.target.value); setLocationInput(e.target.value); }}
                className="pl-8 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 appearance-none focus:bg-white focus:outline-none focus:border-[#b80f1d] focus:ring-2 focus:ring-[#b80f1d]/15 transition-all min-w-[150px]"
              >
                <option value="">All Districts</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Availability dropdown */}
            <div className="relative">
              <select
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                className="pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 appearance-none focus:bg-white focus:outline-none focus:border-[#b80f1d] focus:ring-2 focus:ring-[#b80f1d]/15 transition-all min-w-[150px]"
              >
                <option value="Available">Available Only</option>
                <option value="All">All Donors</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {hasFilters && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all">
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {/* Row 2: blood group pills */}
          <div className="flex items-center gap-2 flex-wrap mt-3">
            <span className="text-xs font-semibold text-gray-500 shrink-0">Blood Group:</span>
            <button
              onClick={() => setBloodGroup('')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                !bloodGroup
                  ? 'bg-gray-900 text-white border-gray-900 scale-105'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              All
            </button>
            {BLOOD_GROUPS.map(bg => {
              const c = BG_COLORS[bg];
              const isActive = bloodGroup === bg;
              return (
                <button
                  key={bg}
                  onClick={() => setBloodGroup(isActive ? '' : bg)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-all duration-200"
                  style={{
                    background:   isActive ? c.dot : c.bg,
                    color:        isActive ? '#fff' : c.text,
                    borderColor:  isActive ? c.dot : c.border,
                    transform:    isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {bg}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────── */}
      <div className="w-full flex-1 bg-slate-50 px-6 lg:px-12 py-8">

        {/* Meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-extrabold text-gray-900">{results.length}</span>
            <span className="text-gray-500 text-sm">donor{results.length !== 1 ? 's' : ''} found</span>

            {bloodGroup && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ml-1"
                style={{ background: BG_COLORS[bloodGroup]?.bg, color: BG_COLORS[bloodGroup]?.text, borderColor: BG_COLORS[bloodGroup]?.border }}
              >
                <Droplet size={10} fill="currentColor" /> {bloodGroup}
                <button onClick={() => setBloodGroup('')} className="ml-0.5 opacity-60 hover:opacity-100"><X size={10} /></button>
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-[#b80f1d] border border-red-100 ml-1">
                <MapPin size={10} /> {location}
                <button onClick={() => { setLocation(''); setLocationInput(''); }} className="ml-0.5 opacity-60 hover:opacity-100"><X size={10} /></button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            {totalAvailable} available right now
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#b80f1d]">Live Donor Locations</p>
              <h2 className="text-2xl font-extrabold text-gray-900">Available donors on Bangladesh map</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
              <Radio size={14} className="animate-pulse" />
              {donorSummary[1].value} active now
            </div>
          </div>
          <LiveLocationMap
            items={donorMapItems}
            activeItemId={visibleActiveDonorId}
            onSelectItem={setActiveDonorId}
            eyebrow="Donor Live Map"
            title="Live Donor Locations"
            panelTitle="Selected Donor"
            summary={donorSummary}
            mapHeight="min-h-[500px]"
          />
        </div>

        {/* Cards grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map(d => <DonorCard key={d.id} donor={d} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-5">
              <Droplet size={36} className="text-red-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No donors found</h3>
            <p className="text-gray-400 text-sm max-w-xs mb-6">
              Try a different blood group, district, or switch to All Donors to include unavailable donors.
            </p>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              <X size={14} /> Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDonor;
