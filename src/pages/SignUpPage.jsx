import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Palmtree, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase } from '../utils/supabaseClient';

// TODO: Connect Supabase Authentication
// TODO: Connect Google OAuth
// TODO: Email Verification

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      // 1. Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // 2. Insert extra data into our custom 'users' table
      if (data.user) {
        const { error: insertError } = await supabase.from('users').insert([{
          id: data.user.id,
          name: formData.fullName,
          email: formData.email,
          member_since: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          membership_tier: 'Standard Member'
        }]);

        if (insertError) {
          console.error('Error inserting into users table:', insertError);
          // If insert fails (maybe due to RLS policies), we log it but still let them login if auth succeeded.
        }
      }

      alert('Sign up successful! (Check your email if confirmation is enabled in Supabase)');
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleGoogleAuth = () => {
    // TODO: Connect Google OAuth
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/20 shadow-2xl space-y-6">
        
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <Palmtree className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Create Your Account</h2>
          <p className="text-xs text-slate-400">Join Aura Resorts VIP Membership today</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm text-center">
            {errorMsg}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            icon={User}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={Lock}
            required
          />

          <Button type="submit" size="md" variant="primary" icon={ArrowRight} className="w-full mt-2">
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-xs text-slate-400 uppercase tracking-wider absolute font-semibold">Or</span>
        </div>

        {/* Google OAuth Button */}
        <Button
          type="button"
          onClick={handleGoogleAuth}
          variant="secondary"
          className="w-full"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Footer Redirect */}
        <p className="text-xs text-center text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>

        {/* TODO Reminder Box */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-500 text-center space-y-0.5">
          <p>// TODO: Connect Supabase Sign Up</p>
          <p>// TODO: Connect Google OAuth & Email Verification</p>
        </div>

      </div>
    </div>
  );
}
