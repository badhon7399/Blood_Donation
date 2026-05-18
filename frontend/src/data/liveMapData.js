export const BANGLADESH_CENTER = [23.685, 90.3563];
export const BANGLADESH_BOUNDS = [
  [20.55, 87.8],
  [26.75, 92.75],
];

export const DISTRICT_COORDINATES = {
  Barisal: { lat: 22.701, lng: 90.3535 },
  Bogura: { lat: 24.8465, lng: 89.3773 },
  Brahmanbaria: { lat: 23.9571, lng: 91.1116 },
  Chattogram: { lat: 22.3569, lng: 91.7832 },
  Chittagong: { lat: 22.3569, lng: 91.7832 },
  Comilla: { lat: 23.4607, lng: 91.1809 },
  Cumilla: { lat: 23.4607, lng: 91.1809 },
  "Cox's Bazar": { lat: 21.4272, lng: 92.0058 },
  Dhaka: { lat: 23.8103, lng: 90.4125 },
  Dinajpur: { lat: 25.6279, lng: 88.6332 },
  Faridpur: { lat: 23.607, lng: 89.8429 },
  Feni: { lat: 23.0159, lng: 91.3976 },
  Gazipur: { lat: 23.9999, lng: 90.4203 },
  Jessore: { lat: 23.1667, lng: 89.2167 },
  Jashore: { lat: 23.1667, lng: 89.2167 },
  Khulna: { lat: 22.8456, lng: 89.5403 },
  Kushtia: { lat: 23.9013, lng: 89.1205 },
  Mymensingh: { lat: 24.7471, lng: 90.4203 },
  Narayanganj: { lat: 23.6238, lng: 90.5 },
  Narsingdi: { lat: 23.9322, lng: 90.7154 },
  Noakhali: { lat: 22.8696, lng: 91.0995 },
  Pabna: { lat: 24.0064, lng: 89.2372 },
  Rajshahi: { lat: 24.3745, lng: 88.6042 },
  Rangpur: { lat: 25.7439, lng: 89.2752 },
  Sirajganj: { lat: 24.4534, lng: 89.7007 },
  Sylhet: { lat: 24.8949, lng: 91.8687 },
  Tangail: { lat: 24.2513, lng: 89.9167 },
};

export const resolveDistrictFromText = (value = '') => {
  const normalized = value.toLowerCase();
  return Object.keys(DISTRICT_COORDINATES).find(district =>
    normalized.includes(district.toLowerCase())
  ) || 'Dhaka';
};

export const isInsideBangladesh = ({ lat, lng }) =>
  lat >= BANGLADESH_BOUNDS[0][0] &&
  lat <= BANGLADESH_BOUNDS[1][0] &&
  lng >= BANGLADESH_BOUNDS[0][1] &&
  lng <= BANGLADESH_BOUNDS[1][1];

