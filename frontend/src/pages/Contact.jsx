import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ClipboardList,
  Droplet,
  Mail,
  MapPinned,
  MessageSquare,
  Radio,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

const supportPaths = [
  {
    icon: Droplet,
    title: 'Need blood now',
    text: 'Create a request with blood group, units, urgency, and hospital location.',
    action: 'Create request',
    to: '/request',
    tone: 'bg-red-50 text-red-700 border-red-100',
  },
  {
    icon: UserRound,
    title: 'Want to donate',
    text: 'Search donors, register your donor profile, or join an active event.',
    action: 'Find donors',
    to: '/search',
    tone: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    icon: MapPinned,
    title: 'Organize a drive',
    text: 'Use the events page to understand active coverage and plan locations.',
    action: 'View events',
    to: '/events',
    tone: 'bg-sky-50 text-sky-700 border-sky-100',
  },
];

const checklist = [
  'Blood group and units needed',
  'Hospital or pickup location',
  'Urgency level and deadline',
  'Reachable phone number',
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`LifeStream support: ${formData.get('topic')}`);
    const body = encodeURIComponent([
      `Name: ${formData.get('name')}`,
      `Contact: ${formData.get('contact')}`,
      `Topic: ${formData.get('topic')}`,
      '',
      formData.get('message'),
    ].join('\n'));

    window.location.href = `mailto:support@lifestream.bd?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] text-gray-900">
      <section className="border-b border-gray-100 bg-white px-6 py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1420px] gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#b80f1d]">
              <MessageSquare size={14} />
              Contact and Support
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-gray-950 sm:text-5xl">
              Start with the fastest path, then message us if you need help.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
              LifeStream is designed so most urgent work happens inside the app: requests, donor search, and live maps. Use this page when you need account support, partnership help, or coordination guidance.
            </p>
          </div>

          <div className="rounded-3xl border border-red-100 bg-[#fffafa] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#b80f1d] shadow-sm">
                <ClipboardList size={20} />
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-900">Before contacting support</p>
                <p className="text-xs font-semibold text-gray-500">Keep these details ready</p>
              </div>
            </div>
            <div className="grid gap-2">
              {checklist.map(item => (
                <div key={item} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-gray-700">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-12">
        <div className="mx-auto grid max-w-[1420px] gap-4 lg:grid-cols-3">
          {supportPaths.map(({ icon: Icon, title, text, action, to, tone }) => (
            <article key={title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${tone}`}>
                <Icon size={22} />
              </div>
              <h2 className="text-xl font-extrabold text-gray-950">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
              <Link to={to} className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-800 transition-all hover:border-red-200 hover:text-[#b80f1d]">
                {action}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid max-w-[1420px] gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <form onSubmit={handleSubmit} className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#b80f1d]">Support Message</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-950">Open an email draft</h2>
                <p className="mt-1 text-sm text-gray-500">Your message opens in your email app with the details filled in.</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b80f1d] text-white">
                <Mail size={21} />
              </div>
            </div>

            {submitted && (
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                Email draft opened. Send it from your mail app to complete the message.
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-800">Full Name</label>
                <input id="name" name="name" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#b80f1d] focus:bg-white focus:ring-4 focus:ring-[#b80f1d]/10" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact" className="mb-2 block text-sm font-bold text-gray-800">Phone or Email</label>
                <input id="contact" name="contact" required className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#b80f1d] focus:bg-white focus:ring-4 focus:ring-[#b80f1d]/10" placeholder="How we can reach you" />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="topic" className="mb-2 block text-sm font-bold text-gray-800">Topic</label>
              <select id="topic" name="topic" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#b80f1d] focus:bg-white focus:ring-4 focus:ring-[#b80f1d]/10">
                <option>Account or login issue</option>
                <option>Blood request support</option>
                <option>Donor profile help</option>
                <option>Event or partnership</option>
                <option>Technical issue</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-2 block text-sm font-bold text-gray-800">Message</label>
              <textarea id="message" name="message" required rows={6} className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-[#b80f1d] focus:bg-white focus:ring-4 focus:ring-[#b80f1d]/10" placeholder="Tell us what you need help with..." />
            </div>

            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b80f1d] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_34px_rgba(184,15,29,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#990a16]">
              Open Email Draft <Send size={16} />
            </button>
          </form>

          <aside className="rounded-[32px] border border-red-900/10 bg-[#3b0308] p-6 text-white shadow-[0_24px_70px_rgba(102,4,12,0.16)] md:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <Radio size={14} className="animate-pulse" />
              Operating Notes
            </div>
            <h2 className="text-3xl font-extrabold leading-tight">Use the app for urgent cases first.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              A support message can help with coordination, but urgent blood cases should be posted through Request Blood so the need appears in the live map workflow.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: Droplet, label: 'Urgent blood case', value: 'Use Request Blood' },
                { icon: MapPinned, label: 'Nearby availability', value: 'Use Find Donor' },
                { icon: ShieldCheck, label: 'Account problem', value: 'Send support mail' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
                    <Icon size={17} />
                    {label}
                  </div>
                  <p className="text-sm font-semibold text-white/65">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
