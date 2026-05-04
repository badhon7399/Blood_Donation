import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplet, MapPin, Activity, ToggleLeft, ToggleRight, ChevronRight, AlertCircle } from 'lucide-react';
import api from '../services/api';
import './DonorDashboard.css';

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
    <div className="dash-loading">
      <div className="spinner" />
      <p>Loading your dashboard…</p>
    </div>
  );

  return (
    <div className="dash container">
      {/* ── Header ───────────────────────────── */}
      <div className="dash__header">
        <div>
          <p className="section-tag">My Dashboard</p>
          <h1 className="dash__title">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="dash__sub">Manage your donor profile and track impact.</p>
        </div>
        <Link to="/search" className="btn btn-secondary">
          Browse Donors <ChevronRight size={16} />
        </Link>
      </div>

      {!donorProfile ? (
        /* ── Setup Profile ─────────────────── */
        <div className="dash__setup">
          <div className="dash__setup-card glass">
            <div className="dash__setup-icon"><Droplet size={32} /></div>
            <h2>Complete Your Donor Profile</h2>
            <p>Enter your blood group and location so recipients can find you.</p>

            <form onSubmit={registerDonor} className="dash__setup-form">
              <div className="form-group">
                <label className="form-label" htmlFor="bloodGroup">Your Blood Group</label>
                <div className="bg-picker">
                  {BLOOD_GROUPS.map(bg => (
                    <label key={bg} className={`bg-picker__option${form.bloodGroup === bg ? ' selected' : ''}`}>
                      <input type="radio" name="bloodGroup" value={bg}
                        checked={form.bloodGroup === bg}
                        onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))} />
                      {bg}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location">Your District / City</label>
                <div className="input-icon-wrap">
                  <MapPin size={16} className="input-icon" />
                  <input id="location" type="text" className="form-control form-control--icon"
                    placeholder="e.g., Dhaka, Chittagong…"
                    value={form.location}
                    onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                    required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={saving}>
                {saving ? <><span className="btn-spinner" /> Saving…</> : '🩸 Register as Donor'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ── Profile View ──────────────────── */
        <div className="dash__grid">
          {/* Profile card */}
          <div className="dash__profile-card glass">
            <div className="dash__profile-top">
              <div className="dash__profile-avatar">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h2 className="dash__profile-name">{user?.name}</h2>
                <p className="dash__profile-email">{user?.email}</p>
              </div>
            </div>

            <div className="dash__profile-divider" />

            <div className="dash__profile-info">
              <div className="dash__info-row">
                <span className="dash__info-label">Blood Group</span>
                <span className="dash__info-value blood-badge">{donorProfile.bloodGroup}</span>
              </div>
              <div className="dash__info-row">
                <span className="dash__info-label"><MapPin size={14} /> Location</span>
                <span className="dash__info-value">{donorProfile.location}</span>
              </div>
              <div className="dash__info-row">
                <span className="dash__info-label">Status</span>
                <span className={`dash__info-value status-chip ${donorProfile.status === 'Available' ? 'available' : 'unavailable'}`}>
                  <span className="status-dot" /> {donorProfile.status}
                </span>
              </div>
            </div>

            <button
              className={`dash__toggle-btn btn ${donorProfile.status === 'Available' ? 'btn-secondary' : 'btn-primary'} w-full`}
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
          <div className="dash__stats">
            <div className="dash__stat-card glass">
              <div className="dash__stat-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                <Droplet size={22} />
              </div>
              <div className="dash__stat-value">0</div>
              <div className="dash__stat-label">Total Donations</div>
            </div>
            <div className="dash__stat-card glass">
              <div className="dash__stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                <Activity size={22} />
              </div>
              <div className="dash__stat-value">—</div>
              <div className="dash__stat-label">Last Donation</div>
            </div>
          </div>

          {/* History */}
          <div className="dash__history glass">
            <h3>Donation History</h3>
            <div className="dash__history-empty">
              <AlertCircle size={32} />
              <p>No donations recorded yet. Your history will appear here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
