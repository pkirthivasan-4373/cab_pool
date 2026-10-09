import React, { useState } from 'react';
import { Car, Search, PlusCircle, MapPin, Calendar, Clock, Users, Phone, CheckCircle, ArrowRight, ShieldCheck, Sparkles, Navigation } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('find');
  
  // Initial sample trips
  const [trips, setTrips] = useState([
    {
      id: 1,
      from: 'Urapakkam',
      to: 'Airport',
      date: '2026-10-08',
      time: '08:30',
      totalSeats: 3,
      seatsLeft: 2,
      estimatedFare: 450,
      contact: '+91 9840123456',
      joinedUsers: ['UserA'],
      creator: 'Kirthivasan'
    },
    {
      id: 2,
      from: 'Guduvanchery',
      to: 'Chennai Central',
      date: '2026-10-08',
      time: '10:00',
      totalSeats: 4,
      seatsLeft: 3,
      estimatedFare: 700,
      contact: '+91 9443567890',
      joinedUsers: ['UserB'],
      creator: 'Aditya'
    },
    {
      id: 3,
      from: 'VIT Chennai',
      to: 'Tambaram',
      date: '2026-10-09',
      time: '14:15',
      totalSeats: 3,
      seatsLeft: 1,
      estimatedFare: 350,
      contact: '+91 9711223344',
      joinedUsers: ['UserC', 'UserD'],
      creator: 'Kamalesh'
    }
  ]);

  // Find Ride Filter State
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  // Post Trip Form State
  const [newTrip, setNewTrip] = useState({
    from: 'Urapakkam',
    to: 'Airport',
    date: '',
    time: '',
    totalSeats: 3,
    estimatedFare: 450,
    contact: ''
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handlePostTrip = (e) => {
    e.preventDefault();
    if (!newTrip.date || !newTrip.time || !newTrip.contact) {
      showNotification('Please fill in all required fields!');
      return;
    }

    const created = {
      id: Date.now(),
      ...newTrip,
      seatsLeft: parseInt(newTrip.totalSeats) - 1,
      totalSeats: parseInt(newTrip.totalSeats),
      estimatedFare: parseInt(newTrip.estimatedFare),
      joinedUsers: ['You']
    };

    setTrips([created, ...trips]);
    showNotification('🎉 Trip posted successfully & saved!');
    setActiveTab('browse');
    setNewTrip({ from: 'Urapakkam', to: 'Airport', date: '', time: '', totalSeats: 3, estimatedFare: 450, contact: '' });
  };

  const handleJoinTrip = (id) => {
    setTrips(trips.map(trip => {
      if (trip.id === id && trip.seatsLeft > 0) {
        showNotification('✅ Successfully joined! Driver contact unlocked.');
        return {
          ...trip,
          seatsLeft: trip.seatsLeft - 1,
          joinedUsers: [...trip.joinedUsers, 'You']
        };
      }
      return trip;
    }));
  };

  const handleLeaveTrip = (id) => {
    setTrips(trips.map(trip => {
      if (trip.id === id && trip.joinedUsers.includes('You')) {
        showNotification('⚠️ Left the trip. Seat successfully freed up.');
        return {
          ...trip,
          seatsLeft: Math.min(trip.totalSeats, trip.seatsLeft + 1),
          joinedUsers: trip.joinedUsers.filter(u => u !== 'You')
        };
      }
      return trip;
    }));
  };

  const filteredTrips = trips.filter(trip => {
    const matchFrom = searchFrom === '' || trip.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchTo = searchTo === '' || trip.to.toLowerCase().includes(searchTo.toLowerCase());
    return matchFrom && matchTo;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 pb-20">
      
      {/* WIDE COLORFUL HEADER */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-950/80 to-slate-900 border-b border-purple-500/30 px-6 py-4 shadow-2xl backdrop-blur-xl">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 p-3 rounded-2xl font-black shadow-lg shadow-amber-500/20 flex items-center justify-center transform hover:scale-105 transition-transform">
              <Car className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-black tracking-tight text-white">Cab<span className="text-amber-400">Pool</span></h1>
                <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-300 text-xs px-3 py-1 rounded-full font-bold border border-pink-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Campus Smart Ride
                </span>
              </div>
              <p className="text-xs text-slate-400">Instant Corridor Matching • Urapakkam, VIT, Airport & Central</p>
            </div>
          </div>

          <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
            <button 
              onClick={() => setActiveTab('find')} 
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'find' ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-lg shadow-amber-400/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Search className="w-4 h-4" /> Find Ride
            </button>
            <button 
              onClick={() => setActiveTab('browse')} 
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'browse' ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-lg shadow-amber-400/20' : 'text-slate-400 hover:text-white'}`}
            >
              <Car className="w-4 h-4" /> Browse All ({trips.length})
            </button>
            <button 
              onClick={() => setActiveTab('post')} 
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${activeTab === 'post' ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-lg shadow-amber-400/20' : 'text-slate-400 hover:text-white'}`}
            >
              <PlusCircle className="w-4 h-4" /> Post Trip
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-6 py-3.5 rounded-2xl font-extrabold shadow-2xl flex items-center gap-3 animate-bounce border border-yellow-200">
          <ShieldCheck className="w-5 h-5 text-slate-950" />
          <span>{notification}</span>
        </div>
      )}

      {/* WIDE SPREAD MAIN CONTAINER */}
      <main className="w-full px-6 md:px-12 mt-8">
        
        {/* TAB 1: FIND MY RIDE */}
        {activeTab === 'find' && (
          <div className="space-y-8">
            {/* Colorful Hero Search Banner */}
            <div className="bg-gradient-to-r from-indigo-950 via-purple-900/60 to-slate-900 border border-purple-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute right-40 bottom-0 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 text-xs px-3.5 py-1.5 rounded-full font-bold border border-amber-400/30 mb-3">
                  <Navigation className="w-3.5 h-3.5" /> Corridor Route Matching Active
                </div>
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Find Your Shared Cab Instantly</h2>
                <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                  Enter your starting area (e.g., Urapakkam, Guduvanchery) and your destination. Our system matches overlapping routes so you can split fares effortlessly!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-500/30 backdrop-blur-md">
                    <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Starting From / Corridor</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-400" />
                      <input 
                        type="text" 
                        placeholder="e.g. Urapakkam, VIT Chennai" 
                        value={searchFrom}
                        onChange={(e) => setSearchFrom(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-500/30 backdrop-blur-md">
                    <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-400" />
                      <input 
                        type="text" 
                        placeholder="e.g. Airport, Chennai Central" 
                        value={searchTo}
                        onChange={(e) => setSearchTo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid - Wide & Spread */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>Matching Trips</span>
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2.5 py-0.5 rounded-full border border-purple-500/30">{filteredTrips.length} Available</span>
                </h3>
                <span className="text-xs font-bold text-slate-400">Sorted by departure time</span>
              </div>

              {filteredTrips.length === 0 ? (
                <div className="bg-gradient-to-br from-slate-900 to-purple-950/40 border border-slate-800 rounded-3xl p-16 text-center shadow-xl">
                  <div className="w-16 h-16 bg-amber-400/10 text-amber-400 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-amber-400/20">
                    <Car className="w-8 h-8 animate-pulse" />
                  </div>
                  <p className="text-lg font-bold text-white">No active trips match this exact corridor.</p>
                  <p className="text-sm text-slate-400 mt-1">Be the hero of your WhatsApp group—post your trip and split the fare!</p>
                  <button 
                    onClick={() => setActiveTab('post')} 
                    className="mt-6 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-extrabold px-8 py-3 rounded-2xl shadow-lg hover:shadow-amber-400/30 transition-all text-sm"
                  >
                    + Post a Trip Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTrips.map(trip => {
                    const isJoined = trip.joinedUsers.includes('You');
                    const currentOccupants = trip.totalSeats - trip.seatsLeft;
                    const fareSplit = Math.round(trip.estimatedFare / Math.max(1, currentOccupants));

                    return (
                      <div key={trip.id} className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 border border-slate-800 hover:border-amber-400/50 transition-all duration-300 rounded-3xl p-7 shadow-2xl flex flex-col justify-between gap-6 group">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={`font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider ${
                              trip.seatsLeft === 0 
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {trip.seatsLeft === 0 ? '🔒 Trip Full' : `🟢 ${trip.seatsLeft} Seats Left`}
                            </span>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"><Calendar className="w-3 h-3 text-amber-400" /> {trip.date}</span>
                              <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"><Clock className="w-3 h-3 text-amber-400" /> {trip.time}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xl font-black text-white bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-amber-400" />
                              <span>{trip.from}</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0" />
                            <div className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-pink-400" />
                              <span>{trip.to}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                              <span className="block text-[10px] uppercase font-bold text-slate-400">Total Cab Fare</span>
                              <span className="text-base font-black text-white">₹{trip.estimatedFare}</span>
                            </div>
                            <div className="bg-amber-400/10 p-3 rounded-xl border border-amber-400/20">
                              <span className="block text-[10px] uppercase font-bold text-amber-400">Split Per Person</span>
                              <span className="text-base font-black text-amber-300">₹{fareSplit} <span className="text-xs font-normal">({currentOccupants} joined)</span></span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-medium">Posted by <strong className="text-purple-300">{trip.creator || 'Student'}</strong></span>

                          {isJoined ? (
                            <div className="flex items-center gap-3">
                              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5" /> {trip.contact}
                              </div>
                              <button 
                                onClick={() => handleLeaveTrip(trip.id)}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                              >
                                Leave
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleJoinTrip(trip.id)}
                              disabled={trip.seatsLeft === 0}
                              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-lg flex items-center gap-2 ${
                                trip.seatsLeft === 0 
                                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                  : 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-amber-400/20 transform hover:-translate-y-0.5'
                              }`}
                            >
                              <Users className="w-3.5 h-3.5" /> {trip.seatsLeft === 0 ? 'Fully Booked' : 'Join & Unlock Contact'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BROWSE ALL TRIPS */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-purple-950/40 p-6 rounded-3xl border border-slate-800">
              <div>
                <h2 className="text-2xl font-black text-white">All Active Cab Pools</h2>
                <p className="text-sm text-slate-400">Past trips automatically disappear. Join any open ride to split the fare.</p>
              </div>
              <button 
                onClick={() => setActiveTab('post')}
                className="bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-black px-6 py-3 rounded-2xl shadow-lg transition-all"
              >
                + Post New Trip
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trips.map(trip => {
                const isJoined = trip.joinedUsers.includes('You');
                const currentOccupants = trip.totalSeats - trip.seatsLeft;
                const fareSplit = Math.round(trip.estimatedFare / Math.max(1, currentOccupants));

                return (
                  <div key={trip.id} className="bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider ${
                          trip.seatsLeft === 0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {trip.seatsLeft === 0 ? '🔒 Trip Full' : `🟢 ${trip.seatsLeft} Seats Left`}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"><Calendar className="w-3 h-3 text-amber-400" /> {trip.date}</span>
                          <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"><Clock className="w-3 h-3 text-amber-400" /> {trip.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xl font-black text-white bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                        <span>{trip.from}</span>
                        <ArrowRight className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <span>{trip.to}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Total Cab Fare</span>
                          <span className="text-base font-black text-white">₹{trip.estimatedFare}</span>
                        </div>
                        <div className="bg-amber-400/10 p-3 rounded-xl border border-amber-400/20">
                          <span className="block text-[10px] uppercase font-bold text-amber-400">Split Per Person</span>
                          <span className="text-base font-black text-amber-300">₹{fareSplit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Creator: <strong className="text-purple-300">{trip.creator || 'Student'}</strong></span>

                      {isJoined ? (
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" /> {trip.contact}
                          </div>
                          <button onClick={() => handleLeaveTrip(trip.id)} className="text-xs text-red-400 hover:text-red-300 font-bold bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
                            Leave
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleJoinTrip(trip.id)}
                          disabled={trip.seatsLeft === 0}
                          className={`px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
                            trip.seatsLeft === 0 ? 'bg-slate-800 text-slate-500' : 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-400/20'
                          }`}
                        >
                          {trip.seatsLeft === 0 ? 'Full' : 'Join Trip'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: POST TRIP FORM */}
        {activeTab === 'post' && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 border border-purple-500/30 rounded-3xl p-10 shadow-2xl max-w-3xl mx-auto">
            <div className="mb-8">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">Ride Sharing</span>
              <h2 className="text-3xl font-black text-white mt-2">Post a New Cab Pool</h2>
              <p className="text-sm text-slate-400 mt-1">Booked a cab or planning to? Let fellow students join your ride and split the bill.</p>
            </div>

            <form onSubmit={handlePostTrip} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Starting From / Area</label>
                  <input 
                    type="text" 
                    value={newTrip.from}
                    onChange={(e) => setNewTrip({...newTrip, from: e.target.value})}
                    placeholder="e.g. Urapakkam, Guduvanchery"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Destination</label>
                  <select 
                    value={newTrip.to}
                    onChange={(e) => setNewTrip({...newTrip, to: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value="Airport">Airport</option>
                    <option value="Chennai Central">Chennai Central</option>
                    <option value="Egmore">Egmore</option>
                    <option value="Tambaram">Tambaram</option>
                    <option value="VIT Campus">VIT Campus</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Date</label>
                  <input 
                    type="date" 
                    value={newTrip.date}
                    onChange={(e) => setNewTrip({...newTrip, date: e.target.value})}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Departure Time</label>
                  <input 
                    type="time" 
                    value={newTrip.time}
                    onChange={(e) => setNewTrip({...newTrip, time: e.target.value})}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Total Free Seats Available</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="6"
                    value={newTrip.totalSeats}
                    onChange={(e) => setNewTrip({...newTrip, totalSeats: e.target.value})}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Estimated Total Cab Fare (₹)</label>
                  <input 
                    type="number" 
                    value={newTrip.estimatedFare}
                    onChange={(e) => setNewTrip({...newTrip, estimatedFare: e.target.value})}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Your Contact Number (Hidden until someone joins)</label>
                <input 
                  type="text" 
                  placeholder="+91 9876543210"
                  value={newTrip.contact}
                  onChange={(e) => setNewTrip({...newTrip, contact: e.target.value})}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-amber-400/20 transition-all text-base tracking-wide"
              >
                🚀 Publish Cab Pool & Save
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}