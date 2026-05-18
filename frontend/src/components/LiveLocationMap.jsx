import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Activity, Clock, Droplet, MapPin, Radio, Users } from 'lucide-react';
import { BANGLADESH_BOUNDS, BANGLADESH_CENTER } from '../data/liveMapData';

const markerTone = {
  Critical: { color: '#dc2626', badge: 'bg-red-50 text-red-700 border-red-200' },
  Urgent: { color: '#f59e0b', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  Normal: { color: '#10b981', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Available: { color: '#16a34a', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'Not Available': { color: '#64748b', badge: 'bg-slate-50 text-slate-600 border-slate-200' },
  Live: { color: '#dc2626', badge: 'bg-red-50 text-red-700 border-red-200' },
  Upcoming: { color: '#0ea5e9', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
  Active: { color: '#dc2626', badge: 'bg-red-50 text-red-700 border-red-200' },
};

const getTone = (item) => markerTone[item.urgency] || markerTone[item.status] || markerTone.Normal;

const createMarkerIcon = (item, isActive) => {
  const tone = getTone(item);
  const label = item.markerLabel || item.type?.slice(0, 2) || 'BD';

  return L.divIcon({
    className: 'lifestream-leaflet-marker',
    html: `
      <span class="lifestream-marker-orbit ${isActive ? 'is-active' : ''}" style="border-color: ${tone.color};"></span>
      <span class="lifestream-marker-glow" style="background: ${tone.color};"></span>
      <span class="lifestream-marker-pin ${isActive ? 'is-active' : ''}" style="background: ${tone.color};">
        <span>${label}</span>
      </span>
    `,
    iconSize: [56, 56],
    iconAnchor: [28, 44],
    popupAnchor: [0, -38],
  });
};

const LiveLocationMap = ({
  items,
  activeItemId,
  onSelectItem,
  eyebrow = 'Bangladesh Live Map',
  title = 'Live Locations',
  panelTitle = 'Selected Location',
  summary = [],
  className = '',
  mapHeight = 'min-h-[560px]',
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const markerItemsRef = useRef([]);
  const activeItemIdRef = useRef(activeItemId);
  const activeItem = items.find(item => item.id === activeItemId) || items[0];
  const activeTone = activeItem ? getTone(activeItem) : markerTone.Normal;

  useEffect(() => {
    activeItemIdRef.current = activeItemId;
  }, [activeItemId]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return undefined;

    const map = L.map(mapRef.current, {
      center: BANGLADESH_CENTER,
      zoom: 7,
      zoomSnap: 0.25,
      minZoom: 6.5,
      maxBounds: BANGLADESH_BOUNDS,
      maxBoundsViscosity: 0.95,
      scrollWheelZoom: true,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    map.fitBounds(BANGLADESH_BOUNDS, { padding: [18, 18] });
    mapInstanceRef.current = map;
    setTimeout(() => map.invalidateSize({ animate: true }), 0);

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach(marker => marker.remove());
    markerItemsRef.current = items;
    markersRef.current = items.map((item) => {
      const marker = L.marker([item.coordinates.lat, item.coordinates.lng], {
        title: item.title,
        icon: createMarkerIcon(item, item.id === activeItemIdRef.current),
        riseOnHover: true,
      })
        .addTo(map)
        .on('click', () => onSelectItem(item.id));

      return marker;
    });

    if (markersRef.current.length > 1) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds(), { padding: [68, 68], maxZoom: 12, animate: true });
    } else if (items[0]) {
      map.setView([items[0].coordinates.lat, items[0].coordinates.lng], 12, { animate: true });
    } else {
      map.fitBounds(BANGLADESH_BOUNDS, { padding: [18, 18], animate: true });
    }
  }, [items, onSelectItem]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    let selectedItem = null;
    markersRef.current.forEach((marker, index) => {
      const item = markerItemsRef.current[index];
      if (!item) return;
      const isActive = item.id === activeItemId;
      marker.setIcon(createMarkerIcon(item, isActive));
      if (isActive) selectedItem = item;
    });

    if (!selectedItem) return;

    map.panTo([selectedItem.coordinates.lat, selectedItem.coordinates.lng], { animate: true, duration: 0.6 });
  }, [activeItemId]);

  return (
    <section className={`grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px] ${className}`}>
      <div className={`relative overflow-hidden rounded-[28px] border border-red-900/10 bg-slate-100 shadow-[0_24px_70px_rgba(102,4,12,0.10)] ${mapHeight}`}>
        <div className="pointer-events-none absolute left-5 top-5 z-[450] flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-bold uppercase text-red-800 shadow-sm backdrop-blur-md">
            <Radio size={14} className="animate-pulse" />
            {eyebrow}
          </div>
          <div className="rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md">
            Bangladesh only
          </div>
        </div>

        <div ref={mapRef} className={`h-full w-full ${mapHeight}`} />

        <div className="absolute bottom-5 left-5 right-5 z-[450] grid grid-cols-2 gap-3 md:grid-cols-4">
          {summary.map(item => (
            <div key={item.label} className="rounded-2xl border border-white/70 bg-white/90 p-3 shadow-sm backdrop-blur-md">
              <div className="text-xl font-extrabold text-gray-900">{item.value}</div>
              <div className="text-xs font-semibold text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <aside className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        {activeItem ? (
          <>
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="mb-2 text-xs font-bold uppercase text-[#b80f1d]">{panelTitle}</p>
                <h2 className="text-2xl font-extrabold leading-tight text-gray-900">{activeItem.title}</h2>
                <p className="mt-1 text-sm font-semibold text-gray-500">{activeItem.subtitle}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${activeTone.badge}`}>
                {activeItem.urgency || activeItem.status}
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                <MapPin size={18} className="text-[#b80f1d]" />
                <div>
                  <p className="font-bold text-gray-800">{activeItem.location}</p>
                  <p className="text-gray-500">{activeItem.area}, {activeItem.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                <Clock size={18} className="text-[#b80f1d]" />
                <div>
                  <p className="font-bold text-gray-800">{activeItem.time}</p>
                  <p className="text-gray-500">{activeItem.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(activeItem.metrics || []).map(metric => (
                  <div key={metric.label} className="rounded-2xl bg-red-50 p-4">
                    <Activity size={18} className="mb-2 text-[#b80f1d]" />
                    <p className="text-2xl font-extrabold text-gray-900">{metric.value}</p>
                    <p className="text-xs font-semibold text-gray-500">{metric.label}</p>
                  </div>
                ))}
              </div>

              {activeItem.bloodGroups?.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase text-gray-400">Blood Groups</p>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.bloodGroups.map(group => (
                      <span key={group} className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-extrabold text-[#b80f1d]">
                        <Droplet size={11} fill="currentColor" />
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {(activeItem.details || []).map(detail => (
                  <div key={detail.label} className="flex items-start justify-between gap-3 rounded-2xl border border-gray-100 px-3 py-2.5">
                    <span className="text-xs font-bold uppercase text-gray-400">{detail.label}</span>
                    <span className="text-right text-sm font-semibold text-gray-800">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
            <Users size={34} className="mb-3 text-gray-300" />
            <h3 className="text-lg font-extrabold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">No live locations match the current filters.</p>
          </div>
        )}
      </aside>
    </section>
  );
};

export default LiveLocationMap;
