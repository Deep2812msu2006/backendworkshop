import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase } from '../utils/supabaseClient';
import { dummyUser } from '../data/user';

// TODO: Connect Update Profile API
// TODO: Profile API
// TODO: Connect Supabase Storage for avatar upload

export function UserProfilePage() {
  const [profile, setProfile] = useState({
    name: dummyUser.name,
    email: dummyUser.email,
    phone: dummyUser.phone,
    address: dummyUser.address,
    avatar: dummyUser.avatar
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // 1. Get the currently logged-in user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("You must be logged in to update your profile.");
      }

      // 2. Update their data in our custom 'users' table
      const { error } = await supabase
        .from('users')
        .update({
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          avatar: profile.avatar
        })
        .eq('id', user.id);

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
          <span>{dummyUser.membershipTier}</span>
        </div>
      </div>

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
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-sky-400/40 shadow-xl"
            />
            <button
              type="button"
              className="absolute bottom-1 right-1 bg-sky-500 p-2.5 rounded-full text-white shadow-lg hover:bg-sky-400 transition-colors"
              title="Change Profile Avatar"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">{profile.name}</h3>
            <p className="text-xs text-slate-400">Member since {dummyUser.memberSince}</p>
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
