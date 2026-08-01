import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, Key, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

// TODO: Connect Owner Supabase Authentication
// TODO: Verify Owner Admin Role / RLS Policy

export function OwnerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleOwnerLogin = (e) => {
    e.preventDefault();
    // TODO: Connect Owner Supabase Authentication & RLS role verification
    navigate('/owner/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Amber Glow Accent for Owner Portal */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Owner Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Resort Owner Portal</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Property Management Login</h2>
          <p className="text-xs text-slate-400">
            Authorized resort owners & property administrators only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleOwnerLogin} className="space-y-4">
          <Input
            label="Owner Email Address"
            type="email"
            placeholder="owner@auraresorts.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
          />

          <Input
            label="Owner Authorization Key"
            type="password"
            placeholder="OWNER-KEY-2026-VVIP"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            icon={Key}
            required
          />

          <Button type="submit" size="md" variant="primary" icon={ArrowRight} className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border-amber-400/30">
            Access Owner Portal
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center space-y-3">
          <Link to="/login" className="text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center justify-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            Looking for Client/Guest Login? Click here
          </Link>
          
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-500 text-center space-y-0.5">
            <p>// TODO: Connect Owner Supabase Authentication</p>
            <p>// TODO: Verify Owner Admin Role / RLS Policy</p>
          </div>
        </div>

      </div>
    </div>
  );
}
