import { Link, useLocation } from 'react-router-dom';
import { Wrench, ArrowLeft, Droplet } from 'lucide-react';
import './UnderDevelopment.css';

const PAGE_LABELS = {
  '/search':  'Find Donor',
  '/request': 'Request Blood',
};

const UnderDevelopment = () => {
  const { pathname } = useLocation();
  const pageName = PAGE_LABELS[pathname] || 'This Page';

  return (
    <div className="ud-page">
      {/* Decorative blobs */}
      <div className="ud-blob ud-blob--1" />
      <div className="ud-blob ud-blob--2" />

      <div className="ud-card glass">
        {/* Icon */}
        <div className="ud-icon-ring">
          <div className="ud-icon-inner">
            <Wrench size={36} />
          </div>
          {/* Orbiting blood drop */}
          <div className="ud-orbit">
            <div className="ud-orbit-dot">
              <Droplet size={14} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="ud-badge">Under Development</div>
        <h1 className="ud-title">{pageName} is Coming Soon</h1>
        <p className="ud-desc">
          We're working hard to build this feature. It will be available shortly —
          stay tuned for updates!
        </p>

        {/* Progress bar */}
        <div className="ud-progress-wrap">
          <div className="ud-progress-label">
            <span>Build Progress</span>
            <span>65%</span>
          </div>
          <div className="ud-progress-track">
            <div className="ud-progress-fill" style={{ width: '65%' }} />
          </div>
        </div>

        <Link to="/" className="btn btn-primary btn-lg ud-btn">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnderDevelopment;