export const LIVE_BLOOD_REQUESTS = [
  {
    id: 'need-001',
    title: 'Emergency O- Needed',
    requester: 'DMCH Emergency Unit',
    hospital: 'Dhaka Medical College Hospital',
    city: 'Dhaka',
    area: 'Shahbag',
    bloodGroup: 'O-',
    units: 3,
    urgency: 'Critical',
    status: 'Active',
    time: 'Needed within 2 hours',
    contact: 'Emergency desk',
    coordinates: { lat: 23.7279, lng: 90.3974 },
  },
  {
    id: 'need-002',
    title: 'A+ Platelet Support',
    requester: 'Square Hospital Blood Bank',
    hospital: 'Square Hospital',
    city: 'Dhaka',
    area: 'Panthapath',
    bloodGroup: 'A+',
    units: 2,
    urgency: 'Urgent',
    status: 'Active',
    time: 'Needed today',
    contact: 'Blood bank desk',
    coordinates: { lat: 23.7523, lng: 90.3818 },
  },
  {
    id: 'need-003',
    title: 'B- Surgery Match',
    requester: 'Chattogram Medical Unit',
    hospital: 'Chattogram Medical College Hospital',
    city: 'Chattogram',
    area: 'Panchlaish',
    bloodGroup: 'B-',
    units: 2,
    urgency: 'Critical',
    status: 'Active',
    time: 'Needed immediately',
    contact: 'Surgery coordination',
    coordinates: { lat: 22.3602, lng: 91.8317 },
  },
  {
    id: 'need-004',
    title: 'AB- ICU Request',
    requester: 'MAG Osmani ICU',
    hospital: 'MAG Osmani Medical College',
    city: 'Sylhet',
    area: 'Kajolshah',
    bloodGroup: 'AB-',
    units: 1,
    urgency: 'Critical',
    status: 'Active',
    time: 'Open until matched',
    contact: 'ICU reception',
    coordinates: { lat: 24.8999, lng: 91.8611 },
  },
  {
    id: 'need-005',
    title: 'O+ Trauma Support',
    requester: 'Rajshahi Medical Emergency',
    hospital: 'Rajshahi Medical College Hospital',
    city: 'Rajshahi',
    area: 'Laxmipur',
    bloodGroup: 'O+',
    units: 4,
    urgency: 'Urgent',
    status: 'Active',
    time: 'Within 6 hours',
    contact: 'Emergency desk',
    coordinates: { lat: 24.3741, lng: 88.5877 },
  },
  {
    id: 'need-006',
    title: 'B+ Child Care Request',
    requester: 'Khulna Children Ward',
    hospital: 'Khulna Medical College Hospital',
    city: 'Khulna',
    area: 'Sonadanga',
    bloodGroup: 'B+',
    units: 2,
    urgency: 'Urgent',
    status: 'Active',
    time: 'Needed tonight',
    contact: 'Ward support',
    coordinates: { lat: 22.8177, lng: 89.5646 },
  },
  {
    id: 'need-007',
    title: 'A- Maternal Care',
    requester: 'Rangpur Medical Blood Bank',
    hospital: 'Rangpur Medical College Hospital',
    city: 'Rangpur',
    area: 'Dhap',
    bloodGroup: 'A-',
    units: 2,
    urgency: 'Critical',
    status: 'Active',
    time: 'Within 3 hours',
    contact: 'Blood bank desk',
    coordinates: { lat: 25.7592, lng: 89.2523 },
  },
  {
    id: 'need-008',
    title: 'AB+ Oncology Support',
    requester: 'Mymensingh Medical Oncology',
    hospital: 'Mymensingh Medical College Hospital',
    city: 'Mymensingh',
    area: 'Charpara',
    bloodGroup: 'AB+',
    units: 1,
    urgency: 'Normal',
    status: 'Active',
    time: 'Within 24 hours',
    contact: 'Oncology desk',
    coordinates: { lat: 24.7478, lng: 90.4071 },
  },
  {
    id: 'need-009',
    title: 'O- Accident Case',
    requester: 'Cumilla Medical Emergency',
    hospital: 'Cumilla Medical College Hospital',
    city: 'Cumilla',
    area: 'Kuchaitoli',
    bloodGroup: 'O-',
    units: 2,
    urgency: 'Critical',
    status: 'Active',
    time: 'Needed immediately',
    contact: 'Emergency desk',
    coordinates: { lat: 23.4682, lng: 91.1801 },
  },
  {
    id: 'need-010',
    title: 'A+ Dialysis Support',
    requester: 'Barisal Sher-e-Bangla Unit',
    hospital: 'Sher-e-Bangla Medical College',
    city: 'Barisal',
    area: 'Band Road',
    bloodGroup: 'A+',
    units: 2,
    urgency: 'Normal',
    status: 'Active',
    time: 'Tomorrow morning',
    contact: 'Dialysis unit',
    coordinates: { lat: 22.7016, lng: 90.3533 },
  },
  {
    id: 'need-011',
    title: 'B+ Emergency Reserve',
    requester: 'Bogura Medical Blood Bank',
    hospital: 'Shaheed Ziaur Rahman Medical College',
    city: 'Bogura',
    area: 'Silimpur',
    bloodGroup: 'B+',
    units: 3,
    urgency: 'Urgent',
    status: 'Active',
    time: 'Needed today',
    contact: 'Blood bank desk',
    coordinates: { lat: 24.884, lng: 89.3648 },
  },
  {
    id: 'need-012',
    title: 'AB- Rare Match Alert',
    requester: 'Faridpur Medical Support',
    hospital: 'Bangabandhu Sheikh Mujib Medical College',
    city: 'Faridpur',
    area: 'Goalchamot',
    bloodGroup: 'AB-',
    units: 1,
    urgency: 'Critical',
    status: 'Active',
    time: 'Open until matched',
    contact: 'Medical support',
    coordinates: { lat: 23.6028, lng: 89.8365 },
  },
];

export const BLOOD_REQUEST_STORAGE_KEY = 'lifestream_live_blood_requests';

