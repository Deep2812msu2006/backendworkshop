import React, { useState } from 'react';
import { PlusCircle, Building2, Calendar, DollarSign, Sparkles, CheckCircle2, Trash2, Edit3, ShieldAlert, Image, MapPin, Tag } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { resortsData, dummyEventsData } from '../data/resorts';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

// TODO: Create Resort API (Supabase Insert)
// TODO: Create Event Activity API (Supabase Insert)
// TODO: Upload Property Images to Supabase Storage
// TODO: Update / Delete Resort API

export function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState('add-resort');
  const [resortsList, setResortsList] = useState(resortsData);
  const [eventsList, setEventsList] = useState(dummyEventsData);

  // New Resort Form State
  const [resortForm, setResortForm] = useState({
    name: '',
    location: '',
    price: '',
    rating: '4.9',
    image: '',
    description: '',
    facilities: ''
  });
  const [resortSuccess, setResortSuccess] = useState(false);

  // New Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    resortName: resortsData[0]?.name || '',
    category: 'Water Sports & Sailing',
    date: '',
    price: '',
    maxParticipants: '10',
    description: ''
  });
  const [eventSuccess, setEventSuccess] = useState(false);

  const handleResortSubmit = async (e) => {
    e.preventDefault();
    const newResortId = String(Date.now());

    const newResort = {
      id: newResortId,
      name: resortForm.name,
      location: resortForm.location,
      price: Number(resortForm.price),
      rating: Number(resortForm.rating),
      reviewsCount: 1,
      image: resortForm.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      gallery: [resortForm.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"],
      description: resortForm.description,
      featured: true,
      facilities: resortForm.facilities.split(',').map(f => f.trim()).filter(Boolean),
      reviews: []
    };

    if (!isSupabaseConfigured) {
      // Local Workshop Mode (without .env)
      setResortsList([newResort, ...resortsList]);
      resortsData.unshift(newResort);
      setResortSuccess(true);
      setResortForm({ name: '', location: '', price: '', rating: '4.9', image: '', description: '', facilities: '' });
      setTimeout(() => setResortSuccess(false), 4000);
      return;
    }
    
    try {
      const { error } = await supabase.from('resorts').insert([{
        id: newResortId,
        name: resortForm.name,
        location: resortForm.location,
        price: Number(resortForm.price),
        rating: Number(resortForm.rating),
        reviews_count: 1,
        image: resortForm.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
        description: resortForm.description,
        featured: true
      }]);

      if (error) throw error;

      setResortsList([newResort, ...resortsList]);
      resortsData.unshift(newResort);
      setResortSuccess(true);
      setResortForm({ name: '', location: '', price: '', rating: '4.9', image: '', description: '', facilities: '' });
      setTimeout(() => setResortSuccess(false), 4000);
    } catch (err) {
      console.error("Resort Insert Error:", err);
      alert("Failed to add resort: " + err.message);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const newEventId = `evt-${Date.now()}`;

    try {
      const { error } = await supabase.from('activities').insert([{
        id: newEventId,
        title: eventForm.title,
        description: eventForm.description,
        time: eventForm.date
      }]);

      if (error) throw error;

      const newEvent = {
        id: newEventId,
        title: eventForm.title,
        resortName: eventForm.resortName,
        category: eventForm.category,
        date: eventForm.date,
        price: Number(eventForm.price),
        maxParticipants: Number(eventForm.maxParticipants),
        description: eventForm.description
      };

      setEventsList([newEvent, ...eventsList]);
      dummyEventsData.unshift(newEvent); // update shared state
      setEventSuccess(true);
      setEventForm({ title: '', resortName: resortsData[0]?.name || '', category: 'Water Sports & Sailing', date: '', price: '', maxParticipants: '10', description: '' });
      setTimeout(() => setEventSuccess(false), 4000);
    } catch (err) {
      console.error("Activity Insert Error:", err);
      alert("Failed to add activity: " + err.message);
    }
  };

  const handleDeleteResort = (id) => {
    setResortsList(resortsList.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Owner Header */}
      <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Owner Management Console</span>
          </div>
          <h1 className="text-3xl font-black text-white">Resort & Event Publishing Portal</h1>
          <p className="text-slate-400 text-xs">
            Add new luxury villas, schedule resort experiences, and manage properties on the live platform.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            size="sm"
            variant={activeTab === 'add-resort' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('add-resort')}
            icon={Building2}
          >
            Add Resort Property
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'add-event' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('add-event')}
            icon={Calendar}
          >
            Add Event / Activity
          </Button>
        </div>
      </div>

      {/* Owner Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Managed Properties</span>
            <span className="text-2xl font-black text-white">{resortsList.length}</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Scheduled Activities</span>
            <span className="text-2xl font-black text-white">{eventsList.length}</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Monthly Revenue</span>
            <span className="text-2xl font-black text-white">$142,500</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Owner Rating</span>
            <span className="text-2xl font-black text-white">4.92 / 5.0</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('add-resort')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'add-resort'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          1. Add New Resort Listing
        </button>

        <button
          onClick={() => setActiveTab('add-event')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'add-event'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          2. Add Event or Activity
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'manage'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          3. Manage Active Listings ({resortsList.length})
        </button>
      </div>

      {/* Tab 1: Add New Resort Form */}
      {activeTab === 'add-resort' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Add New Resort Property</h2>
              <p className="text-xs text-slate-400">Fill details to publish a new luxury resort to the public website.</p>
            </div>
            <span className="text-xs text-amber-400 font-semibold">// TODO: Create Resort API (Supabase Insert)</span>
          </div>

          {resortSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-fadeIn text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>New Resort Property successfully published to live dataset!</span>
            </div>
          )}

          <form onSubmit={handleResortSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Resort Name"
                placeholder="e.g. Royal Sapphire Overwater Villa"
                value={resortForm.name}
                onChange={(e) => setResortForm({ ...resortForm, name: e.target.value })}
                icon={Building2}
                required
              />

              <Input
                label="Location (City, Country)"
                placeholder="e.g. Bora Bora, French Polynesia"
                value={resortForm.location}
                onChange={(e) => setResortForm({ ...resortForm, location: e.target.value })}
                icon={MapPin}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Price Per Night ($ USD)"
                type="number"
                placeholder="e.g. 750"
                value={resortForm.price}
                onChange={(e) => setResortForm({ ...resortForm, price: e.target.value })}
                icon={DollarSign}
                required
              />

              <Input
                label="Hero Cover Image URL"
                placeholder="https://images.unsplash.com/photo-..."
                value={resortForm.image}
                onChange={(e) => setResortForm({ ...resortForm, image: e.target.value })}
                icon={Image}
              />
            </div>

            <Input
              label="Included Facilities (Comma separated)"
              placeholder="Infinity Pool, Overwater Spa, 24/7 Butler, Helipad Access"
              value={resortForm.facilities}
              onChange={(e) => setResortForm({ ...resortForm, facilities: e.target.value })}
              icon={Tag}
              required
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Property Overview & Description *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe villa amenities, ocean view perspectives, butler service details..."
                value={resortForm.description}
                onChange={(e) => setResortForm({ ...resortForm, description: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 text-sm text-slate-100 focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">// TODO: Upload Property Images to Supabase Storage</span>
              <Button type="submit" size="md" variant="primary" icon={PlusCircle}>
                Publish Resort Listing
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Add Event / Activity Form */}
      {activeTab === 'add-event' && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Add Resort Event or Guest Activity</h2>
              <p className="text-xs text-slate-400">Schedule guest experiences, catamaran cruises, wine tastings, or spa retreats.</p>
            </div>
            <span className="text-xs text-amber-400 font-semibold">// TODO: Create Event Activity API (Supabase Insert)</span>
          </div>

          {eventSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-fadeIn text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Event / Activity successfully added to resort itinerary!</span>
            </div>
          )}

          <form onSubmit={handleEventSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Event Activity Title"
                placeholder="e.g., VIP Wine Tasting & Dinner"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                icon={Sparkles}
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Select Host Resort *
                </label>
                <select
                  value={eventForm.resortName}
                  onChange={(e) => setEventForm({ ...eventForm, resortName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400"
                >
                  {resortsList.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Category
                </label>
                <select
                  value={eventForm.category}
                  onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="Water Sports & Sailing">Water Sports & Sailing</option>
                  <option value="Culinary & Dining">Culinary & Dining</option>
                  <option value="Adventure & Sports">Adventure & Sports</option>
                  <option value="Wellness & Spa">Wellness & Spa</option>
                </select>
              </div>

              <Input
                label="Event Date"
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                required
              />

              <Input
                label="Price Per Person ($)"
                type="number"
                placeholder="150"
                value={eventForm.price}
                onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })}
                icon={DollarSign}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Activity Description *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Detail what guests should bring, timing, inclusions..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 text-sm text-slate-100 focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">// TODO: Connect Event Activity API</span>
              <Button type="submit" size="md" variant="primary" icon={PlusCircle}>
                Add Event Activity
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Manage Active Listings */}
      {activeTab === 'manage' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Active Resort Listings & Events</h2>
              <p className="text-xs text-slate-400">View and manage properties published on the platform.</p>
            </div>
            <span className="text-xs text-amber-400 font-semibold">// TODO: Update / Delete Resort API</span>
          </div>

          <div className="space-y-4">
            {resortsList.map((resort) => (
              <div
                key={resort.id}
                className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img src={resort.image} alt={resort.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-white">{resort.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {resort.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-sky-400">${resort.price} / night</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResort(resort.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
