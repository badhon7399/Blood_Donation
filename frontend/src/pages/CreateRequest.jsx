import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import api from '../services/api';
import './CreateRequest.css';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const URGENCY_LEVELS = [
  { value: 'Normal',   label: 'Normal',   icon: CheckCircle,     color: '#10b981', desc: 'Within 1–3 days' },
  { value: 'Urgent',   label: 'Urgent',   icon: AlertTriangle,   color: '#f59e0b', desc: 'Within 48 hours' },
  { value: 'Critical', label: 'Critical', icon: AlertTriangle,   color: '#ef4444', desc: 'Immediately needed' },
];

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
    <div className="request-page">
      <div className="request-success glass">
        <CheckCircle size={56} className="request-success__icon" />
        <h2>Request Submitted!</h2>
        <p>Your blood request has been posted. Nearby donors will be notified.</p>
        <p className="request-success__redirect">Redirecting to home…</p>
      </div>
    </div>
  );

  return (
    <div className="request-page">
      <div className="request-card glass">
        {/* Header */}
        <div className="request-card__header">
          <div className="request-card__icon"><Droplet size={26} fill="currentColor" /></div>
          <div>
            <h1 className="request-card__title">Request Blood</h1>
            <p className="request-card__sub">Fill in the details below. Donors will be matched instantly.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="request-form">
          {/* Blood Group */}
          <div className="form-group">
            <label className="form-label">Blood Group Needed</label>
            <div className="bg-picker">
              {BLOOD_GROUPS.map(bg => (
                <label key={bg} className={`bg-picker__option${form.bloodGroup === bg ? ' selected' : ''}`}>
                  <input type="radio" name="bloodGroup" value={bg}
                    checked={form.bloodGroup === bg}
                    onChange={e => set('bloodGroup')(e.target.value)} />
                  {bg}
                </label>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="form-group">
            <label className="form-label">Urgency Level</label>
            <div className="urgency-selector">
              {URGENCY_LEVELS.map(({ value, label, icon: Icon, color, desc }) => (
                <label key={value} className={`urgency-option${form.urgency === value ? ' selected' : ''}`}
                  style={{ '--uc': color }}>
                  <input type="radio" name="urgency" value={value}
                    checked={form.urgency === value}
                    onChange={e => set('urgency')(e.target.value)} />
                  <Icon size={20} />
                  <span className="urgency-option__label">{label}</span>
                  <span className="urgency-option__desc">{desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Units + Location row */}
          <div className="request-row">
            <div className="form-group">
              <label className="form-label" htmlFor="units">Units Needed</label>
              <input id="units" type="number" min={1} max={10}
                className="form-control"
                value={form.units}
                onChange={e => set('units')(parseInt(e.target.value))} />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <label className="form-label" htmlFor="req-location">Hospital / Location</label>
              <div className="input-icon-wrap">
                <MapPin size={16} className="input-icon" />
                <input id="req-location" type="text"
                  className="form-control form-control--icon"
                  placeholder="e.g., Dhaka Medical College Hospital"
                  value={form.location}
                  onChange={e => set('location')(e.target.value)}
                  required />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
            {loading
              ? <><span className="btn-spinner" /> Submitting…</>
              : `Submit ${form.urgency === 'Critical' ? '🚨' : '🩸'} Request`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
