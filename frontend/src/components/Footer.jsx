import React from 'react';
import { Link } from 'react-router-dom';
import { Palmtree, Mail, Phone, MapPin, Heart, Send } from 'lucide-react';
import { Button } from './Button';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                <Palmtree className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                AURA<span className="text-sky-400">RESORTS</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Discover handpicked luxury resort destinations across the globe. Unmatched comfort, private infinity pools, and world-class hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/resorts" className="hover:text-sky-400 transition-colors">Featured Resorts</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">Contact Concierge</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-sky-400 transition-colors">Member Dashboard</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-sky-400 transition-colors">Client Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Concierge</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span>100 Ocean Vista Drive, Suite 800, Paradise Island</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+1 (800) 555-AURA</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>concierge@auraresorts.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Exclusive Offers</h4>
            <p className="text-sm text-slate-400">
              Subscribe to receive private villa discounts and VIP retreat invitations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>
              <Button size="sm" variant="primary" icon={Send} className="w-full">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Aura Resorts Inc. Built for Workshop Frontend Demo.</p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400 inline" />
            <span>for React & Supabase Learners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
