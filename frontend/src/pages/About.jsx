import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BellRing,
  ClipboardList,
  Droplet,
  HeartPulse,
  MapPinned,
  Radio,
  ShieldCheck,
  Users,
} from 'lucide-react';
import ctaImg from '../assets/cta_arm_donating.png';

const workflow = [
  {
    icon: ClipboardList,
    title: 'Create a clear request',
    text: 'A requester adds blood group, units, urgency, and hospital location so donors know what is needed before they respond.',
  },
  {
    icon: MapPinned,
    title: 'See live context',
    text: 'Donors, blood needs, and events appear on a Bangladesh-only OpenStreetMap view with urgency-colored markers.',
  },
  {
    icon: BellRing,
    title: 'Move to action',
    text: 'Users can find nearby donors, join drives, or submit a request from the same account without choosing a permanent role.',
  },
];

const values = [
  { label: 'One account', detail: 'A person can donate blood and request blood when needed.' },
  { label: 'Bangladesh first', detail: 'Locations, districts, and maps are focused on local use cases.' },
  { label: 'Urgency visible', detail: 'Critical, urgent, and normal needs are easy to scan.' },
  { label: 'Human workflow', detail: 'The interface reduces guesswork during stressful moments.' },
];

const About = () => (
  <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] text-gray-900">
    <section className="border-b border-red-900/10 bg-[linear-gradient(135deg,#fffafa_0%,#ffffff_48%,#fff1f2_100%)] px-6 py-14 lg:px-12">
      <div className="mx-auto grid max-w-[1420px] gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
        <div className="animate-[fadeSlideUp_0.65s_ease_both]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#b80f1d] shadow-sm">
            <HeartPulse size={14} />
            Why LifeStream Exists
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Blood donation should be easier to coordinate when every minute matters.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            LifeStream is built around one simple idea: the same person may donate today and need blood tomorrow. The platform keeps donors, requests, and blood drives connected without forcing people into one fixed role.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/request" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b80f1d] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(184,15,29,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#990a16]">
              Request Blood <ArrowRight size={17} />
            </Link>
            <Link to="/search" className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-red-200 hover:text-[#b80f1d]">
              Find Donors <Users size={17} />
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-red-100 bg-white shadow-[0_24px_70px_rgba(102,4,12,0.10)] animate-[fadeScaleIn_0.7s_ease_0.08s_both]">
          <img src={ctaImg} alt="Person donating blood" className="h-[420px] w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3b0308] via-[#3b0308]/72 to-transparent p-6 pt-24 text-white">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Donors', value: 'Live' },
                { label: 'Needs', value: 'Mapped' },
                { label: 'Events', value: 'Active' },
              ].map(item => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                  <p className="text-lg font-extrabold">{item.value}</p>
                  <p className="text-xs font-semibold text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 py-12 lg:px-12">
      <div className="mx-auto grid max-w-[1420px] gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#b80f1d]">Product Model</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-950">One account, two real-life possibilities.</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Registration does not ask people to choose between donor and recipient. Donation availability is managed later from the dashboard, while requests can be created whenever someone needs help.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {values.map(item => (
            <article key={item.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-base font-extrabold text-gray-900">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-6 pb-12 lg:px-12">
      <div className="mx-auto max-w-[1420px] rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#b80f1d]">How It Works</p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-950">A practical flow from need to response.</h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold text-[#b80f1d] transition-all hover:border-red-200 hover:bg-red-100">
            Explore live map <Radio size={16} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {workflow.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="relative rounded-3xl border border-gray-100 bg-[#f8fafc] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b80f1d] shadow-sm">
                  <Icon size={22} />
                </div>
                <span className="text-sm font-black text-gray-300">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-6 pb-16 lg:px-12">
      <div className="mx-auto grid max-w-[1420px] gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-[32px] border border-red-900/10 bg-[#3b0308] p-8 text-white shadow-[0_24px_70px_rgba(102,4,12,0.16)]">
          <p className="text-xs font-bold uppercase tracking-widest text-red-100">What We Are Building Toward</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight">
            A dependable coordination layer for volunteers, donors, hospitals, and families.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/72">
            The current app focuses on the core journey: register, find donors, create requests, and view live map activity. The next natural step is tighter backend integration for live requests, verified donor availability, and event organizer tools.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            { icon: Droplet, label: 'Blood request flow', value: 'Built' },
            { icon: Activity, label: 'Live map layers', value: 'Built' },
            { icon: ShieldCheck, label: 'Auth protected actions', value: 'Built' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <span className="flex items-center gap-3 text-sm font-bold text-gray-700">
                <Icon size={20} className="text-[#b80f1d]" />
                {label}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
