import { Link } from 'react-router-dom';
import { Heart, Activity, Users, MapPin, Droplet, Shield, Smile, ArrowRight, Radio } from 'lucide-react';
import { EVENT_STATS, LIVE_EVENTS } from '../data/liveEvents';
import heroImg from '../assets/bg_hand.png';
import ctaImg from '../assets/cta_arm_donating.png';

const Home = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-[#fffafa] via-[#fff3f4] to-[#ffffff] text-gray-900 font-sans min-h-screen">
    {/* Grid pattern background */}
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(rgba(184, 15, 29, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 15, 29, 0.035) 1px, transparent 1px)', backgroundSize: '46px 46px', maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent 68%)' }}></div>
    
    {/* ── Hero ──────────────────────────────── */}
    <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[calc(100vh-92px)] pt-12 pb-16 px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1600px] mx-auto z-10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -left-40 -bottom-40 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(184,15,29,0.12),transparent_66%)] animate-[floatSoft_7s_ease-in-out_infinite]"></div>

      <div className="flex-1 max-w-[600px] relative z-10 animate-[fadeSlideUp_0.8s_ease_both] text-center lg:text-left flex flex-col items-center lg:items-start">
        <h1 className="text-5xl md:text-6xl lg:text-[5.35rem] font-black leading-[1.05] text-gray-900 mb-6 drop-shadow-[0_12px_36px_rgba(102,4,12,0.1)]">
          Give Blood.<br />
          <span className="text-[#b80f1d]">Save Lives.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-9 max-w-[450px]">
          Your single act of kindness can create countless ripples of hope.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto justify-center lg:justify-start">
          <Link to="/search" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-7 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-[0_16px_34px_rgba(184,15,29,0.32)] hover:bg-[#66040c] hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(102,4,12,0.38)] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700"></div>
            <Droplet size={18} fill="currentColor" /> Donate Now
          </Link>
          <Link to="/events" className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-[#b80f1d] px-7 py-3.5 rounded-full font-semibold border border-[#b80f1d]/20 shadow-[0_12px_32px_rgba(102,4,12,0.08)] hover:bg-white hover:-translate-y-1 hover:border-[#b80f1d]/40 hover:shadow-[0_18px_36px_rgba(184,15,29,0.16)] transition-all duration-300">
            Find a Drive <MapPin size={18} />
          </Link>
        </div>
        
        <div className="flex items-center gap-4 px-4 py-2.5 w-fit border border-[#b80f1d]/15 rounded-full bg-white/80 backdrop-blur-md shadow-[0_18px_45px_rgba(102,4,12,0.1)]">
          <div className="flex">
            {['👩🏽', '👨🏻', '👩🏼', '👨🏽'].map((emoji, i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-white to-red-50 flex items-center justify-center text-sm shadow-sm -ml-3 first:ml-0">{emoji}</div>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600">Join <strong className="text-[#b80f1d] font-bold">10,000+</strong> life savers today!</span>
        </div>
      </div>
      
      <div className="flex-1 w-full max-w-[720px] relative flex justify-center lg:justify-end items-center min-h-[500px] lg:min-h-[600px] animate-[fadeScaleIn_0.9s_ease_0.15s_both]">
        {/* Background gradient blob for image */}
        <div className="absolute w-[90%] max-w-[640px] h-[90%] max-h-[560px] right-0 rounded-full bg-[radial-gradient(circle_at_48%_38%,rgba(255,255,255,0.72),rgba(255,214,220,0.58)_44%,rgba(184,15,29,0.18)_100%)] blur-sm z-0"></div>
        
        <div className="absolute w-[500px] h-[500px] lg:w-[610px] lg:h-[610px] right-1/2 translate-x-1/2 lg:translate-x-0 lg:-right-[1%] top-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.78),transparent_28%),radial-gradient(circle_at_70%_72%,rgba(184,15,29,0.14),transparent_38%),linear-gradient(135deg,#fff8f8_0%,#ffd7dc_58%,#b80f1d_150%)] z-10 drop-shadow-[0_36px_70px_rgba(102,4,12,0.13)] animate-[morphBlob_9s_ease-in-out_infinite]"></div>
        
        <img src={heroImg} alt="Hands holding a blood drop" className="relative z-20 w-full max-w-[610px] h-auto lg:scale-105 filter saturate-100 contrast-105 brightness-105 drop-shadow-[0_30px_46px_rgba(102,4,12,0.2)] animate-[floatSoft_5.5s_ease-in-out_infinite]" />
        
        {/* Floating plus marks */}
        <div className="absolute text-[#b80f1d] font-bold opacity-70 animate-[twinkleFloat_3s_ease-in-out_infinite] z-30 top-[10%] left-[10%] text-2xl" style={{ animationDelay: '0.1s' }}>+</div>
        <div className="absolute text-[#b80f1d] font-bold opacity-70 animate-[twinkleFloat_3s_ease-in-out_infinite] z-30 bottom-[15%] left-[20%] text-2xl" style={{ animationDelay: '0.8s' }}>+</div>
        <div className="absolute text-[#b80f1d] font-bold opacity-70 animate-[twinkleFloat_3s_ease-in-out_infinite] z-30 top-[60%] right-[5%] text-2xl" style={{ animationDelay: '1.4s' }}>+</div>
        <div className="absolute text-[#b80f1d] font-bold opacity-70 animate-[twinkleFloat_3s_ease-in-out_infinite] z-30 top-[22%] right-[18%] text-lg" style={{ animationDelay: '0.45s' }}>+</div>
        <div className="absolute text-[#b80f1d] font-bold opacity-70 animate-[twinkleFloat_3s_ease-in-out_infinite] z-30 bottom-[28%] right-[30%] text-xl" style={{ animationDelay: '1.05s' }}>+</div>
        <div className="absolute text-[#b80f1d] font-bold opacity-50 animate-[twinkleFloat_3s_ease-in-out_infinite] z-30 top-[42%] left-[2%] text-base" style={{ animationDelay: '1.75s' }}>+</div>
      </div>
    </section>

    {/* ── Live Events Preview ─────────────────── */}
    <section className="relative z-10 mx-4 my-12 overflow-hidden rounded-[36px] border border-[#b80f1d]/10 bg-white px-6 py-16 shadow-[0_24px_70px_rgba(102,4,12,0.07)] md:mx-10 md:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,15,29,0.08),transparent_28%),radial-gradient(circle_at_88%_62%,rgba(245,158,11,0.09),transparent_24%)] pointer-events-none"></div>
      <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#b80f1d]">
            <Radio size={14} className="animate-pulse" />
            {EVENT_STATS.live} live now
          </div>
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            Find donation events happening near you.
          </h2>
          <p className="mt-4 max-w-[520px] text-base leading-relaxed text-gray-600">
            Watch active drives across Bangladesh, check needed blood groups, and join the closest life-saving event.
          </p>
          <Link to="/events" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(184,15,29,0.28)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(102,4,12,0.34)]">
            Explore Live Map <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {LIVE_EVENTS.slice(0, 3).map(event => (
            <Link key={event.id} to="/events" className="rounded-3xl border border-gray-100 bg-white/85 p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-lg">
              <span className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${event.status === 'Live' ? 'border-red-200 bg-red-50 text-red-700' : 'border-sky-200 bg-sky-50 text-sky-700'}`}>
                {event.status}
              </span>
              <h3 className="text-base font-extrabold leading-tight text-gray-900">{event.city}</h3>
              <p className="mt-2 text-sm font-semibold text-gray-600">{event.title}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin size={13} />
                {event.area}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ── Features ──────────────────────────── */}
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-white/95 to-red-50/90 rounded-[44px] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] relative z-10 mx-4 md:mx-10 my-12">
      <div className="absolute right-0 top-0 w-full h-full bg-[radial-gradient(circle_at_78%_18%,rgba(184,15,29,0.08),transparent_38%)] pointer-events-none rounded-[44px]"></div>
      <div className="text-center mb-16 relative z-10">
        <h4 className="text-[#b80f1d] text-sm font-bold tracking-widest uppercase mb-2">WHY DONATE BLOOD?</h4>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Because Every Drop Counts</h2>
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#b80f1d]/60 to-transparent"></span>
          <Droplet size={14} fill="#b80f1d" color="#b80f1d" />
          <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#b80f1d]/60 to-transparent"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-[1400px] mx-auto relative z-10">
        {[
          { icon: Heart, title: "Saves Lives", desc: "One donation can save up to three lives.", delay: "0s" },
          { icon: Shield, title: "Safe & Simple", desc: "A safe process that takes less than an hour.", delay: "0.08s" },
          { icon: Users, title: "Helps Many", desc: "Supports accident victims, surgery patients, and more.", delay: "0.16s" },
          { icon: Smile, title: "Feel Good", desc: "Experience the joy of making a real difference.", delay: "0.24s" }
        ].map((feature, i) => (
          <div key={i} className="flex flex-col items-center p-8 border border-[#b80f1d]/10 rounded-3xl bg-white/80 shadow-[0_18px_46px_rgba(102,4,12,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-3 hover:border-[#b80f1d]/30 hover:shadow-[0_28px_60px_rgba(184,15,29,0.12)] animate-[fadeSlideUp_0.7s_ease_both] group" style={{ animationDelay: feature.delay }}>
            <div className="w-18 h-18 rounded-full bg-[radial-gradient(circle_at_32%_25%,white,#fff0f1)] flex items-center justify-center mb-6 shadow-[inset_0_-8px_18px_rgba(184,15,29,0.06),0_14px_26px_rgba(184,15,29,0.08)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-[inset_0_-8px_18px_rgba(184,15,29,0.1),0_22px_36px_rgba(184,15,29,0.15)]">
              <feature.icon size={28} color="#b80f1d" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── Stats ─────────────────────────────── */}
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-br from-[#3b0308] via-[#66040c] to-[#b80f1d] text-white my-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.15),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(255,215,220,0.15),transparent_26%)]"></div>
      <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-r from-white to-red-50 rounded-b-[50%]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-r from-red-50 to-white rounded-t-[50%]"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10 max-w-[1200px] mx-auto">
        {[
          { icon: Users, num: "10,000+", label: "Happy Donors" },
          { icon: Droplet, num: "25,000+", label: "Units Donated" },
          { icon: Activity, num: "75,000+", label: "Lives Saved" },
          { icon: MapPin, num: "150+", label: "Blood Drives" }
        ].map((stat, i) => (
          <div key={i} className={`flex flex-col items-center p-5 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 ${i !== 3 ? 'md:border-r border-white/20' : ''}`}>
            <stat.icon size={36} strokeWidth={1.5} className="mb-4 opacity-90 drop-shadow-md" />
            <div className="text-3xl md:text-4xl font-bold mb-1">{stat.num}</div>
            <div className="text-sm font-medium opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA Section ───────────────────────── */}
    <section className="py-24 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 bg-gradient-to-br from-white/95 to-red-50/90 border border-[#b80f1d]/10 rounded-[44px] shadow-[0_24px_70px_rgba(102,4,12,0.08)] relative mx-4 md:mx-10 my-20 max-w-[1400px] xl:mx-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(184,15,29,0.08),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(102,4,12,0.05),transparent_28%)] pointer-events-none rounded-[44px]"></div>
      
      <div className="flex-1 max-w-[500px] relative z-10 text-center lg:text-left flex flex-col items-center lg:items-start">
        <h4 className="text-[#b80f1d] text-sm font-bold tracking-widest uppercase mb-4">BE A HERO</h4>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6 relative">
          Ready to Make<br/>
          a <span className="text-[#b80f1d]">Difference?</span>
          <svg className="absolute w-10 h-10 left-[80%] lg:left-5 top-0 lg:-top-5 -rotate-12 animate-[heartbeat_2.2s_ease-in-out_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M50 85 C10 50 10 15 30 10 C45 5 50 20 50 20 C50 20 55 5 70 10 C90 15 90 50 50 85 Z" stroke="#b80f1d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Join our community of heroes and help build a healthier, stronger tomorrow.
        </p>
        <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-8 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-[0_16px_34px_rgba(184,15,29,0.32)] hover:bg-[#66040c] hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(102,4,12,0.38)] transition-all duration-300">
          Register Now <ArrowRight size={18} />
        </Link>
      </div>
      
      <div className="flex-1 w-full flex justify-center relative">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.78),transparent_28%),radial-gradient(circle_at_78%_76%,rgba(184,15,29,0.22),transparent_36%),linear-gradient(135deg,#fff0f1,#ffd7dc_58%,#b80f1d_145%)] right-1/2 translate-x-1/2 lg:translate-x-0 lg:-right-[50px] top-1/2 -translate-y-1/2 z-0 drop-shadow-[0_28px_58px_rgba(102,4,12,0.15)] animate-[morphBlob_10s_ease-in-out_infinite_reverse]"></div>
        <img src={ctaImg} alt="Person donating blood" className="relative z-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] object-cover rounded-[50%_50%_40%_60%/50%_40%_60%_50%] shadow-[0_26px_60px_rgba(102,4,12,0.18)] animate-[floatSoft_6s_ease-in-out_infinite]" />
      </div>
    </section>

    {/* ── Footer Strip ──────────────────────── */}
    <footer className="flex items-center justify-center gap-3 py-8 px-6 bg-white/80 backdrop-blur-md border-t border-[#b80f1d]/10 text-gray-600 text-sm font-medium">
      <Droplet size={14} fill="#b80f1d" color="#b80f1d" />
      <p>Give Blood. Give Hope. <strong className="text-[#b80f1d] font-bold">Together,</strong> we can save more lives.</p>
    </footer>

  </div>
);

export default Home;
