import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Droplet, User as UserIcon, Phone, ChevronDown, X } from 'lucide-react';
import { DUMMY_DONORS } from '../data/dummyDonors';
import './FindDonor.css';

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
    <article className="donor-card glass glass-hover">
      {/* Blood Group badge */}
      <div className="donor-card__header" style={{ borderColor: `${color}30` }}>
        <div className="donor-card__avatar" style={{ background: `${color}18`, color }}>
          <UserIcon size={22} />
        </div>
        <div className="donor-card__blood-pill" style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>
          <Droplet size={13} fill="currentColor" />
          {donor.bloodGroup}
        </div>
      </div>

      <div className="donor-card__body">
        <h3 className="donor-card__name">{donor.name}</h3>

        <div className="donor-card__meta">
          <span className="donor-card__meta-item">
            <MapPin size={14} />
            {donor.area}, {donor.location}
          </span>
        </div>

        <div className={`donor-card__status ${donor.status === 'Available' ? 'available' : 'unavailable'}`}>
          <span className="status-dot" />
          {donor.status}
        </div>
      </div>

      <button
        className="btn btn-secondary w-full donor-card__cta"
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
    <div className="find-donor">

      {/* ── Page Header ─────────────────────── */}
      <div className="find-donor__header container">
        <p className="section-tag">Real-Time Search</p>
        <h1 className="find-donor__title">Find a Blood Donor</h1>
        <p className="find-donor__sub">Search across all 64 districts of Bangladesh. Results update instantly.</p>
      </div>

      {/* ── Search Panel ────────────────────── */}
      <div className="container">
        <div className="search-panel glass">
          <form onSubmit={handleSubmit} className="search-panel__form">
            {/* Blood Group */}
            <div className="search-panel__field">
              <label className="form-label" htmlFor="bg-select">Blood Group</label>
              <div className="select-wrapper">
                <Droplet size={16} className="select-icon" />
                <select
                  id="bg-select"
                  className="form-control form-control--icon"
                  value={bloodGroup}
                  onChange={e => setBloodGroup(e.target.value)}
                >
                  <option value="">Any Blood Group</option>
                  {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="search-panel__field">
              <label className="form-label" htmlFor="loc-select">District / Area</label>
              <div className="select-wrapper">
                <MapPin size={16} className="select-icon" />
                <select
                  id="loc-select"
                  className="form-control form-control--icon"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                >
                  <option value="">Any Location</option>
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            {/* Availability */}
            <div className="search-panel__field">
              <label className="form-label" htmlFor="status-select">Availability</label>
              <div className="select-wrapper">
                <ChevronDown size={16} className="select-icon-right" />
                <select
                  id="status-select"
                  className="form-control form-control--icon"
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); runSearch(bloodGroup, location, e.target.value); }}
                >
                  <option value="Available">Available Only</option>
                  <option value="All">All Donors</option>
                </select>
              </div>
            </div>

            <div className="search-panel__actions">
              <button type="submit" className="btn btn-primary btn-lg" id="search-btn">
                <Search size={18} /> Search
              </button>
              {(bloodGroup || location) && (
                <button type="button" className="btn btn-ghost btn-lg" onClick={clearSearch}>
                  <X size={16} /> Clear
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* ── Results ─────────────────────────── */}
      <div className="container find-donor__results-wrapper">
        {/* Result count bar */}
        {searched && (
          <div className="results-bar">
            <span className="results-count">
              <strong>{results.length}</strong> donor{results.length !== 1 ? 's' : ''} found
              {bloodGroup && <span className="results-tag">{bloodGroup}</span>}
              {location   && <span className="results-tag">{location}</span>}
            </span>
            {/* Blood group quick filters */}
            <div className="bg-filters">
              {BLOOD_GROUPS.map(bg => (
                <button
                  key={bg}
                  className={`bg-filter-btn${bloodGroup === bg ? ' active' : ''}`}
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
        <div className="donors-grid">
          {results.length > 0 ? (
            results.map(d => <DonorCard key={d.id} donor={d} />)
          ) : searched ? (
            <div className="no-results glass">
              <Droplet size={48} className="no-results__icon" />
              <h3>No donors found</h3>
              <p>Try a different blood group or location.</p>
              <button className="btn btn-primary" onClick={clearSearch}>Show All Donors</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FindDonor;
