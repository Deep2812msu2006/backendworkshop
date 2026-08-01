import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';
import { dummyUser } from '../data/user';

export function getInitials(name) {
  if (!name) return 'US';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    memberSince: '',
    membershipTier: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          // Fallback if not logged in
          setProfile(prev => ({ ...prev, name: 'Guest (Not Logged In)', email: 'guest@example.com' }));
          setLoading(false);
          return;
        }

        const fallbackName = user.user_metadata?.full_name || user.email.split('@')[0];

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          setProfile({
            name: data.name || fallbackName,
            email: data.email || user.email || '',
            phone: data.phone || '',
            address: data.address || '',
            avatar: data.avatar || '',
            memberSince: data.member_since || 'Recently',
            membershipTier: data.membership_tier || 'Standard Member'
          });
        } else {
          // Profile row doesn't exist yet - construct from Auth details & auto-upsert
          const newProfile = {
            name: fallbackName,
            email: user.email || '',
            phone: '',
            address: '',
            avatar: '',
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            membershipTier: 'Standard Member'
          };
          setProfile(newProfile);

          // Save row to users table
          await supabase.from('users').upsert({
            id: user.id,
            name: newProfile.name,
            email: newProfile.email,
            member_since: newProfile.memberSince,
            membership_tier: newProfile.membershipTier
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      // Local Workshop Mode (without .env)
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
      return;
    }

    try {
      // 1. Get the currently logged-in user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("You must be logged in to update your profile.");
      }

      // 2. Update (or Insert) their data in our custom 'users' table
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          avatar: profile.avatar,
          member_since: profile.memberSince || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          membership_tier: profile.membershipTier || 'Standard Member'
        });

      if (error) throw error;

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Account Profile Settings</h1>
          <p className="text-slate-400 text-xs mt-1">Manage your personal information and contact details.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>{profile.membershipTier}</span>
        </div>
      </div>

      {loading && <div className="text-sky-400 text-sm animate-pulse">Loading profile data from Supabase...</div>}

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-fadeIn text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Profile changes saved to Supabase successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Avatar Section */}
        <div className="md:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 text-center space-y-4 flex flex-col items-center justify-center">
          <div className="relative group">
            {profile.avatar && !profile.avatar.includes('unsplash') ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-sky-400/40 shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-black border-4 border-sky-400/40 shadow-2xl tracking-widest uppercase">
                {getInitials(profile.name)}
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-sky-500 p-2.5 rounded-full text-white shadow-lg hover:bg-sky-400 transition-colors cursor-pointer"
              title="Upload Photo from Device"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">{profile.name}</h3>
            <p className="text-xs text-slate-400">Member since {profile.memberSince}</p>
          </div>

          <div className="w-full pt-4 border-t border-slate-800 text-left space-y-2">
            <label className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Avatar Image URL</label>
            <input
              type="text"
              name="avatar"
              value={profile.avatar}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Input Details Section */}
        <div className="md:col-span-2 glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleChange}
              icon={User}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              icon={Mail}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              name="phone"
              type="text"
              value={profile.phone}
              onChange={handleChange}
              icon={Phone}
            />

            <Input
              label="Primary Address"
              name="address"
              type="text"
              value={profile.address}
              onChange={handleChange}
              icon={MapPin}
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">// TODO: Connect Update Profile API</p>
            <Button type="submit" size="md" variant="primary" icon={Save}>
              Save Changes
            </Button>
          </div>
        </div>

      </form>

    </div>
  );
}
