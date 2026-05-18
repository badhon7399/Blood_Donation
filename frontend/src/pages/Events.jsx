import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, Droplet, HeartPulse, MapPin, Radio, Search, Users } from 'lucide-react';
import LiveLocationMap from '../components/LiveLocationMap';
import { EVENT_STATS, LIVE_EVENTS } from '../data/liveEvents';
import { toEventMapItem } from '../data/liveMapData';

const statusStyles = {
  Live: 'bg-red-50 text-red-700 border-red-200',
  Upcoming: 'bg-sky-50 text-sky-700 border-sky-200',
};

const Events = () => {
  const [activeEventId, setActiveEventId] = useState(LIVE_EVENTS[0].id);
  const [filter, setFilter] = useState('All');

  const filteredEvents = useMemo(() => {
    if (filter === 'All') return LIVE_EVENTS;
    return LIVE_EVENTS.filter(event => event.status === filter || event.urgency === filter);
  }, [filter]);
  const mapItems = useMemo(() => filteredEvents.map(toEventMapItem), [filteredEvents]);

  const visibleActiveId = filteredEvents.some(event => event.id === activeEventId)
    ? activeEventId
    : filteredEvents[0]?.id;
  const summary = [
    { label: 'Live', value: filteredEvents.filter(event => event.status === 'Live').length },
    { label: 'Cities', value: new Set(filteredEvents.map(event => event.city)).size },
    { label: 'Needed', value: filteredEvents.reduce((sum, event) => sum + event.donorsNeeded, 0) },
    { label: 'Registered', value: filteredEvents.reduce((sum, event) => sum + event.registered, 0) },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b0308] via-[#8e0a16] to-[#d41425] px-6 py-14 text-white lg:px-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '34px 34px' }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Radio size={14} className="animate-pulse" />
            Live Donation Network
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Blood drives and urgent matches, mapped live.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Track active donation events, see which blood groups are needed, and jump into the nearest opportunity to help.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/request" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#b80f1d] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  <HeartPulse size={17} />
                  Request Blood
                </Link>
                <Link to="/search" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
                  <Search size={17} />
                  Find Donors
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Live Events', value: EVENT_STATS.live, icon: Radio },
                { label: 'Cities Covered', value: EVENT_STATS.cities, icon: MapPin },
                { label: 'Donors Needed', value: EVENT_STATS.donorsNeeded, icon: Droplet },
                { label: 'Registered', value: EVENT_STATS.registered, icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <Icon size={20} className="mb-3 text-red-100" />
                  <p className="text-3xl font-extrabold">{value}</p>
                  <p className="text-xs font-semibold text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#b80f1d]">Map View</p>
            <h2 className="text-2xl font-extrabold text-gray-900">Active Donation Events</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Live', 'Upcoming', 'Critical', 'Urgent'].map(item => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                  filter === item
                    ? 'border-[#b80f1d] bg-[#b80f1d] text-white shadow-md'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-[#b80f1d]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <LiveLocationMap
          items={mapItems}
          activeItemId={visibleActiveId}
          onSelectItem={setActiveEventId}
          eyebrow="OpenStreetMap Live"
          title="Active Donation Events"
          panelTitle="Selected Event"
          summary={summary}
        />

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {filteredEvents.map(event => (
            <button
              key={event.id}
              type="button"
              onClick={() => setActiveEventId(event.id)}
              className={`text-left rounded-3xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                visibleActiveId === event.id ? 'border-[#b80f1d] ring-4 ring-red-100' : 'border-gray-100'
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[event.status]}`}>
                    {event.status}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold leading-tight text-gray-900">{event.title}</h3>
                </div>
                <span className="rounded-2xl bg-red-50 p-3 text-[#b80f1d]">
                  <Droplet size={18} fill="currentColor" />
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="flex items-center gap-2"><MapPin size={15} /> {event.area}, {event.city}</p>
                <p className="flex items-center gap-2"><CalendarDays size={15} /> {event.date}</p>
                <p className="flex items-center gap-2"><Clock size={15} /> {event.time}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.bloodGroups.map(group => (
                  <span key={group} className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-extrabold text-gray-700">
                    {group}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Events;
