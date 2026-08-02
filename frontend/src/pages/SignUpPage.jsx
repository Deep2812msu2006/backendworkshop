import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Palmtree, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

// TODO: Connect Supabase Authentication
// TODO: Connect Google OAuth
// TODO: Email Verification

const OTP_ENABLED = import.meta.env.VITE_OTP_ENABLED === 'true';

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showOtpPanel, setShowOtpPanel] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOtpChange = (element, index) => {
    const val = element.value;
    if (isNaN(val)) return false;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input field
    if (val !== '' && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newOtp = ['', '', '', '', '', ''];
      digits.forEach((digit, idx) => {
        if (idx < 6) newOtp[idx] = digit;
      });
      setOtp(newOtp);
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (!isSupabaseConfigured) {
      // Local Workshop Mode (without .env)
      setShowOtpPanel(true);
      setSuccessMsg('⚡ Local Workshop Mode: Enter any 6-digit code (e.g. 123456) to verify and proceed.');
      return;
    }

    try {
      // 1. Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // 2. Insert extra data into custom 'users' table
      if (data.user) {
        await supabase.from('users').upsert({
          id: data.user.id,
          name: formData.fullName,
          email: formData.email,
          member_since: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          membership_tier: 'Standard Member'
        });
      }

      if (!OTP_ENABLED) {
        if (data.session) {
          // Instant Login (Email Confirmation turned OFF in Supabase)
          navigate('/dashboard');
        } else {
          // Email Confirmation Link sent (Email Confirmation turned ON in Supabase)
          setSuccessMsg(`🎉 Account created! A confirmation link has been sent to ${formData.email}. Please check your inbox and click the link to sign in.`);
        }
        return;
      }
      setShowOtpPanel(true);
      setSuccessMsg(`🎉 Account created! We sent a 6-digit OTP code to ${formData.email}. Please enter it below:`);
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : (err?.message || 'An error occurred during signup'));
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const token = otp.join('');
    if (token.length < 6) {
      setErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }

    setVerifying(true);
    setErrorMsg('');

    if (!isSupabaseConfigured) {
      navigate('/dashboard');
      return;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: token,
        type: 'signup'
      });

      if (error) throw error;

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid or expired 4-digit OTP code.');
    } finally {
      setVerifying(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg('');
    if (!isSupabaseConfigured) {
      // Local Workshop Mode
      navigate('/dashboard');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : (err?.message || 'Google Sign-In failed'));
    }
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

        {typeof errorMsg === 'string' && errorMsg.trim() !== '' && !successMsg && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && !showOtpPanel ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-extrabold text-white text-lg">Check Your Email Inbox</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {successMsg}
            </p>
            <div className="pt-2">
              <Link to="/login" className="text-xs text-sky-400 hover:underline font-semibold">
                Go to Sign In Page →
              </Link>
            </div>
          </div>
        ) : showOtpPanel ? (
          <form onSubmit={handleVerifyOtp} className="space-y-6 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-sky-400 mx-auto" />
              <h3 className="font-extrabold text-white text-base">Enter Verification Code</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {successMsg}
              </p>
            </div>

            {/* 6 Digit OTP Box Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  onPaste={handleOtpPaste}
                  onFocus={(e) => e.target.select()}
                  className="w-11 h-13 sm:w-12 sm:h-14 bg-slate-900 border-2 border-slate-800 focus:border-sky-400 rounded-2xl text-center text-xl sm:text-2xl font-black text-sky-400 focus:outline-none transition-all shadow-inner"
                />
              ))}
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              disabled={verifying}
            >
              {verifying ? 'Verifying OTP...' : 'Confirm 6-Digit Code'}
            </Button>

            <button
              type="button"
              onClick={() => setShowOtpPanel(false)}
              className="text-xs text-slate-400 hover:text-slate-200 underline block mx-auto transition-colors"
            >
              Back to Signup Form
            </button>
          </form>
        ) : (
          /* Signup Form */
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
        )}

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