export const getStoredBloodRequests = () => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(BLOOD_REQUEST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredBloodRequest = (request) => {
  if (typeof window === 'undefined') return [request];

  const existing = getStoredBloodRequests().filter(item => item.id !== request.id);
  const next = [request, ...existing];
  window.localStorage.setItem(BLOOD_REQUEST_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('lifestream:blood-requests-updated', { detail: next }));
  return next;
};

export const getLiveBloodRequests = () => [
  ...getStoredBloodRequests(),
  ...LIVE_BLOOD_REQUESTS,
];

const requestTimeByUrgency = {
  Normal: 'Within 1-3 days',
  Urgent: 'Within 48 hours',
  Critical: 'Immediately needed',
};

const normalizeRequestStatus = (status) => {
  if (!status || status === 'Pending') return 'Active';
  return status;
};

export const normalizeBloodRequest = (request, index = 0) => {
  const hospital = request.hospital || request.location || 'Hospital location pending';
  const city = request.city || resolveDistrictFromText(`${request.city || ''} ${hospital}`);
  const area = request.area || hospital;
  const latitude = request.latitude ?? request.lat;
  const longitude = request.longitude ?? request.lng;
  const coordinates = request.coordinates || (
    Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude))
      ? { lat: Number(latitude), lng: Number(longitude) }
      : getDistrictCoordinates(city, area, request.id || index)
  );

  return {
    id: request.id || `need-${index}`,
    title: request.title || `${request.bloodGroup || 'Blood'} Blood Needed`,
    requester: request.requester || request.requesterName || 'LifeStream requester',
    hospital,
    city,
    area,
    bloodGroup: request.bloodGroup || 'A+',
    units: Number(request.units) || 1,
    urgency: request.urgency || 'Normal',
    status: normalizeRequestStatus(request.status),
    time: request.time || requestTimeByUrgency[request.urgency] || 'Open until matched',
    contact: request.contact || request.phone || request.email || 'Contact through requester',
    coordinates,
  };
};

const hashText = (value) => [...String(value)].reduce((sum, char) => sum + char.charCodeAt(0), 0);

export const getDistrictCoordinates = (location, area = '', id = '') => {
  const base = DISTRICT_COORDINATES[location] || DISTRICT_COORDINATES[location?.trim?.()] || DISTRICT_COORDINATES.Dhaka;
  const hash = hashText(`${location}-${area}-${id}`);
  const latOffset = ((hash % 29) - 14) * 0.0045;
  const lngOffset = (((hash * 7) % 31) - 15) * 0.005;

  return {
    lat: Number((base.lat + latOffset).toFixed(5)),
    lng: Number((base.lng + lngOffset).toFixed(5)),
  };
};

export const toDonorMapItem = (donor) => ({
  id: donor.id,
  type: 'Donor',
  title: donor.name,
  subtitle: `${donor.bloodGroup} donor`,
  status: donor.status,
  urgency: donor.status === 'Available' ? 'Available' : 'Not Available',
  markerLabel: donor.bloodGroup,
  bloodGroups: [donor.bloodGroup],
  location: `${donor.area}, ${donor.location}`,
  city: donor.location,
  area: donor.area,
  time: donor.status === 'Available' ? 'Available now' : 'Currently unavailable',
  coordinates: getDistrictCoordinates(donor.location, donor.area, donor.id),
  metrics: [
    { label: 'Blood', value: donor.bloodGroup },
    { label: 'Status', value: donor.status },
  ],
  details: [
    { label: 'Phone', value: donor.phone },
    { label: 'Last donation', value: donor.lastDonation || 'Not recorded' },
  ],
});

export const toBloodRequestMapItem = (request) => {
  const normalized = normalizeBloodRequest(request);

  return {
    id: normalized.id,
    type: 'Blood Need',
    title: normalized.title,
    subtitle: normalized.hospital,
    status: normalized.status,
    urgency: normalized.urgency,
    markerLabel: normalized.bloodGroup,
    bloodGroups: [normalized.bloodGroup],
    location: `${normalized.area}, ${normalized.city}`,
    city: normalized.city,
    area: normalized.area,
    time: normalized.time,
    coordinates: normalized.coordinates,
    metrics: [
      { label: 'Blood', value: normalized.bloodGroup },
      { label: 'Units', value: normalized.units },
    ],
    details: [
      { label: 'Requester', value: normalized.requester },
      { label: 'Contact', value: normalized.contact },
      { label: 'Hospital', value: normalized.hospital },
    ],
  };
};

export const toEventMapItem = (event) => ({
  id: event.id,
  type: event.type,
  title: event.title,
  subtitle: event.host,
  status: event.status,
  urgency: event.urgency,
  markerLabel: event.status === 'Live' ? 'Live' : event.bloodGroups[0],
  bloodGroups: event.bloodGroups,
  location: `${event.location}, ${event.city}`,
  city: event.city,
  area: event.area,
  time: `${event.date} · ${event.time}`,
  coordinates: event.coordinates,
  metrics: [
    { label: 'Needed', value: event.donorsNeeded },
    { label: 'Registered', value: event.registered },
  ],
  details: [
    { label: 'Host', value: event.host },
    { label: 'Event type', value: event.type },
    { label: 'Schedule', value: `${event.date}, ${event.time}` },
  ],
});
