import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palmtree, Menu, X, User, LogIn, ShieldAlert } from 'lucide-react';
import { Button } from './Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Resorts', path: '/resorts' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-sky-500/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <Palmtree className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                AURA<span className="text-sky-400">RESORTS</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Luxury Getaways
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/owner/login">
              <span className="px-3 py-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-1.5 hover:bg-amber-500/20 transition-all">
                <ShieldAlert className="w-3.5 h-3.5" />
                Owner Portal
              </span>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" icon={LogIn}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" icon={User}>
                Sign Up
              </Button>
            </Link>
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white focus:outline-none border border-slate-700"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="md" className="w-full" icon={LogIn}>
                Login
              </Button>
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              <Button variant="primary" size="md" className="w-full" icon={User}>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
