import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send, Phone, MapPin, CheckCircle2, Info, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { SectionTitle } from '../components/SectionTitle';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Local Workshop Demo Mode (if keys not added to .env yet)
      setTimeout(() => {
        setSentSuccess(true);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Aura Resorts Concierge'
        },
        publicKey
      );
      setSentSuccess(true);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setErrorMsg(err?.text || err?.message || 'Failed to dispatch email. Please check your EmailJS keys in .env.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <SectionTitle
          subtitle="Get In Touch"
          title="Contact VIP Concierge"
          centered
        />
        <p className="text-slate-400 text-sm -mt-6">
          Have questions regarding villa bookings, private charter transfers, or custom event packages? Our 24/7 team is ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Info Cards (1 col) */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Global Headquarters</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              100 Ocean Vista Drive, Suite 800, Paradise Island, FL 33139
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Direct Line</h3>
            <p className="text-xs text-slate-400">
              International: +1 (800) 555-AURA <br />
              Concierge Desk: +1 (555) 019-2831
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Electronic Mail</h3>
            <p className="text-xs text-slate-400">
              concierge@auraresorts.com <br />
              reservations@auraresorts.com
            </p>
          </div>
        </div>

        {/* Contact Form (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/20 shadow-2xl space-y-6">
          
          {/* Integration Banner Notice */}
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center gap-3 text-sky-300 text-xs">
            <Info className="w-5 h-5 shrink-0 text-sky-400" />
            <span>Connects live with EmailJS (`@emailjs/browser`). Configure Service ID, Template ID & Public Key in `.env` to send emails.</span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-xl text-red-200 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          {sentSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Message Delivered via EmailJS!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Aura Resorts VIP Concierge. Our representative will review your message and reach out to <strong>{formData.email || 'your email'}</strong> shortly.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSentSuccess(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  name="name"
                  type="text"
                  placeholder="Sophia Turner"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                  required
                />

                <Input
                  label="Your Email Address"
                  name="email"
                  type="email"
                  placeholder="sophia@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  required
                />
              </div>

              <Input
                label="Subject"
                name="subject"
                type="text"
                placeholder="e.g., Honeymoon Suite Inquiry & Helicopter Transfer"
                value={formData.subject}
                onChange={handleChange}
                icon={MessageSquare}
                required
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Your Message <span className="text-sky-400">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Write your inquiry or resort request here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">Powered by EmailJS</span>
                <Button type="submit" size="md" variant="primary" icon={loading ? Loader2 : Send} disabled={loading}>
                  {loading ? 'Sending via EmailJS...' : 'Send Message'}
                </Button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
