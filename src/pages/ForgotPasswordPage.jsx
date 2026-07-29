import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

// TODO: Connect SMTP email later
// TODO: Connect Supabase Password Reset

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect SMTP email / Supabase password reset link
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/20 shadow-2xl space-y-6">
        
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-md">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Reset Password</h2>
          <p className="text-xs text-slate-400">
            Enter your email to receive a password reset instructions link.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-white text-base">Reset Email Dispatched!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If an account with <strong className="text-sky-400">{email}</strong> exists, you will receive password recovery instructions shortly.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSubmitted(false)}
              >
                Try another email
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Account Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <Button type="submit" size="md" variant="primary" className="w-full mt-2">
              Send Reset Email
            </Button>
          </form>
        )}

        {/* TODO Reminder Box */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-500 text-center">
          <p>// TODO: Connect SMTP email / Supabase Auth later</p>
        </div>

      </div>
    </div>
  );
}
