import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, User, LogOut, Menu, X, Palmtree } from 'lucide-react';
import { dummyUser } from '../data/user';
import { supabase } from '../utils/supabaseClient';

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    name: 'Loading...',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    membershipTier: ''
  });

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('users').select('name, membership_tier').eq('id', user.id).single();
        if (data) {
          setUserProfile({
            name: data.name || user.email.split('@')[0],
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            membershipTier: data.membership_tier || 'Standard Member'
          });
        }
      } else {
        setUserProfile({
          name: 'Guest (Not Logged In)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          membershipTier: 'Visitor'
        });
      }
    }
    fetchUser();
  }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: User }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden glass-panel border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
            <Palmtree className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-white">AURA<span className="text-sky-400">RESORTS</span></span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 glass-panel border-r border-slate-800 p-6 flex flex-col justify-between transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-8">
          {/* Logo */}
          <Link to="/" className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <Palmtree className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              AURA<span className="text-sky-400">RESORTS</span>
            </span>
          </Link>

          {/* User Profile Mini */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-sky-400/30"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white truncate">{userProfile.name}</h4>
              <span className="text-[11px] text-sky-400 font-medium block truncate">{userProfile.membershipTier}</span>
            </div>
          </div>

          {/* Nav Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            
            <Link
              to="/resorts"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/50"
            >
              <Calendar className="w-5 h-5" />
              Book New Resort
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
