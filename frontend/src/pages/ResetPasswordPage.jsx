import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    if (!isSupabaseConfigured) {
      setSuccess(true);
      return;
    }

    setLoading(true);

    try {
      // Update password for currently authenticated reset session
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      console.error("Error updating password:", err);
      setErrorMsg(typeof err === 'string' ? err : (err?.message || 'Failed to update password'));
    } finally {
      setLoading(false);
    }
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Set New Password</h2>
          <p className="text-xs text-slate-400">
            Enter your new secure password below to update your account.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-white text-lg">Password Updated!</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Your account password has been updated successfully. You can now sign in with your new password.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Sign In with New Password
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
              required
            />

            <Button type="submit" size="md" variant="primary" className="w-full mt-2" disabled={loading}>
              {loading ? 'Updating Password...' : 'Update Password'}
            </Button>
          </form>
        )}

      </div>
    </div>
  );
}
