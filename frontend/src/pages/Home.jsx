import './Home.css';
import { Link } from 'react-router-dom';
import { Heart, Activity, Users, MapPin, Droplet, Shield, Smile, ArrowRight } from 'lucide-react';
import heroImg from '../assets/bg_hand.png';
import ctaImg from '../assets/cta_arm_donating.png';

const Home = () => (
  <div className="home-light">
    
    {/* ── Hero ──────────────────────────────── */}
    <section className="hero-section container">
      <div className="hero-content">
        <h1 className="hero-title">
          Give Blood.<br />
          <span className="text-red">Save Lives.</span>
        </h1>
        <p className="hero-subtext">
          Your single act of kindness can create countless ripples of hope.
        </p>
        <div className="hero-buttons">
          <Link to="/search" className="btn-solid-red">
            <Droplet size={16} fill="currentColor" /> Donate Now
          </Link>
          <Link to="/search" className="btn-outline-red">
            Find a Drive <MapPin size={16} />
          </Link>
        </div>
        
        <div className="hero-social-proof">
          <div className="avatar-group">
            <div className="avatar">👩🏽</div>
            <div className="avatar">👨🏻</div>
            <div className="avatar">👩🏼</div>
            <div className="avatar">👨🏽</div>
          </div>
          <span className="social-text">Join <strong className="text-red">10,000+</strong> life savers today!</span>
        </div>
      </div>
      
      <div className="hero-image-wrapper">
        <div className="hero-blob"></div>
        <img src={heroImg} alt="Hands holding a blood drop" className="hero-image" />
        <div className="plus-mark pm-1">+</div>
        <div className="plus-mark pm-2">+</div>
        <div className="plus-mark pm-3">+</div>
        <div className="plus-mark pm-4">+</div>
        <div className="plus-mark pm-5">+</div>
        <div className="plus-mark pm-6">+</div>
      </div>
    </section>

    {/* ── Features ──────────────────────────── */}
    <section className="features-section container">
      <div className="section-header-centered">
        <h4 className="section-subtitle-red">WHY DONATE BLOOD?</h4>
        <h2 className="section-title-dark">Because Every Drop Counts</h2>
        <div className="section-divider">
          <span className="divider-line"></span>
          <Droplet size={14} fill="#d71920" color="#d71920" />
          <span className="divider-line"></span>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Heart size={28} color="#d71920" />
          </div>
          <h3>Saves Lives</h3>
          <p>One donation can save up to three lives.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Shield size={28} color="#d71920" />
          </div>
          <h3>Safe & Simple</h3>
          <p>A safe process that takes less than an hour.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Users size={28} color="#d71920" />
          </div>
          <h3>Helps Many</h3>
          <p>Supports accident victims, surgery patients, and more.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Smile size={28} color="#d71920" />
          </div>
          <h3>Feel Good</h3>
          <p>Experience the joy of making a real difference.</p>
        </div>
      </div>
    </section>

    {/* ── Stats ─────────────────────────────── */}
    <section className="stats-banner">
      <div className="container stats-container">
        <div className="stat-item">
          <Users size={36} strokeWidth={1.5} />
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Happy Donors</div>
        </div>
        <div className="stat-item">
          <Droplet size={36} strokeWidth={1.5} />
          <div className="stat-number">25,000+</div>
          <div className="stat-label">Units Donated</div>
        </div>
        <div className="stat-item">
          <Activity size={36} strokeWidth={1.5} />
          <div className="stat-number">75,000+</div>
          <div className="stat-label">Lives Saved</div>
        </div>
        <div className="stat-item">
          <MapPin size={36} strokeWidth={1.5} />
          <div className="stat-number">150+</div>
          <div className="stat-label">Blood Drives</div>
        </div>
      </div>
    </section>

    {/* ── CTA Section ───────────────────────── */}
    <section className="cta-section container">
      <div className="cta-content">
        <h4 className="section-subtitle-red">BE A HERO</h4>
        <h2 className="cta-title">
          Ready to Make<br/>
          a <span className="text-red">Difference?</span>
          <svg className="cta-heart-scribble" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M50 85 C10 50 10 15 30 10 C45 5 50 20 50 20 C50 20 55 5 70 10 C90 15 90 50 50 85 Z" stroke="#d71920" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </h2>
        <p className="cta-subtext">
          Join our community of heroes and help build a healthier, stronger tomorrow.
        </p>
        <Link to="/register" className="btn-solid-red">
          Register Now <ArrowRight size={18} />
        </Link>
      </div>
      <div className="cta-image-wrapper">
        <div className="cta-blob"></div>
        <img src={ctaImg} alt="Person donating blood" className="cta-image" />
      </div>
    </section>

    {/* ── Footer Strip ──────────────────────── */}
    <footer className="footer-strip container">
      <Droplet size={14} fill="#d71920" color="#d71920" />
      <p>Give Blood. Give Hope. <strong className="text-red">Together,</strong> we can save more lives.</p>
    </footer>

  </div>
);

export default Home;
