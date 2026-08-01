import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, ShieldCheck, CheckCircle2, ArrowLeft, Send, Sparkles, LogIn } from 'lucide-react';
import { Button } from '../components/Button';
import { ReviewCard } from '../components/ReviewCard';
import { Loader } from '../components/Loader';
import { resortsData } from '../data/resorts';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

// TODO: Fetch Resorts from API
// TODO: Booking API

export function ResortDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const resort = resortsData.find((r) => r.id === id) || resortsData[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getUser().then(({ data }) => {
        setCurrentUser(data?.user || null);
      });
    }
  }, []);

  const images = resort.gallery && resort.gallery.length > 0 ? resort.gallery : [resort.image];

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      // Local Workshop Mode (without .env)
      setBookingSuccess(true);
      return;
    }
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        alert("🔒 Authentication Required: Please log in or sign up before booking a resort!");
        navigate('/login');
        return;
      }

      const { error } = await supabase.from('bookings').insert([{
        id: `BK-${Date.now()}`,
        user_id: user.id,
        resort_id: resort.id,
        check_in: checkIn,
        check_out: checkOut,
        guests: guests,
        total_price: (resort.price * 3) + 150, // 3 nights + $150 service fee
        status: 'Confirmed'
      }]);

      if (error) throw error;

      setBookingSuccess(true);
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Booking failed: " + err.message);
    }
  };

  if (!resort) {
    return <Loader text="Searching resort registry..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Link */}
      <Link to="/resorts" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 font-semibold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to All Resorts
      </Link>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest mb-2">
            <MapPin className="w-4 h-4" />
            <span>{resort.location}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {resort.name}
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
            <span className="text-lg font-bold">{resort.rating}</span>
            <span className="text-xs text-slate-400">({resort.reviewsCount} reviews)</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-xs text-slate-400 block">Nightly Rate</span>
            <span className="text-xl font-black text-sky-400">${resort.price}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Display Image */}
        <div className="relative h-[400px] md:h-[550px] rounded-3xl overflow-hidden glass-panel border border-slate-800">
          <img
            src={images[activeImageIndex]}
            alt={resort.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full text-xs font-medium text-slate-200 border border-slate-700">
            Image {activeImageIndex + 1} of {images.length}
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeImageIndex === idx ? 'border-sky-400 scale-105 shadow-lg shadow-sky-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Description vs Booking Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Details & Amenities */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Overview */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              Resort Sanctuary Experience
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              {resort.description}
            </p>
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Free Date Changes</span>
              </div>
            </div>
          </div>

          {/* Facilities & Amenities */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Included Luxury Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {resort.facilities?.map((facility, idx) => (
                <div
                  key={idx}
                  className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3 text-slate-200 text-sm font-medium"
                >
                  <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Guest Reviews & Feedback</h3>
              <span className="text-xs text-sky-400 font-semibold">{resort.reviewsCount} verified reviews</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resort.reviews?.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 glass-panel p-8 rounded-3xl border border-sky-500/30 shadow-2xl space-y-6">
            
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Stay Price</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-sky-400">${resort.price}</span>
                <span className="text-xs text-slate-400">/ night</span>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-3 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
                <h4 className="font-bold text-lg text-white">Booking Request Initiated!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your booking has been successfully saved to Supabase! <br />
                  Your reservation dates are now locked in.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setBookingSuccess(false)}
                >
                  Book Another Date
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                
                {/* Dates */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer"
                  >
                    <option value={1}>1 Guest (Solo Traveler)</option>
                    <option value={2}>2 Guests (Couples Suite)</option>
                    <option value={4}>4 Guests (Family Villa)</option>
                    <option value={6}>6+ Guests (Royal Estate)</option>
                  </select>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>${resort.price} x 3 nights</span>
                    <span className="text-slate-200 font-medium">${resort.price * 3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resort Service Fee</span>
                    <span className="text-slate-200 font-medium">$150</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                    <span>Estimated Total</span>
                    <span className="text-sky-400">${resort.price * 3 + 150}</span>
                  </div>
                </div>

                {/* Submit */}
                {!currentUser && isSupabaseConfigured && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 text-center flex items-center justify-center gap-2 font-medium">
                    <LogIn className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>Please sign in or create an account to book</span>
                  </div>
                )}

                <Button type="submit" size="lg" variant="primary" icon={Send} className="w-full">
                  Book Now
                </Button>

                <p className="text-[11px] text-center text-slate-500 italic">
                  // TODO: Booking API will process reservation in workshop.
                </p>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
