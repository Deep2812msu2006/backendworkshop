import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, DollarSign, Clock, MapPin, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { dummyStats, dummyActivities } from '../data/bookings';
import { resortsData } from '../data/resorts';
import { supabase } from '../utils/supabaseClient';

// TODO: Replace dummy data using API
// TODO: Booking API
// TODO: Profile API

export function DashboardPage() {
  const [userName, setUserName] = useState('Loading...');
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingTrips: 0,
    rewardsPoints: 0,
    totalSpent: '$0'
  });

  useEffect(() => {
    async function fetchName() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from('users').select('name').eq('id', user.id).maybeSingle();
          if (data && data.name) {
            setUserName(data.name);
          } else {
            setUserName(user.user_metadata?.full_name || (user.email ? user.email.split('@')[0] : 'User'));
          }
        } else {
          setUserName('Guest');
        }
      } catch (err) {
        console.error("DashboardPage fetchName error:", err);
        setUserName('Guest');
      }
    }
    fetchName();

    async function fetchBookings() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userBookings, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id);
          
        if (userBookings && !error) {
          const totalBookings = userBookings.length;
          const upcomingTrips = userBookings.filter(b => 
            b.status === 'Upcoming' || b.status === 'Confirmed' || new Date(b.check_in) > new Date()
          ).length;
          const sumSpent = userBookings.reduce((sum, b) => sum + Number(b.total_price || 0), 0);

          setStats({
            totalBookings,
            upcomingTrips,
            rewardsPoints: Math.floor(sumSpent * 2.5), // 2.5 reward points per dollar spent
            totalSpent: `$${sumSpent.toLocaleString()}`
          });

          const enrichedBookings = userBookings.map(b => {
            const resort = resortsData.find(r => r.id === b.resort_id);
            return {
              id: b.id,
              resortName: resort ? resort.name : 'Unknown Resort',
              image: resort ? resort.image : 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
              location: resort ? resort.location : 'Unknown Location',
              status: b.status || 'Confirmed',
              checkIn: b.check_in,
              checkOut: b.check_out,
              totalPrice: b.total_price
            };
          });
          setBookings(enrichedBookings);
        }
      } else {
        setUserName('Guest');
      }
    }
    fetchNameAndBookings();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-sky-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5" />
            <span>VIP Member Portal</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">
            Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">{userName}</span>!
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your active bookings, view membership reward points, and plan upcoming retreats.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Link to="/resorts">
            <Button size="md" variant="primary" icon={Calendar}>
              Book New Resort
            </Button>
          </Link>
          <Link to="/profile">
            <Button size="md" variant="outline">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Bookings</span>
            <span className="text-2xl font-black text-white">{stats.totalBookings}</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Upcoming Trips</span>
            <span className="text-2xl font-black text-white">{stats.upcomingTrips}</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Reward Points</span>
            <span className="text-2xl font-black text-white">{stats.rewardsPoints.toLocaleString()}</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Total Investment</span>
            <span className="text-2xl font-black text-white">{stats.totalSpent}</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Upcoming Bookings & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bookings List (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Upcoming & Active Reservations</h2>
            <span className="text-xs text-sky-400 font-semibold">// TODO: Fetch from Booking API</span>
          </div>

          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-slate-400 text-sm text-center py-6">You have no upcoming bookings.</div>
            ) : (
              bookings.map((booking) => (
              <div
                key={booking.id}
                className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5 glass-card-hover"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={booking.image}
                    alt={booking.resortName}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20 inline-block">
                      {booking.id}
                    </span>
                    <h3 className="text-base font-bold text-white">{booking.resortName}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-800 text-right gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    booking.status === 'Confirmed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : booking.status === 'Upcoming'
                      ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {booking.status}
                  </span>

                  <div className="text-xs text-slate-300">
                    <span>{booking.checkIn} → {booking.checkOut}</span>
                  </div>

                  <span className="text-sm font-bold text-sky-400">${booking.totalPrice}</span>
                </div>
              </div>
            )))}
          </div>
        </div>

        {/* Activity Feed (1 col) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Recent Account Activity</h2>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
            {dummyActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 border-b border-slate-800/80 pb-4 last:border-0 last:pb-0">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">{act.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{act.description}</p>
                  <span className="text-[10px] text-slate-500 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 text-center">
            // TODO: Replace dummy stats & bookings data using Supabase / REST API
          </div>
        </div>

      </div>

    </div>
  );
}
