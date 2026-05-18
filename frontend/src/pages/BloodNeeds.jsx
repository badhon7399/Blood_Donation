import React, { useState, useEffect } from 'react';
import { Droplet, MapPin, AlertCircle, Clock, Search, Filter, Radio } from 'lucide-react';
import api from '../services/api';
import LiveLocationMap from '../components/LiveLocationMap';

const DUMMY_REQUESTS = [
  { id: 1, bloodGroup: 'O+', urgency: 'Critical', units: 2, location: 'Dhaka Medical College', area: 'Shahbagh', city: 'Dhaka', status: 'Pending', time: '10 mins ago', type: 'Request', coordinates: { lat: 23.726, lng: 90.397 } },
  { id: 2, bloodGroup: 'B-', urgency: 'Urgent', units: 1, location: 'Square Hospital', area: 'Panthapath', city: 'Dhaka', status: 'Pending', time: '30 mins ago', type: 'Request', coordinates: { lat: 23.753, lng: 90.382 } },
  { id: 3, bloodGroup: 'AB+', urgency: 'Normal', units: 3, location: 'Evercare Hospital', area: 'Bashundhara', city: 'Dhaka', status: 'Pending', time: '2 hours ago', type: 'Request', coordinates: { lat: 23.810, lng: 90.431 } },
  { id: 4, bloodGroup: 'A+', urgency: 'Critical', units: 2, location: 'Chittagong Medical College', area: 'Panchlaish', city: 'Chittagong', status: 'Pending', time: '15 mins ago', type: 'Request', coordinates: { lat: 22.359, lng: 91.829 } },
  { id: 5, bloodGroup: 'O-', urgency: 'Urgent', units: 1, location: 'Sylhet MAG Osmani Medical College', area: 'Kajalshah', city: 'Sylhet', status: 'Pending', time: '1 hour ago', type: 'Request', coordinates: { lat: 24.901, lng: 91.859 } },
  { id: 6, bloodGroup: 'B+', urgency: 'Critical', units: 4, location: 'Rajshahi Medical College', area: 'Rajpara', city: 'Rajshahi', status: 'Pending', time: '45 mins ago', type: 'Request', coordinates: { lat: 24.372, lng: 88.586 } },
  { id: 7, bloodGroup: 'AB-', urgency: 'Normal', units: 1, location: 'Khulna Medical College', area: 'Boyra', city: 'Khulna', status: 'Pending', time: '3 hours ago', type: 'Request', coordinates: { lat: 22.825, lng: 89.541 } },
  { id: 8, bloodGroup: 'A-', urgency: 'Urgent', units: 2, location: 'Labaid Cancer Hospital', area: 'Dhanmondi', city: 'Dhaka', status: 'Pending', time: '20 mins ago', type: 'Request', coordinates: { lat: 23.743, lng: 90.382 } },
  { id: 9, bloodGroup: 'O+', urgency: 'Critical', units: 3, location: 'BIRDEM General Hospital', area: 'Shahbagh', city: 'Dhaka', status: 'Pending', time: '5 mins ago', type: 'Request', coordinates: { lat: 23.739, lng: 90.396 } },
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const BloodNeeds = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRequestId, setActiveRequestId] = useState(null);
  
  // Filters
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');

  useEffect(() => {
    // In a real app, this would fetch from api.get('/requests')
    setTimeout(() => {
      setRequests(DUMMY_REQUESTS);
      setActiveRequestId(DUMMY_REQUESTS[0].id);
      setLoading(false);
    }, 600);
  }, []);

  const filteredRequests = requests.filter(req => {
    if (selectedGroup && req.bloodGroup !== selectedGroup) return false;
    if (selectedUrgency && req.urgency !== selectedUrgency) return false;
    return true;
  });

  const mapItems = filteredRequests.map(req => ({
    ...req,
    title: req.location,
    subtitle: `${req.units} Units of ${req.bloodGroup} Needed`,
    markerLabel: req.bloodGroup,
    metrics: [
      { label: 'Units Needed', value: req.units }
    ],
    details: [
      { label: 'Time Posted', value: req.time },
      { label: 'Blood Group', value: req.bloodGroup },
      { label: 'Urgency', value: req.urgency }
    ]
  }));

  const mapSummary = [
    { label: 'Total Requests', value: filteredRequests.length },
    { label: 'Critical Units', value: filteredRequests.filter(r => r.urgency === 'Critical').reduce((sum, r) => sum + r.units, 0) },
    { label: 'Urgent Units', value: filteredRequests.filter(r => r.urgency === 'Urgent').reduce((sum, r) => sum + r.units, 0) },
    { label: 'Normal Units', value: filteredRequests.filter(r => r.urgency === 'Normal').reduce((sum, r) => sum + r.units, 0) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-red-50/30 to-gray-50 w-full">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#b80f1d] via-[#d41425] to-[#66040c] text-white py-8 md:py-12 w-full">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4 text-sm font-semibold">
                  <Radio size={16} className="animate-pulse" />
                  Live Blood Requests
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight leading-tight">
                  Urgent Blood Needs
                </h1>
                <p className="text-white/80 text-lg max-w-2xl">
                  Real-time tracking of patients who need immediate help. Your prompt response can save a life today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full width background */}
      <div className="w-full bg-gradient-to-b from-gray-50 via-red-50/20 to-gray-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Filters - Full width sticky */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 mb-8 sticky top-20 z-40 backdrop-blur-sm bg-white/95">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="text-[#b80f1d]" size={22} />
                <span className="font-bold text-gray-900 text-lg">Filter Requests</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <select 
                  className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-100 text-gray-700 text-sm rounded-xl focus:ring-[#b80f1d] focus:border-[#b80f1d] block px-4 py-2.5 font-medium outline-none transition-all hover:border-red-200"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  <option value="">🩸 Any Blood Group</option>
                  {BLOOD_GROUPS.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>

                <select 
                  className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-100 text-gray-700 text-sm rounded-xl focus:ring-[#b80f1d] focus:border-[#b80f1d] block px-4 py-2.5 font-medium outline-none transition-all hover:border-red-200"
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                >
                  <option value="">⏱️ Any Urgency</option>
                  <option value="Critical">🔴 Critical</option>
                  <option value="Urgent">🟠 Urgent</option>
                  <option value="Normal">🟢 Normal</option>
                </select>

                {(selectedGroup || selectedUrgency) && (
                  <button 
                    onClick={() => { setSelectedGroup(''); setSelectedUrgency(''); }}
                    className="px-4 py-2.5 text-sm font-semibold text-white bg-[#b80f1d] hover:bg-[#9a0c18] rounded-xl transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="flex flex-col items-center gap-4">
                <span className="animate-spin h-12 w-12 rounded-full border-4 border-[#b80f1d] border-t-transparent"></span>
                <p className="text-gray-500 font-semibold">Loading live requests...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Stats Bar - Full width responsive grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
                {mapSummary.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <p className="text-xs font-bold uppercase text-gray-400 mb-2">{stat.label}</p>
                    <p className="text-3xl font-extrabold text-[#b80f1d]">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Live Map Integration */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white w-full">
                <LiveLocationMap 
                  items={mapItems}
                  activeItemId={activeRequestId}
                  onSelectItem={setActiveRequestId}
                  eyebrow="Live Requests Map"
                  title="Active Blood Requests"
                  panelTitle="Request Highlight"
                  summary={mapSummary}
                  mapHeight="min-h-[550px]"
                />
              </div>

              {/* Detailed List View */}
              <div className="w-full">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <AlertCircle className="text-[#b80f1d]" size={24} />
                    </div>
                    All Requests ({filteredRequests.length})
                  </h2>
                </div>
                
                {filteredRequests.length === 0 ? (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-16 text-center border-2 border-dashed border-gray-200 w-full">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300 shadow-sm">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No active requests</h3>
                    <p className="text-gray-500 text-lg">There are no blood requests matching your filters currently.</p>
                  </div>
                ) : (
                  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                    {filteredRequests.map((req) => (
                      <div 
                        key={req.id} 
                        className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border-2 cursor-pointer group hover:shadow-xl ${
                          req.id === activeRequestId 
                            ? 'border-[#b80f1d] shadow-[0_12px_40px_rgba(184,15,29,0.2)] scale-105' 
                            : 'border-gray-100 shadow-md hover:border-red-200'
                        }`}
                        onClick={() => {
                          setActiveRequestId(req.id);
                          document.querySelector('.lifestream-leaflet-marker')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                      >
                        {/* Card Header */}
                        <div className={`px-5 py-4 border-b-2 ${
                          req.urgency === 'Critical' ? 'bg-gradient-to-r from-red-50 to-red-100/50 border-red-200' :
                          req.urgency === 'Urgent' ? 'bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200' :
                          'bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-200'
                        }`}>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className={`flex-1 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-md ${
                              req.urgency === 'Critical' ? 'bg-red-600 text-white' :
                              req.urgency === 'Urgent' ? 'bg-amber-600 text-white' :
                              'bg-emerald-600 text-white'
                            }`}>
                              {req.bloodGroup}
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-extrabold whitespace-nowrap ${
                              req.urgency === 'Critical' ? 'bg-red-600 text-white' :
                              req.urgency === 'Urgent' ? 'bg-amber-600 text-white' :
                              'bg-emerald-600 text-white'
                            }`}>
                              {req.urgency}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{req.time}</p>
                        </div>

                        {/* Card Body */}
                        <div className="px-5 py-5 space-y-4">
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Droplet size={18} className="text-[#b80f1d] shrink-0 mt-0.5 font-bold" />
                              <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Units Needed</p>
                                <p className="text-lg font-extrabold text-gray-900">{req.units} Unit{req.units > 1 ? 's' : ''}</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <MapPin size={18} className="text-[#b80f1d] shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Hospital</p>
                                <p className="text-sm font-bold text-gray-900 truncate">{req.location}</p>
                                <p className="text-xs text-gray-500 truncate">{req.area}</p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-100">
                            <button className="w-full py-3 bg-gradient-to-r from-[#b80f1d] to-[#8a0a15] text-white rounded-lg font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm group-hover:scale-105">
                              Donate Now →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodNeeds;